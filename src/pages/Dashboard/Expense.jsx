import { useState, useEffect, useRef, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import useUserAuth from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import { LuPlus, LuHandCoins, LuHash, LuFlame } from "react-icons/lu";
import CountUp from "../../components/CountUp";
import { gsap } from "gsap";

const Expense = () => {
  const { isLoading }   = useUserAuth();
  const [expenseData, setExpenseData]   = useState([]);
  const [loading, setLoading]           = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const pageRef  = useRef(null);
  const animated = useRef(false);

  const fetchExpenseData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(data);
    } catch (e) {
      console.error("Error fetching expense data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon, paidVia } = expense;
    if (!category.trim())                          { toast.error("Category is required"); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    if (!date)                                     { toast.error("Date is required"); return; }
    if (!paidVia)                                  { toast.error("Payment method is required"); return; }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon, paidVia });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    } catch (e) {
      console.error("Error adding expense:", e.response?.data?.message || e.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseData();
    } catch (e) {
      console.error("Error deleting expense:", e.response?.data?.message || e.message);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" });
      const url  = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href  = url;
      link.setAttribute("download", `expense_details_${new Date().toISOString().split("T")[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded successfully!");
    } catch (e) {
      toast.error("Failed to download");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (!isLoading) fetchExpenseData(); }, [isLoading]);

  useEffect(() => {
    if (!expenseData.length || animated.current || !pageRef.current) return;
    animated.current = true;
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-anim",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out", clearProps: "all" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [expenseData]);

  const stats = useMemo(() => {
    if (!expenseData.length) return { total: 0, count: 0, topCat: "—" };
    const total = expenseData.reduce((s, t) => s + t.amount, 0);
    const count = expenseData.length;
    const catTotals = {};
    expenseData.forEach((t) => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });
    const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    return { total, count, topCat };
  }, [expenseData]);

  const STAT_CARDS = [
    { icon: <LuHandCoins size={18} />, label: "Total Spent",   num: stats.total,  prefix: "₹", isNum: true,  color: "var(--red)",    dim: "var(--red-dim)"       },
    { icon: <LuHash size={18} />,      label: "Entries",        num: stats.count,  prefix: "",  isNum: true,  color: "var(--accent)", dim: "var(--accent-dim)"    },
    { icon: <LuFlame size={18} />,     label: "Top Category",  num: 0,            prefix: "",  isNum: false, staticVal: stats.topCat, color: "var(--orange)", dim: "rgba(234,88,12,0.12)" },
  ];

  return (
    <DashboardLayout activeMenu="Expense">
      <div ref={pageRef} className="relative py-4">

        {/* Background orbs */}
        <div className="absolute pointer-events-none" style={{ top: "-40px", right: "100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />
        <div className="absolute pointer-events-none" style={{ bottom: "100px", left: "40px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(135,92,245,0.08) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />

        <div className="relative z-10 flex flex-col gap-6">

          {/* ── Page header ─────────────────────────────────────── */}
          <div className="exp-anim flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>Expenses</h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-3)" }}>Monitor where your money is going</p>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 self-start sm:self-auto"
              style={{ background: "linear-gradient(135deg, #e53e6a 0%, #b91c4a 100%)", boxShadow: "0 6px 24px rgba(229,62,106,0.38)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => setOpenAddExpenseModal(true)}
            >
              <LuPlus size={16} /> Add Expense
            </button>
          </div>

          {/* ── Stat strip ──────────────────────────────────────── */}
          <div className="exp-anim grid grid-cols-3 gap-4">
            {STAT_CARDS.map(({ icon, label, num, prefix, isNum, staticVal, color, dim }) => (
              <div key={label} className="card flex items-center gap-4" style={{ borderTop: `3px solid ${color}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: dim, color }}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "var(--text-3)" }}>{label}</p>
                  {isNum ? (
                    <CountUp
                      value={num}
                      prefix={prefix}
                      className="text-lg font-bold mt-0.5 leading-tight block"
                      style={{ color: "var(--text-1)" }}
                    />
                  ) : (
                    <p className="text-lg font-bold mt-0.5 leading-tight truncate max-w-[120px]" style={{ color: "var(--text-1)" }}>{staticVal}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Body: chart + list side by side ─────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="exp-anim lg:col-span-3">
              <ExpenseOverview transactions={expenseData} loading={loading} />
            </div>
            <div className="exp-anim lg:col-span-2">
              <ExpenseList
                transactions={expenseData}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onDownload={handleDownloadExpenseDetails}
              />
            </div>
          </div>
        </div>

        <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Expense">
          <DeleteAlert content="Are you sure you want to delete this expense entry?" onDelete={() => deleteExpense(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
