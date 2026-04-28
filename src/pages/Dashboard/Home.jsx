import React, { useContext, useEffect, useRef, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuSparkles } from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { UserContext } from "../../context/UserContext";
import { gsap } from "gsap";

const GREETINGS = ["Good morning", "Good afternoon", "Good evening"];
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return GREETINGS[0];
  if (h < 17) return GREETINGS[1];
  return GREETINGS[2];
};

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const pageRef  = useRef(null);
  const animated = useRef(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) setDashboardData(response.data);
    } catch (_) {}
  };

  const fetchInsights = async () => {
    setInsightLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_INSIGHTS);
      if (response.data?.insight) {
        setInsight(response.data.insight);
      }
    } catch (_) {
      setInsight("Unable to generate insights at the moment.");
    } finally {
      setInsightLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  useEffect(() => {
    if (dashboardData && !insight && !insightLoading) {
      fetchInsights();
    }
  }, [dashboardData]);

  useEffect(() => {
    if (!dashboardData || animated.current || !pageRef.current) return;
    animated.current = true;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dash-card",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out", clearProps: "all" }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [dashboardData]);

  const firstName = user?.fullName?.split(" ")[0] || "there";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  const totalBalance = dashboardData?.totalBalance || 0;
  const totalIncome  = dashboardData?.totalIncome  || 0;
  const totalExpense = dashboardData?.totalExpense  || 0;
  const savingsRate  = totalIncome > 0
    ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
    : 0;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div ref={pageRef} className="relative py-4">

        {/* Background glow orbs */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-60px", right: "80px",
            width: "320px", height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(135,92,245,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "120px", left: "60px",
            width: "260px", height: "260px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%)",
            filter: "blur(50px)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10">
          {/* ── Greeting ─────────────────────────────────────────── */}
          <div className="dash-card flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--text-3)" }}>
                {today}
              </p>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-1)" }}>
                {getGreeting()},{" "}
                <span style={{ color: "var(--accent)" }}>{firstName}!</span>
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-2)" }}>
                Here's your financial snapshot.
              </p>
            </div>

            {/* Savings rate badge */}
            {totalIncome > 0 && (
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-2xl"
                style={{
                  background: savingsRate >= 0 ? "var(--green-dim)" : "var(--red-dim)",
                  border: `1px solid ${savingsRate >= 0 ? "var(--green)" : "var(--red)"}`,
                }}
              >
                <LuSparkles
                  size={16}
                  style={{ color: savingsRate >= 0 ? "var(--green)" : "var(--red)" }}
                />
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: savingsRate >= 0 ? "var(--green)" : "var(--red)" }}
                  >
                    Savings Rate
                  </p>
                  <p
                    className="text-lg font-bold leading-tight"
                    style={{ color: savingsRate >= 0 ? "var(--green)" : "var(--red)" }}
                  >
                    {savingsRate}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Stat cards ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div className="dash-card">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandsSeparator(totalBalance)}
                colorScheme="purple"
              />
            </div>
            <div className="dash-card">
              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addThousandsSeparator(totalIncome)}
                colorScheme="green"
              />
            </div>
            <div className="dash-card">
              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandsSeparator(totalExpense)}
                colorScheme="red"
              />
            </div>
          </div>

          {/* ── Widgets ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* AI Insights Widget */}
            <div className="dash-card md:col-span-2">
              <div
                className="p-5 rounded-2xl relative overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div className="flex items-start gap-3 relative z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-dim)" }}
                  >
                    <LuSparkles size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-1)" }}>
                      AI Spending Insights
                    </h3>
                    {insightLoading ? (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent) transparent var(--accent) var(--accent)" }}></span>
                        <p className="text-xs" style={{ color: "var(--text-3)" }}>Analyzing your recent transactions...</p>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {insight || "No insights available yet."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
            </div>
            <div className="dash-card">
              <FinanceOverview
                totalBalance={totalBalance}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
            </div>
            <div className="dash-card">
              <ExpenseTransaction
                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
              />
            </div>
            <div className="dash-card">
              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpenses?.transactions || []}
              />
            </div>
            <div className="dash-card">
              <RecentIncomeWithChart
                data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                totalIncome={totalIncome}
              />
            </div>
            <div className="dash-card">
              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
