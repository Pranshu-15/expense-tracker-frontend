import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const useUserAuth = () => {
  const { user, updateUser, clearUser, setLoading, isLoading } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already loaded, no need to fetch again
    if (user) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate, setLoading]);

  return { isLoading };
};

export default useUserAuth;
