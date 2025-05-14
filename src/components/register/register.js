import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import UseApi from "../../useApi";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 2,
    });
  };
  notification.config({
    top: 64,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const userRegisterUrl = {
    url: "https://student-management-backend-api.onrender.com/form/register",
    method: "post",
  };

  const fetchRoleUrl = {
    url: "https://student-management-backend-api.onrender.com/form/role",
    method: "get",
  };

  const { stateData: userRegisterData, fetchData: setUserRegister } =
    UseApi(userRegisterUrl);
  const { stateData: fetchRoleData, fetchData: setFetchRole } =
    UseApi(fetchRoleUrl);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const data = await setFetchRole();
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Failed to fetch roles");
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, [setFetchRole]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await setUserRegister(formData);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !userRegisterData?.isLoading &&
      userRegisterData?.data?.status === "success"
    ) {
      openNotification("success", "Success", userRegisterData?.data?.message);
      navigate("/login");
    } else if (userRegisterData?.data?.status === "error") {
      openNotification("error", "Error", userRegisterData?.data?.message);
    }
  }, [userRegisterData]);

  return (
    <Container className="auth-container">
      <Form onSubmit={handleRegister} className="auth-form">
        <h2 className="text-center">Register</h2>
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formRole">
          {loadingRoles ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading roles...</p>
            </div>
          ) : (
            <Form.Control
              as="select"
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {fetchRoleData.data ? (
                fetchRoleData.data.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              ) : (
                <option value="">No roles available</option>
              )}
            </Form.Control>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="btn-block"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
