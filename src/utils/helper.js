import moment from "moment";

export const validateEmail = (email) =>{

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email)
};

export const getInitials = (name) => {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0]?.toUpperCase() || "";
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");

  // Indian numbering system formatting
  let formattedInteger = integerPart;
  
  if (integerPart.length > 3) {
    // Get the last 3 digits
    const lastThree = integerPart.slice(-3);
    // Get the remaining digits
    const remaining = integerPart.slice(0, -3);
    
    // Add commas every 2 digits for the remaining part (from right to left)
    const formattedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    
    formattedInteger = `${formattedRemaining},${lastThree}`;
  }

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};



export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  console.log('prepareIncomeBarChartData input:', data);
  console.log('Data type:', typeof data);
  console.log('Is array:', Array.isArray(data));
  
  if (!data || data.length === 0) {
    console.log('No data or empty array returned');
    return [];
  }
  
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  console.log('Sorted data:', sortedData);

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));

  console.log('Final chart data:', chartData);
  return chartData;
};
