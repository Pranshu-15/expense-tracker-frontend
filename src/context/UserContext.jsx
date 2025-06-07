import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    setIsLoading(false);
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    setIsLoading(false);
  };

  // Function to set loading state
  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        updateUser,
        clearUser,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
