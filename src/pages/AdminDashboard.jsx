
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";


function AdminDashboard() {
    const [leaves, setLeaves] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            const res = await api.get("/leave/allLeaves",);
            setLeaves(res.data.leaves || res.data);
        } catch {
            toast.error("Failed to fetch leaves");
        }
    };

    const fetchAttendance = async () => {
        try {
            const res = await api.get("/attendance/late");
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
            await api.put(
                `/leave/status/${leaveId}`,
                { status }
            );
            toast.success(`Leave ${status}`);
            fetchLeaves();
        } catch {
            toast.error("Failed to update leave");
        }
    };

    if (loading)
        return <div className="text-white text-center mt-10">Loading...</div>;

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-900 via-purple-700 to-black min-h-screen text-white">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 md:text-left text-center">
                Admin Dashboard
            </h1>

            <section className="mb-10">
                <h2 className="text-base sm:text-xl font-semibold mb-2">Late Employees</h2>
                {attendance.length === 0 ? (
                    <p className="text-gray-300 text-sm">No late employees today.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm md:text-base border-collapse rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Check-In Time</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((a, idx) => (
                                    <tr
                                        key={a._id}
                                        className={`${idx % 2 === 0 ? "bg-gray-900/30" : "bg-gray-800/30"
                                            } hover:bg-blue-500/30 transition`}
                                    >
                                        <td className="px-4 py-2">{a.user?.name}</td>
                                        <td className="px-4 py-2">{new Date(a.checkIn).toLocaleTimeString()}</td>
                                        <td className="px-4 py-2">{new Date(a.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {leaves.length > 0 && (
                <section>
                    <h2 className="text-base sm:text-xl font-semibold mb-2">Leave Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm md:text-base border-collapse rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white">
                                <tr>
                                    <th className="px-4 py-2">Employee</th>
                                    <th className="px-4 py-2">From</th>
                                    <th className="px-4 py-2">To</th>
                                    <th className="px-4 py-2">Reason</th>
                                    <th className="px-4 py-2">Status</th>
                                    {leaves.some((l) => l.status === "pending") && (
                                        <th className="px-4 py-2">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((leave, idx) => {
                                    const showActions = leave.status === "pending";
                                    return (
                                        <tr
                                            key={leave._id}
                                            className={`${idx % 2 === 0 ? "bg-gray-900/30" : "bg-gray-800/30"
                                                } hover:bg-blue-500/30 transition`}
                                        >
                                            <td className="px-4 py-2">{leave.user?.name}</td>
                                            <td className="px-4 py-2">{new Date(leave.from).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{new Date(leave.to).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{leave.reason}</td>
                                            <td className="px-4 py-2 capitalize">{leave.status || "pending"}</td>
                                            {showActions && (
                                                <td className="px-4 py-2 flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => updateStatus(leave._id, "approved")}
                                                        className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-xs sm:text-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(leave._id, "rejected")}
                                                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-xs sm:text-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}

export default AdminDashboard;
