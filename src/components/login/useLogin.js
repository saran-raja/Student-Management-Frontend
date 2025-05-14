import { useEffect, useState } from "react";
import UseApi from "../../useApi";
import { useNavigate } from "react-router-dom";

const UseLogin = () => {
  //   const [role, setRole] = useState({});
  //   console.log("from uselogin", role);

  const [LoginResponse, setLoginResponse] = useState({
    email: "",
    password: "",
    loading: false,
    error: null,
  });

  const loginUrl = {
    url: "https://student-management-backend-api.onrender.com/form/login",
    method: "post",
  };

  const { stateData: userLoginData, fetchData: setUserLogin } =
    UseApi(loginUrl);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    if (!userLoginData?.isLoading) {
      if (userLoginData?.data && userLoginData.data.success) {
        const { username, role, token } = userLoginData.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        // setRole({ username, role });

        navigate("/dashboard");
      } else if (userLoginData?.error) {
        setLoginResponse((prevState) => ({
          ...prevState,
          error: userLoginData.error.details || userLoginData.error,
        }));
      }
    }
  }, [userLoginData, navigate]);

  //   useEffect(() => {
  //     console.log("Updated role:", role);
  //   }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginResponse((prevState) => ({
      ...prevState,
      [name]: value,
      error: null,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginResponse((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    try {
      await setUserLogin({
        email: LoginResponse?.email,
        password: LoginResponse?.password,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      setLoginResponse((prevState) => ({
        ...prevState,
        error: "An unexpected error occurred. Please try again.",
      }));
    } finally {
      setLoginResponse((prevState) => ({ ...prevState, loading: false }));
    }
  };

  return {
    LoginResponse,
    handleChange,
    handleLogin,
    userLoginData,
  };
};

export default UseLogin;
