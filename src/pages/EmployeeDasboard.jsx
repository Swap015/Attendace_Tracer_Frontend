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
    const [showLeaveForm, setShowLeaveForm] = useState(false);

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
            setShowLeaveForm(false);
            fetchLeaves();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error applying for leave");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-10">Employee Dashboard</h1>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* ✅ Attendance Section */}
                <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md">
                    <h2 className="text-2xl font-semibold mb-4">Attendance</h2>
                    <button
                        onClick={handleMarkAttendance}
                        disabled={loading}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-md disabled:bg-gray-500 transition"
                    >
                        {loading ? "Processing..." : "Check In / Check Out"}
                    </button>

                    <h3 className="text-xl font-medium mt-6 mb-4">My Records</h3>
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                        {attendance.length === 0 && (
                            <p className="text-gray-400 text-center">No records yet</p>
                        )}
                        {attendance.map((a, i) => (
                            <div
                                key={i}
                                className="bg-white/5 p-4 rounded-lg flex justify-between items-center shadow"
                            >
                                <div>
                                    <p className="text-sm text-gray-300">{a.date}</p>
                                    <p className="text-sm">
                                         Check-In:{" "}
                                        {a.checkIn ? new Date(a.checkIn).toLocaleTimeString() : "—"}
                                    </p>
                                    <p className="text-sm">
                                         Check-Out:{" "}
                                        {a.checkOut ? new Date(a.checkOut).toLocaleTimeString() : "—"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`capitalize font-semibold ${a.status === "present"
                                                ? "text-green-400"
                                                : a.status === "on-leave"
                                                    ? "text-yellow-400"
                                                    : "text-red-400"
                                            }`}
                                    >
                                        {a.status}
                                    </p>
                                    <p className="text-xs">
                                        {a.isLate ? "⚠️ Late" : "✅ On Time"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ Leave Section */}
                <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Leaves</h2>
                        <button
                            onClick={() => setShowLeaveForm(!showLeaveForm)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
                        >
                            {showLeaveForm ? "Cancel" : "Apply Leave"}
                        </button>
                    </div>

                    {/* Leave Form */}
                    {showLeaveForm && (
                        <form onSubmit={handleApplyLeave} className="space-y-4 mb-6">
                            <input
                                type="date"
                                value={leaveForm.from}
                                onChange={(e) =>
                                    setLeaveForm({ ...leaveForm, from: e.target.value })
                                }
                                required
                                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                            />
                            <input
                                type="date"
                                value={leaveForm.to}
                                onChange={(e) =>
                                    setLeaveForm({ ...leaveForm, to: e.target.value })
                                }
                                required
                                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                            />
                            <textarea
                                placeholder="Reason"
                                value={leaveForm.reason}
                                onChange={(e) =>
                                    setLeaveForm({ ...leaveForm, reason: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white"
                            />
                            <button
                                type="submit"
                                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow-md transition"
                            >
                                Submit Leave
                            </button>
                        </form>
                    )}

                    {/* Leaves List */}
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                        {leaves.length === 0 && (
                            <p className="text-gray-400 text-center">No leaves applied yet</p>
                        )}
                        {leaves.map((l, i) => (
                            <div
                                key={i}
                                className="bg-white/5 p-4 rounded-lg shadow flex justify-between"
                            >
                                <div>
                                    <p className="text-sm">📅 {l.from} → {l.to}</p>
                                    <p className="text-xs text-gray-300">Reason: {l.reason}</p>
                                </div>
                                <p
                                    className={`font-semibold self-center ${l.status === "approved"
                                            ? "text-green-400"
                                            : l.status === "rejected"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                        }`}
                                >
                                    {l.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
