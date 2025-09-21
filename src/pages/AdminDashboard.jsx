import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminDashboard() {
    const [leaves, setLeaves] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchLeaves = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/leave/allLeaves", {
                withCredentials: true,
            });
            setLeaves(res.data.leaves || res.data);
        } catch {
            toast.error("Failed to fetch leaves");
        }
    };


    const fetchAttendance = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/attendance/late", {
                withCredentials: true,
            });
            setAttendance(res.data.records || []);
        } catch {
            toast.error("Failed to fetch attendance");
        }
    };


    useEffect(() => {
        fetchLeaves();
        fetchAttendance();
        setLoading(false);
    }, []);

    const updateStatus = async (leaveId, status) => {
        try {
            await axios.put(
                `http://localhost:8000/api/leave/status/${leaveId}`,
                { status },
                { withCredentials: true }
            );
            toast.success(`Leave ${status}`);
            fetchLeaves();
        } catch {
            toast.error("Failed to update leave");
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

    return (
        <div className="p-6 bg-gradient-to-br from-indigo-900 via-purple-700 to-black min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Late Employees</h2>
                {attendance.length === 0 ? (
                    <p>No late employees today.</p>
                ) : (
                    <table className="w-full table-auto border border-gray-400 text-left">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Check-In Time</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((a) => (
                                <tr key={a._id} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{a.user?.name}</td>
                                    <td className="px-4 py-2">{new Date(a.checkIn).toLocaleTimeString()}</td>
                                    <td className="px-4 py-2">{new Date(a.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
                {leaves.length === 0 ? (
                    <p>No leave requests.</p>
                ) : (
                    <table className="w-full table-auto border border-gray-400 text-left">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-4 py-2">Employee</th>
                                <th className="px-4 py-2">From</th>
                                <th className="px-4 py-2">To</th>
                                <th className="px-4 py-2">Reason</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave._id} className="border-b border-gray-700">
                                    <td className="px-4 py-2">{leave.user?.name}</td>
                                    <td className="px-4 py-2">{new Date(leave.from).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{new Date(leave.to).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{leave.reason}</td>
                                    <td className="px-4 py-2 capitalize">{leave.status || "pending"}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {leave.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(leave._id, "approved")}
                                                    className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(leave._id, "rejected")}
                                                    className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default AdminDashboard;
