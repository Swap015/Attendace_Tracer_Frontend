import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import api from "../api/axios";


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


    useEffect(() => {
        fetchAttendance();
        fetchLeaves();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await api.get("/attendance/myAttendance");
            setAttendance(res.data.records);
        } catch {
            toast.error("Error fetching attendance");
        }
    };

    const fetchLeaves = async () => {
        try {
            const res = await api.get("/leave/myLeaves");
            setLeaves(res.data.leaves);
        } catch {
            toast.error("Error fetching leaves");
        }
    };

    const handleMarkAttendance = async () => {
        try {
            setLoading(true);
            const res = await api.post("/attendance/mark", null);
            toast.success(res.data.msg);
            fetchAttendance();
        } catch (err) {
            toast.error(err.response?.data?.msg || "Error marking attendance");
        } finally {
            setLoading(false);
        }
    };


    const handleApplyLeave = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/leave/applyForLeave",
                leaveForm
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white p-8 shadow-lg shadow-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-10">Employee Dashboard</h1>

            <div className="grid lg:grid-cols-2 gap-10">

                <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md">
                    <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-4">Attendance</h2>
                    <button
                        onClick={handleMarkAttendance}
                        disabled={loading}
                        className="w-full py-2 bg-[#4977f6] hover:bg-[#3766ff] rounded-lg font-semibold shadow-md disabled:bg-gray-500 transition text-xs sm:text-sm  xl:text-lg"
                    >
                        {loading ? "Processing..." : "Check In / Check Out"}
                    </button>

                    <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-medium mt-6 mb-4">My Records</h3>
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
                                    <p className="text-xs lg:text-sm text-gray-300 border-b border-white/50 pb-1 mb-2">
                                        {a.date ? format(new Date(a.date), "d MMM yyyy") : "—"}
                                    </p>
                                    <p className="text-sm font-medium">
                                        Check-In: {a.checkIn ? new Date(a.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                                    </p>
                                    <p className="text-xs lg:text-sm">
                                        Check-Out: {a.checkOut ? new Date(a.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p
                                        className={`capitalize font-semibold ${a.status === "present"
                                            ? "text-green-400 text-sm border-b border-white/50 pb-1 mb-2"
                                            : a.status === "on-leave"
                                                ? "text-yellow-400"
                                                : "text-red-400"
                                            }`}
                                    >
                                        {a.status}
                                    </p>
                                    <p className="text-sm text-center">
                                        {a.isLate ? "Late" : "On Time"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/10 p-6 rounded-xl shadow-xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-semibold">Leaves</h2>
                        <button
                            onClick={() => setShowLeaveForm(!showLeaveForm)}
                            className="px-4 py-2 bg-[#3a6efd] hover:bg-[#2558ff] rounded-lg font-medium text-xs"
                        >
                            {showLeaveForm ? "Cancel" : "Apply Leave"}
                        </button>
                    </div>

                    {showLeaveForm && (
                        <form onSubmit={handleApplyLeave} className="space-y-4 mb-6">
                            <div className="flex flex-col">
                                <label htmlFor="from" className="text-white text-xs sm:text-sm xl:text-base  mb-1">
                                    From
                                </label>
                                <input
                                    id="from"
                                    type="date"
                                    value={leaveForm.from}
                                    onChange={(e) =>
                                        setLeaveForm({ ...leaveForm, from: e.target.value })
                                    }
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="to" className="text-white text-xs sm:text-sm xl:text-base mb-1">
                                    To
                                </label>
                                <input
                                    id="to"
                                    type="date"
                                    value={leaveForm.to}
                                    onChange={(e) =>
                                        setLeaveForm({ ...leaveForm, to: e.target.value })
                                    }
                                    required
                                    className="w-full px-3 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="reason" className="text-white text-xs sm:text-sm xl:text-base mb-1">
                                    Reason
                                </label>
                                <textarea
                                    id="reason"
                                    placeholder="Enter reason for leave"
                                    value={leaveForm.reason}
                                    onChange={(e) =>
                                        setLeaveForm({ ...leaveForm, reason: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow-md transition text-xs sm:text-sm"
                            >
                                Submit Leave
                            </button>
                        </form>

                    )}

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
                                    <p className="text-sm text-gray-300 pt-2 pl-2">Reason: {l.reason}</p>
                                </div>
                                <p
                                    className={`font-semibold self-center ${l.status === "approved"
                                        ? "text-green-400 text-sm sm:text-base"
                                        : l.status === "rejected"
                                            ? "text-red-400 text-sm sm:text-base"
                                            : "text-yellow-400 text-sm sm:text-base"
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
