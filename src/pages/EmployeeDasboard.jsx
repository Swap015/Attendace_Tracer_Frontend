import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EmployeeDashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [leaveForm, setLeaveForm] = useState({
        from: "",
        to: "",
        reason: "",
    });

    // ✅ Fetch records on load
    useEffect(() => {
        fetchAttendance();
        fetchLeaves();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/attendance/myAttendance", {
                withCredentials: true,
            });
            setAttendance(res.data.records);
        } catch {
            toast.error("Error fetching attendance");
        }
    };

    const fetchLeaves = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/leave/myLeaves", {
                withCredentials: true,
            });
            setLeaves(res.data.leaves);
        } catch {
            toast.error("Error fetching leaves");
        }
    };

    const handleMarkAttendance = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8000/api/attendance/mark",
                {},
                { withCredentials: true }
            );
            toast.success(res.data.msg);
            fetchAttendance();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error marking attendance");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Apply for Leave
    const handleApplyLeave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8000/api/leave/applyForLeave",
                leaveForm,
                { withCredentials: true }
            );
            toast.success(res.data.msg);
            setLeaveForm({ from: "", to: "", reason: "" });
            fetchLeaves();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error applying for leave");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Employee Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* ✅ Mark Attendance */}
                <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <h2 className="text-2xl font-semibold mb-4">Mark Attendance</h2>
                    <button
                        onClick={handleMarkAttendance}
                        disabled={loading}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-md disabled:bg-gray-500 transition"
                    >
                        {loading ? "Processing..." : "Check In / Check Out"}
                    </button>

                    <h3 className="text-xl font-medium mt-6 mb-2">My Records</h3>
                    <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-300 border-b border-gray-500">
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Late?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((a, i) => (
                                    <tr key={i} className="border-b border-gray-700">
                                        <td className="p-2">{a.date}</td>
                                        <td className="p-2 capitalize">{a.status}</td>
                                        <td className="p-2">{a.isLate ? "✅ Yes" : "❌ No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ✅ Apply Leave */}
                <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
                    <h2 className="text-2xl font-semibold mb-4">Apply Leave</h2>
                    <form onSubmit={handleApplyLeave} className="space-y-4">
                        <input
                            type="date"
                            value={leaveForm.from}
                            onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                        />
                        <input
                            type="date"
                            value={leaveForm.to}
                            onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
                            required
                            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                        />
                        <textarea
                            placeholder="Reason"
                            value={leaveForm.reason}
                            onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold shadow-md transition"
                        >
                            Apply
                        </button>
                    </form>

                    <h3 className="text-xl font-medium mt-6 mb-2">My Leaves</h3>
                    <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-300 border-b border-gray-500">
                                    <th className="p-2">From</th>
                                    <th className="p-2">To</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map((l, i) => (
                                    <tr key={i} className="border-b border-gray-700">
                                        <td className="p-2">{l.from}</td>
                                        <td className="p-2">{l.to}</td>
                                        <td
                                            className={`p-2 font-semibold ${l.status === "approved"
                                                ? "text-green-400"
                                                : l.status === "rejected"
                                                    ? "text-red-400"
                                                    : "text-yellow-400"
                                                }`}
                                        >
                                            {l.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
