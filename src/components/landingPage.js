import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseApi from "../useApi";
import "../App.css";
import Modals from "./modals";
import {
  Button,
  Table,
  Spinner,
  Form,
  Row,
  Col,
  Modal,
  CloseButton,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import EditMarksModal from "./editmarks";
import AddSubject from "./addSubject";
import { notification, Pagination, Select } from "antd";
import AddUser from "./addUser";
import EditUser from "./editUser";
import AddMarks from "./addMarks";
import DeleteMarks from "./deleteMarks";
import { FaUserPlus, FaEye, FaSignInAlt } from "react-icons/fa";
import ViewMarkModal from "./viewMarkModal";
import UseLogin from "./login/useLogin";
const { Option } = Select;

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setLoading":
      return { ...state, isLoading: true, error: null };
    case "setData":
      return { ...state, isLoading: false, data: action.value };
    case "setError":
      return { ...state, isLoading: false, error: action.value };
    default:
      return state;
  }
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [visibleModal, setVisibleModal] = useState(null);
  const [newUserData, setNewUserData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [addMarksFormValue, setAddMarksFormValue] = useState({});
  const [viewResultForm, setViewResultForm] = useState({});
  const [editMarkForm, setEditMarkForm] = useState({});
  const [updateFormValue, setUpdateFormValue] = useState({});
  const [updatedMarksValue, setUpdatedMarksValue] = useState({});
  const [paramsData, setParamsData] = useState(3);
  const [searchData, setSearchData] = useState("");
  const [deleteMarkParams, setDeleteMarkParams] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const [addSubjectFormData, setAddSubjectFormData] = useState({
    rollNumber: "",
    semester: "",
    subjects: [{ coursecode: "", subjectname: "" }],
  });
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
  const { userLoginData } = UseLogin();
  // console.log(userLoginData);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const deleteUrl = {
    url: `https://student-management-backend-api.onrender.com/form/deleteUser/${paramsData?.rollNumber}`,
    method: "delete",
  };
  const updateUrl = {
    url: `https://student-management-backend-api.onrender.com/form/updateUser/${paramsData}`,
    method: "put",
  };
  const subjectUrl = {
    url: "https://student-management-backend-api.onrender.com/form/addMarks",
    method: "post",
  };
  const viewResultUrl = {
    url: "https://student-management-backend-api.onrender.com/form/viewResult",
    method: "post",
  };
  const viewSubjectUrl = {
    url: "https://student-management-backend-api.onrender.com/form/viewSubject",
    method: "post",
  };
  const findMarksUrl = {
    url: "https://student-management-backend-api.onrender.com/form/findMarks",
    method: "post",
  };
  const updateMarkUrl = {
    url: `https://student-management-backend-api.onrender.com/form/updateMarks/${paramsData.rollNumber}/${paramsData.semester}`,
    method: "put",
  };
  const addSubjectUrl = {
    url: "https://student-management-backend-api.onrender.com/form/addSubject",
    method: "post",
  };
  const maxRollNumberUrl = {
    url: "https://student-management-backend-api.onrender.com/form/rollnumber",
    method: "get",
  };
  const getAllMarksUrl = {
    url: `https://student-management-backend-api.onrender.com/form/getAllMarks/${deleteMarkParams}`,
    method: "get",
  };
  // console.log(getAllMarksUrl);

  const viewMarksUrl = {
    url: `https://student-management-backend-api.onrender.com/form/viewMarks/${paramsData.viewMarksRollnumber}`,
    method: "get",
  };
  const userUrl = {
    url: "https://student-management-backend-api.onrender.com/form/getAll",
    method: "get",
    // headers: { Authorization: `Bearer ${token}` },
  };

  // console.log(userUrl);

  const { stateData: viewMarks, fetchData: getviewMarks } =
    UseApi(viewMarksUrl);
  const { stateData: studentDetails, fetchData: getStudentDetails } =
    UseApi(userUrl);
  const { stateData: deleteUserResponse, fetchData: deleteStudentDetails } =
    UseApi(deleteUrl);
  const { stateData: updateUserResponse, fetchData: updateUserDetails } =
    UseApi(updateUrl);
  const { stateData: addMarksResponse, fetchData: addMarks } =
    UseApi(subjectUrl);
  const { stateData: viewResultData, fetchData: viewResultDetails } =
    UseApi(viewResultUrl);
  const { stateData: viewSubjectData, fetchData: viewSubjectDetails } =
    UseApi(viewSubjectUrl);
  const { stateData: updateMarkData, fetchData: updateMarkDetails } =
    UseApi(findMarksUrl);
  const { stateData: addSubjectData, fetchData: addSubjectDetails } =
    UseApi(addSubjectUrl);
  const { stateData: updateMark, fetchData: updateMarkdata } =
    UseApi(updateMarkUrl);
  const { stateData: maxRollNumber, fetchData: getMaxRollNumber } =
    UseApi(maxRollNumberUrl);
  const { stateData: allMarks, fetchData: getAllMarks } =
    UseApi(getAllMarksUrl);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (studentDetails.isLoading) {
    } else if (studentDetails.data) {
      dispatch({ type: "setData", value: studentDetails.data });
    } else if (studentDetails.error) {
      dispatch({ type: "setError", value: studentDetails.error });
    }
  }, [studentDetails]);

  const showModal = (modalNumber) => setVisibleModal(modalNumber);
  const closeModal = () => setVisibleModal(null);

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  const viewMarksClick = async (student) => {
    setParamsData({ viewMarksRollnumber: student?.rollNumber });
    console.log(paramsData);
  };
  useEffect(() => {
    if (paramsData?.viewMarksRollnumber) {
      getviewMarks();
      setParamsData(0);
      showModal(11);
    }
  }, [paramsData]);
  // console.log(viewMarks.data);

  useEffect(() => {
    if (!viewMarks?.isLoading && viewMarks?.data) {
      console.log("viewMarks.data", viewMarks?.data);
    }
  }, [viewMarks]);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    // const storedRole = localStorage.getItem("role");

    if (storedUsername) setUsername(storedUsername);
    // if (storedRole) setRole(storedRole);
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  // console.log(username);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const filteredData = studentDetails?.data
    ?.slice()
    .reverse()
    .filter((student) =>
      `${student?.firstName} ${student?.lastName} ${student?.rollNumber} ${student?.department} ${student?.address}${student?.admissionType}`
        .toLowerCase()
        .includes(searchData)
    );
  // console.log(filteredData);

  const startIndex = (currentPage - 1) * pageSize;
  // console.log(startIndex);

  const endIndex = startIndex + pageSize;
  const currentData = [filteredData?.slice(startIndex, endIndex)];
  // console.log(token.length);
  useEffect(() => {
    if (token.length > 1) {
      getStudentDetails();
    }
  }, [token, deleteUserResponse, updateUserResponse]);

  // console.log(token, "token");

  const handleNewUserClick = async () => {
    await getMaxRollNumber();
  };
  // console.log(newUserData);

  useEffect(() => {
    if (!maxRollNumber?.isLoading && maxRollNumber?.data) {
      setNewUserData({
        rollNumber: Number(maxRollNumber?.data),
      });
      showModal(1);
    }
  }, [maxRollNumber]);

  const handleEditClick = (student) => {
    setParamsData(student?.rollNumber);
    setUpdateData(student);
  };

  const handleEditInput = (event) => {
    const { name, value } = event.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserDetails(updateData);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (student) => {
    // console.log("User ID:", student.rollNumber);
    showModal(9);
    await setParamsData({
      rollNumber: student?.rollNumber,
      username: `${student?.firstName}${student?.lastName}`,
    });
  };

  // console.log("paramsData", paramsData);

  const submitDelete = async () => {
    try {
      deleteStudentDetails();
      closeModal();
      console.log(deleteUserResponse);
    } catch (error) {
      console.error("Error deleting user:", error);
      openNotification("error", "Error", "An error occurred.");
    }
  };

  useEffect(() => {
    if (
      !deleteUserResponse?.isLoading &&
      deleteUserResponse?.data?.status === "success"
    ) {
      openNotification("success", "Success", deleteUserResponse?.data?.message);
      getStudentDetails();
    } else if (deleteUserResponse?.data?.status === "error") {
      openNotification("error", "Error", deleteUserResponse?.data?.message);
    }
  }, [deleteUserResponse]);
  useEffect(() => {
    if (
      !addMarksResponse?.isLoading &&
      addMarksResponse?.data?.status === "success"
    ) {
      openNotification("success", "Success", addMarksResponse?.data?.message);
      getStudentDetails();
    } else if (addMarksResponse?.data?.status === "error") {
      openNotification("error", "Error", addMarksResponse?.data?.message);
    }
  }, [addMarksResponse]);
  useEffect(() => {
    if (!updateMark?.isLoading && updateMark?.data?.status === "success") {
      openNotification("success", "Success", updateMark?.data?.message);
      // getStudentDetails();
      setParamsData(0);
    } else if (updateMark?.data?.status === "error") {
      openNotification("error", "Error", updateMark?.data?.message);
    }
  }, [updateMark]);
  useEffect(() => {
    if (
      !addSubjectData?.isLoading &&
      addSubjectData?.data?.status === "success"
    ) {
      openNotification("success", "Success", addSubjectData?.data?.message);
      getStudentDetails();
    } else if (deleteUserResponse?.data?.status === "error") {
      openNotification("error", "Error", addSubjectData?.data?.message);
    }
  }, [addSubjectData]);

  const addMarksClick = async (student) => {
    console.log({
      rollNumber: student?.rollNumber,
      semester: addMarksFormValue?.semester,
    });
    setAddMarksFormValue({
      rollNumber: student?.rollNumber,
      admissionType: student?.admissionType,
    });
  };

  const handleAddSubject = async (event) => {
    event.preventDefault();
    closeModal();
    console.log("=>", {
      addMarksFormValue,
    });
    await viewSubjectDetails(addMarksFormValue);
  };

  useEffect(() => {
    if (!viewSubjectData?.isLoading && viewSubjectData?.data) {
      console.log("subject data", viewSubjectData?.data);
      showModal(3);
    } else if (viewSubjectData?.isLoading) {
      console.log("loading subject data");
    }
  }, [viewSubjectData]);
  const handleSearchChange = (e) => {
    setSearchData(e.target?.value?.toLowerCase());
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!updateMarkData.isLoading && updateMarkData.data) {
      console.log("updateMarkData", updateMarkData);

      showModal(7);
    }
  }, [updateMarkData]);
  const addSubject = (e) => {
    const { name, value } = e.target;
    if (name === "subject") {
      console.log(value);

      const [coursecode, subject] = value.split("-");
      // console.log("coursecode", coursecode);

      console.log("subject", subject);
      setAddMarksFormValue((prevValue) => ({
        ...prevValue,
        coursecode: coursecode,
      }));
    } else {
      setAddMarksFormValue((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };
  const submitSemesterPage = async (event) => {
    event.preventDefault();
    await addMarks(addMarksFormValue);
    closeModal();
  };
  const handleViewResultInput = (event) => {
    const { name, value } = event?.target;
    setViewResultForm({ ...viewResultForm, [name]: value });
  };
  const handleViewResultSubmit = async (event) => {
    event.preventDefault();
    await viewResultDetails(viewResultForm);
  };
  useEffect(() => {
    if (!viewResultData?.isLoading && viewResultData?.data) {
      navigate("/result", { state: { resultData: viewResultData?.data } });
    }
  }, [viewResultData]);
  const editMarksClick = async (student) => {
    // console.log(student);

    setEditMarkForm({
      rollNumber: student?.rollNumber,
      admissionType: student?.admissionType,
    });

    showModal(6);
  };
  useEffect(() => {
    if (editMarkForm?.rollNumber) {
    }
  }, [editMarkForm]);

  const updateSemesterPage = (e) => {
    e.preventDefault();
    updateMarkDetails(editMarkForm);
  };
  const handleEditMarks = (event) => {
    const { name, value } = event?.target;
    setEditMarkForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    setUpdateFormValue((prev) => ({
      ...prev,
      ...editMarkForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!updateMarkData?.isLoading && updateMarkData?.data) {
      setUpdatedMarksValue((prev) => ({
        ...prev,
        // ...editMarkForm,
        marks: updateMarkData?.data,
      }));
      setParamsData({
        rollNumber: editMarkForm?.rollNumber,
        semester: editMarkForm?.semester,
      });
    }
  }, [updateMarkData]);
  const handleUpdateMarkInput = (event, index) => {
    const { name, value } = event.target;
    const updatedMarks = [...updatedMarksValue?.marks];
    updatedMarks[index] = {
      ...updatedMarks[index],
      [name]: value,
    };
    setUpdatedMarksValue((prev) => ({
      ...prev,
      marks: updatedMarks,
    }));
    // console.log("updatedMarksValue:", updatedMarksValue);
  };

  const handleSubmitUpdateMark = (e) => {
    e.preventDefault();
    updateMarkdata(updatedMarksValue);
    closeModal();
  };
  // console.log("updateMarkDetails.data", updateMarkDetails.data);

  const handleOpenAddSubject = (student) => {
    setAddSubjectFormData({
      rollNumber: student?.rollNumber,
      admissionType: student?.admissionType,
      subjects: [{ courseCode: "", subjectName: "" }],
    });
    showModal(8);
  };
  const handleAddSubjectInputChange = (event, index, type) => {
    const { name, value } = event.target;
    if (type === "subject") {
      const newSubjects = [...addSubjectFormData?.subjects];
      newSubjects[index][name] = value;

      setAddSubjectFormData({ ...addSubjectFormData, subjects: newSubjects });
    } else {
      setAddSubjectFormData({ ...addSubjectFormData, [name]: value });
    }
  };
  const addSubjectBtn = () => {
    setAddSubjectFormData({
      ...addSubjectFormData,
      subjects: [
        ...addSubjectFormData.subjects,
        { courseCode: "", subjectName: "" },
      ],
    });
  };
  const submitAddSubjectForm = (e) => {
    e.preventDefault();
    addSubjectDetails(addSubjectFormData);
    closeModal();
  };
  const deleteMarkClick = async (student) => {
    setDeleteMarkParams(student?.rollNumber);
  };
  useEffect(() => {
    if (deleteMarkParams) {
      getAllMarks();
    }
  }, [deleteMarkParams]);
  useEffect(() => {
    if (!allMarks?.isLoading && allMarks?.data) {
      showModal(10);
    }
  }, [allMarks]);

  return (
    <div>
      <div>
        <Navbar expand="lg" className="p-3 shadow-sm navbar">
          <Container>
            <Navbar.Brand href="#home" className="fw-bold text-primary">
              KEC
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home" className="mx-2 text-secondary">
                  Home
                </Nav.Link>

                <Nav.Link
                  onClick={handleNewUserClick}
                  className="mx-2 text-secondary d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  // disabled={role === "Student"}
                >
                  <FaUserPlus className="me-1" /> Add New User
                </Nav.Link>
                <Nav.Link
                  onClick={() => showModal(4)}
                  className="mx-2 text-secondary d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <FaEye className="me-1" /> View Result
                </Nav.Link>

                <Nav.Link
                  className="mx-2 text-secondary d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLogout()}
                >
                  <FaSignInAlt className="me-1" /> Logout
                </Nav.Link>
                <Nav.Link disabled>
                  <span className="ms-3 text-secondary">{`${username[0]?.toUpperCase()}${username?.slice(
                    1
                  )}`}</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <Col xs="auto" style={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                value={searchData}
                className="border rounded-pill px-3 shadow-sm"
                style={{ maxWidth: "400px", marginRight: "10px" }}
              />
            </Col>
          </Container>
        </Navbar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // paddingTop: "40px",
            paddingBottom: "20px",
            flexDirection: "row",
          }}
        ></div>

        {studentDetails?.isLoading && studentDetails?.data ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div
            className="container-fluid"
            style={{ padding: "20px 20px 0px 20px" }}
          >
            <Table hover bordered transparent>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>First Name</th>
                  <th style={{ textAlign: "center" }}>Last Name</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>Qualification</th>
                  <th style={{ textAlign: "center" }}>Degree</th>
                  <th style={{ textAlign: "center" }}>Department</th>
                  <th style={{ textAlign: "center" }}>Date of Birth</th>
                  <th style={{ textAlign: "center" }}>Age</th>
                  <th style={{ textAlign: "center" }}>
                    Roll <br></br>Number
                  </th>
                  <th style={{ textAlign: "center" }}>AdmissionType</th>
                  <th style={{ textAlign: "center" }}>Mobile Number</th>
                  <th style={{ textAlign: "center" }}>Options</th>
                </tr>
              </thead>
              <tbody>
                {currentData[0]
                  // ?.slice()
                  // ?.reverse()
                  ?.map((student) => (
                    <tr key={student?.id}>
                      <td>{student?.id}</td>
                      <td>{student?.firstName}</td>
                      <td>{student?.lastName}</td>
                      <td>{student?.address}</td>
                      <td>{student?.qualification}</td>
                      <td>{student?.degree}</td>
                      <td>{student?.department}</td>
                      <td>{student?.dob}</td>
                      <td>{student?.age}</td>
                      <td>{student?.rollNumber}</td>
                      <td>{student?.admissionType}</td>
                      <td>{student?.mobileNumber}</td>
                      <td
                        className="option-td"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          textAlign: "center",
                        }}
                      >
                        <div className="d-flex gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            className="rounded-0 "
                            // disabled={role === "Student"}
                            onClick={() => (
                              showModal(2), handleEditClick(student)
                            )}
                            style={{ width: "110px" }}
                          >
                            Edit User
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-0"
                            title="Delete"
                            onClick={() => handleDelete(student)}
                            // disabled={role === "Student"}
                            style={{ width: "95px" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>{" "}
                            User
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded-0"
                            style={{ width: "120px" }}
                            // onClick={() => showModal(8)}
                            onClick={() => handleOpenAddSubject(student)}
                            // disabled={role === "Student"}
                          >
                            Add Subjects
                          </Button>
                        </div>
                        <div className="d-flex gap-1 ">
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded-0"
                            style={{ width: "85px" }}
                            onClick={() => {
                              showModal(5);
                              addMarksClick(student);
                            }}
                            // disabled={role === "Student"}
                          >
                            Add Marks
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            className="rounded-0"
                            style={{ width: "77px" }}
                            onClick={() => {
                              editMarksClick(student);
                            }}
                            // disabled={role === "Student"}
                          >
                            Edit Mark
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-0"
                            style={{ width: "69px" }}
                            onClick={() => {
                              // showModal(10);
                              // setParamsData(student.rollNumber);
                              deleteMarkClick(student);
                              // showModal(10);
                            }}
                            // disabled={role === "Student"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>{" "}
                            Mark
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            className="rounded-0"
                            style={{ width: "90px" }}
                            // disabled={role === "Student"}
                            onClick={() => viewMarksClick(student)}
                          >
                            View Marks
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>{" "}
            <div className="d-flex justify-content-center">
              <Select
                defaultValue={pageSize}
                style={{ width: 120 }}
                onChange={handlePageSizeChange}
              >
                <Option value={5}>5 users/page</Option>
                <Option value={10}>10 users/page</Option>
                <Option value={20}>20 users/page</Option>
              </Select>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={studentDetails?.data?.length || 0}
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        )}
      </div>

      <Modal show={visibleModal === 9} onHide={closeModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Body>
          Roll Number : {paramsData.rollNumber}
          <br></br>
          User Name : {paramsData.username}
        </Modal.Body>
        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={submitDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modals
        visibleModal={visibleModal}
        closeModal={closeModal}
        addMarksClick={addMarksClick}
        handleAddSubject={handleAddSubject}
        addSubject={addSubject}
        handleViewResultInput={handleViewResultInput}
        handleViewResultSubmit={handleViewResultSubmit}
        viewResultData={viewResultData}
        addMarksFormValue={addMarksFormValue}
        // addUserResponse={addUserResponse}
      />
      <AddUser
        visibleModal={visibleModal}
        closeModal={closeModal}
        getStudentDetails={getStudentDetails}
        openNotification={openNotification}
        newUserData={newUserData}
        setNewUserData={setNewUserData}
      />

      <EditMarksModal
        visibleModal={visibleModal}
        closeModal={closeModal}
        addMarksFormValue={addMarksFormValue}
        handleAddSubject={handleAddSubject}
        handleEditMarks={handleEditMarks}
        updateSemesterPage={updateSemesterPage}
        updateMarkData={updateMarkData}
        handleUpdateMarkInput={handleUpdateMarkInput}
        updateFormValue={updateFormValue}
        updatedMarksValue={updatedMarksValue}
        editMarkForm={editMarkForm}
        handleSubmitUpdateMark={handleSubmitUpdateMark}
      />
      <AddSubject
        visibleModal={visibleModal}
        closeModal={closeModal}
        handleAddSubjectInputChange={handleAddSubjectInputChange}
        addSubjectFormData={addSubjectFormData}
        addSubjectBtn={addSubjectBtn}
        submitAddSubjectForm={submitAddSubjectForm}
        handleUpdateMarkInput={handleUpdateMarkInput}
      />
      <EditUser
        closeModal={closeModal}
        visibleModal={visibleModal}
        handleEditSubmit={handleEditSubmit}
        updateData={updateData}
        handleEditInput={handleEditInput}
        updateUserResponse={updateUserResponse}
        openNotification={openNotification}
      />
      <AddMarks
        visibleModal={visibleModal}
        closeModal={closeModal}
        submitSemesterPage={submitSemesterPage}
        addMarksFormValue={addMarksFormValue}
        viewSubjectData={viewSubjectData}
        addSubject={addSubject}
      />
      <DeleteMarks
        visibleModal={visibleModal}
        closeModal={closeModal}
        allMarks={allMarks}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        getStudentDetails={getStudentDetails}
        openNotification={openNotification}
        setDeleteMarkParams={setDeleteMarkParams}
      />
      <ViewMarkModal
        visibleModal={visibleModal}
        closeModal={closeModal}
        viewMarks={viewMarks}
      />
    </div>
  );
};
export default LandingPage;
