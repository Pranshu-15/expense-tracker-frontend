import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import useUserAuth from "../../hooks/useUserAuth";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths"; // Import your API config
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

const Income = () => {
  const { isLoading } = useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false); // Changed to false initially

  // Fetch income data
  const fetchIncomeData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Fetching income data with token:",
        token ? "Token exists" : "No token"
      );

      const url = `${BASE_URL}${API_PATHS.INCOME.GET_ALL_INCOME}`;
      console.log("API URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Income data received:", data);
        console.log("Data length:", data.length);
        setIncomeData(data);
      } else {
        const errorData = await response.text();
        console.error(
          "Failed to fetch income data:",
          response.status,
          errorData
        );
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //Validation Checks
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be valid numver greater then 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income Added Susscessfully");
      fetchIncomeData();
    } catch (error) {
      console.error(
        "Error adding Income",
        error.response?.data?.message || error.message
      );
    }
  };
  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      );
    }
  };
  //DownloadIncomeDetails
  const handleDownloadIncomeDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob", // Important for file downloads
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set filename with current date
      const currentDate = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `income_details_${currentDate}.xlsx`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    } finally {
      setLoading(false);
    }
  };
  // Fetch data when component mounts
  useEffect(() => {
    if (!isLoading) {
      fetchIncomeData();
    }
  }, [isLoading]);

  // Don't render until authentication is complete
  if (isLoading) {
    return (
      <DashboardLayout activeMenu="Income">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
              loading={loading}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal} // Fixed prop name
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income details?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
