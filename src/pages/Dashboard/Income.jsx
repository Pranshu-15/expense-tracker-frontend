import { useState, useEffect, useRef, useMemo } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import useUserAuth from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { LuPlus, LuWalletMinimal, LuHash, LuTrendingUp } from "react-icons/lu";
import CountUp from "../../components/CountUp";
import { gsap } from "gsap";

const Income = () => {
  const { isLoading }   = useUserAuth();
  const [incomeData, setIncomeData]     = useState([]);
  const [loading, setLoading]           = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const pageRef  = useRef(null);
  const animated = useRef(false);

  const fetchIncomeData = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(data);
    } catch (e) {
      console.error("Error fetching income data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim())                        { toast.error("Source is required"); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    if (!date)                                 { toast.error("Date is required"); return; }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    } catch (e) {
      console.error("Error adding income:", e.response?.data?.message || e.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (e) {
      console.error("Error deleting income:", e.response?.data?.message || e.message);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, { responseType: "blob" });
      const url  = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href  = url;
      link.setAttribute("download", `income_details_${new Date().toISOString().split("T")[0]}.xlsx`);
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

  useEffect(() => { if (!isLoading) fetchIncomeData(); }, [isLoading]);

  useEffect(() => {
    if (!incomeData.length || animated.current || !pageRef.current) return;
    animated.current = true;
    const ctx = gsap.context(() => {
      gsap.fromTo(".inc-anim",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out", clearProps: "all" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [incomeData]);

  const stats = useMemo(() => {
    if (!incomeData.length) return { total: 0, count: 0, avg: 0, top: "—" };
    const total = incomeData.reduce((s, t) => s + t.amount, 0);
    const count = incomeData.length;
    const avg   = Math.round(total / count);
    const freq  = {};
    incomeData.forEach((t) => { freq[t.source] = (freq[t.source] || 0) + 1; });
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    return { total, count, avg, top };
  }, [incomeData]);

  const STAT_CARDS = [
    { icon: <LuWalletMinimal size={18} />, label: "Total Income",  num: stats.total, prefix: "₹", color: "var(--green)",  dim: "var(--green-dim)"  },
    { icon: <LuHash size={18} />,          label: "Entries",        num: stats.count, prefix: "",  color: "var(--accent)", dim: "var(--accent-dim)" },
    { icon: <LuTrendingUp size={18} />,    label: "Avg per Entry", num: stats.avg,   prefix: "₹", color: "var(--green)",  dim: "var(--green-dim)"  },
  ];

  return (
    <DashboardLayout activeMenu="Income">
      <div ref={pageRef} className="relative py-4">

        {/* Background orbs */}
        <div className="absolute pointer-events-none" style={{ top: "-40px", right: "100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />
        <div className="absolute pointer-events-none" style={{ bottom: "100px", left: "40px", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(135,92,245,0.08) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />

        <div className="relative z-10 flex flex-col gap-6">

          {/* ── Page header ─────────────────────────────────────── */}
          <div className="inc-anim flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>Income</h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-3)" }}>Track all your earnings in one place</p>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 self-start sm:self-auto"
              style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)", boxShadow: "0 6px 24px rgba(5,150,105,0.38)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <LuPlus size={16} /> Add Income
            </button>
          </div>

          {/* ── Stat strip ──────────────────────────────────────── */}
          <div className="inc-anim grid grid-cols-3 gap-4">
            {STAT_CARDS.map(({ icon, label, num, prefix, color, dim }) => (
              <div
                key={label}
                className="card flex items-center gap-4"
                style={{ borderTop: `3px solid ${color}` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: dim, color }}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "var(--text-3)" }}>{label}</p>
                  <CountUp
                    value={num}
                    prefix={prefix}
                    className="text-lg font-bold mt-0.5 leading-tight block"
                    style={{ color: "var(--text-1)" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Body: chart + list side by side ─────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="inc-anim lg:col-span-3">
              <IncomeOverview transactions={incomeData} loading={loading} />
            </div>
            <div className="inc-anim lg:col-span-2">
              <IncomeList
                transactions={incomeData}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onDownload={handleDownloadIncomeDetails}
              />
            </div>
          </div>
        </div>

        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Income">
          <DeleteAlert content="Are you sure you want to delete this income entry?" onDelete={() => deleteIncome(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
