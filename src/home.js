import React, { useEffect, useReducer, useState } from "react";
import UseApi from "./useApi";
import "./user.css";
import { Button, Modal } from 'antd';

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

const Home = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [showUpdate, setShowUpdate] = useState(false); 
  const [updateData, setUpdateData] = useState({}); 
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const userUrl = { url: "http://localhost:8081/form/getAll", method: "get" };
  const postUrl = { url: "http://localhost:8081/form/addUser", method: "post" };
  const deleteUrl = {
    url: "http://localhost:8081/form/deleteUser",
    method: "post",
  };
  const updateUrl = {
    url: "http://localhost:8081/form/updateUser",
    method: "post",
  };
  const subjectUrl = {
    url: "http://localhost:8081/form/addMarks",
    method: "post",
  };
  const viewResultUrl = {
    url: "http://localhost:8081/form/viewResult",
    method: "post",
  };

  const { stateData: studentDetails, fetchData: getStudentDetails } =
    UseApi(userUrl);
  const { stateData: addUserResponse, fetchData: addUser } = UseApi(postUrl);
  const { stateData: deleteUserResponse, fetchData: deleteStudentDetails } =
    UseApi(deleteUrl);
  const { stateData: updateUserResponse, fetchData: updateUserDetails } =
    UseApi(updateUrl);
  const { stateData: addMarksResponse, fetchData: addMarks } =
    UseApi(subjectUrl);
  const { stateData: viewResultData, fetchData: viewResultDetails } =
    UseApi(viewResultUrl);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (studentDetails.isLoading) {
      dispatch({ type: "setLoading" });
    } else if (studentDetails.data) {
      dispatch({ type: "setData", value: studentDetails.data });
    } else if (studentDetails.error) {
      dispatch({ type: "setError", value: studentDetails.error });
    }
  }, [studentDetails]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getStudentDetails();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    await addUser(formData);
    await getStudentDetails();
    setFormData({});
  };

  const handleEditClick = (student, modal) => {
    setUpdateData(student);
    setShowUpdate(true);
  };

  const handleEditInput = (event) => {
    const { name, value } = event.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setShowUpdate(false);
  };

  const handleDelete = async (id) => {
    await deleteStudentDetails({ id });
    await getStudentDetails();
  };

  return (
    <div className="container-fluid users-table">
      {!studentDetails.isLoading && (
        <div className="text-center pt-3 pb-4">
          <Button variant="primary" onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-add"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>{" "}
            Add New User
          </Button>
        </div>
      )}

        <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      {/* <div className="table-container">
        {state.isLoading ? (
          <div className="loading">Loading...</div>
        ) : state.error ? (
          <div className="error">Error: {state.error}</div>
        ) : (
          <table className="table table-hover">
           <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Qualification</th>
                <th scope="col">Degree</th>
                <th scope="col">Department</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Age</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              {state.data &&
                state.data.map((student) => (
                  <tr key={student._id}>
                                        <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.address}</td>
                    <td>{student.qualification}</td>
                    <td>{student.degree}</td>
                    <td>{student.department}</td>
                    <td>{student.dob}</td>
                    <td>{student.age}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.mobileNumber}</td>
                    <td>
                    {
                        <li className="list-inline-item">
                          <Button
                            variant="success"
                            size="sm"
                            className="rounded-0"
                            onClick={() => {
                              handleEditClick(student, "modaledit");
                              setShowUpdate(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                          </Button>
                          <Modal
                            show={showUpdate}
                            onHide={() => setShowUpdate(false)}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                  <label
                                    for="firstName"
                                    className="col-form-label"
                                  >
                                    First Name:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.firstName}
                                  />
                                  <label
                                    for="lastName"
                                    className="col-form-label"
                                  >
                                    LastName:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.lastName}
                                  />
                                  <label
                                    for="address"
                                    className="col-form-label"
                                  >
                                    Address:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.address}
                                  />
                                  <label
                                    for="qualification"
                                    className="col-form-label"
                                  >
                                    Qualification:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="qualification"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.qualification}
                                  />
                                  <label
                                    for="degree"
                                    className="col-form-label"
                                  >
                                    Degree:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="degree"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.degree}
                                  />
                                  <label
                                    for="department"
                                    className="col-form-label"
                                  >
                                    Department:
                                  </label>
                                  <Form.Control
                                    type="text"
                                    name="department"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.department}
                                  />
                                  <label for="dob" className="col-form-label">
                                    Date of Birth:
                                  </label>
                                  <Form.Control
                                    type="date"
                                    name="dob"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.dob}
                                  />
                                  <label for="age" className="col-form-label">
                                    Age:
                                  </label>
                                  <Form.Control
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.age}
                                  />
                                  <label
                                    for="rollNumber"
                                    className="col-form-label"
                                  >
                                    Roll Number:
                                  </label>
                                  <Form.Control
                                    type="number"
                                    name="rollNumber"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.rollNumber}
                                  />
                                  <label
                                    for="mobileNumber"
                                    className="col-form-label"
                                  >
                                    Mobile Number:
                                  </label>
                                  <Form.Control
                                    type="number"
                                    name="mobileNumber"
                                    className="form-control"
                                    onChange={handleEditInput}
                                    value={updateData.mobileNumber}
                                  />
                                </div>
                                <div className="modal-footer">
                                  <Button
                                    variant="secondary"
                                    onClick={() => setShowUpdate(false)}
                                  >
                                    Close
                                  </Button>
                                  <Button type="submit" variant="primary">
                                    Submit
                                  </Button>
                                </div>
                              </Form>
                            </Modal.Body>
                          </Modal>
                        </li>
                      }
                    
                      {
                        <li className="list-inline-item">
                        <Button
                          variant="danger"
                          size="sm"
                          className="rounded-0"
                          title="Delete"
                          onClick={() => handleDelete(student.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </Button>
                      </li>
                      }
                      {
                      //   <li className="list-inline-item">
                      //   <Button
                      //     variant="primary"
                      //     onClick={() => addClick(student)}
                      //     data-toggle="modal"
                      //     data-target="#addResultModal"
                      //   >
                      //     Add result
                      //   </Button>

                      //   <Modal
                      //     show={addResultModalVisible}
                      //     onHide={() => setAddResultModalVisible(false)}
                      //     id="addResultModal"
                      //     centered
                      //   >
                      //     <Modal.Header closeButton>
                      //       <Modal.Title id="addResultModalLabel">
                      //         Add Result
                      //       </Modal.Title>
                      //     </Modal.Header>
                      //     <Modal.Body>
                      //       <Form
                      //         id="addResultForm"
                      //         onSubmit={handleAddSubject}
                      //       >
                      //         <Form.Group>
                      //           <Form.Label>Roll Number:</Form.Label>
                      //           <Form.Control
                      //             type="number"
                      //             name="rollnumber"
                      //             value={resultFormValue.rollnumber}
                      //             disabled
                      //           />
                      //         </Form.Group>
                      //         <Form.Group>
                      //           <Form.Label>DOB:</Form.Label>
                      //           <Form.Control
                      //             type="text"
                      //             name="dob"
                      //             value={resultFormValue.dob}
                      //             disabled
                      //           />
                      //         </Form.Group>
                      //         <Form.Group>
                      //           <Form.Label>Semester:</Form.Label>
                      //           <Form.Control
                      //             as="select"
                      //             name="semester"
                      //             onChange={addSubject}
                      //             aria-label="Default select example"
                      //           >
                      //             <option value="" selected>
                      //               Select the Semester
                      //             </option>
                      //             <option value="1">One</option>
                      //             <option value="2">Two</option>
                      //             <option value="3">Three</option>
                      //           </Form.Control>
                      //         </Form.Group>
                      //         <Form.Group>
                      //           <Form.Label>Subject:</Form.Label>
                      //           <Form.Control
                      //             type="text"
                      //             name="subject"
                      //             value={resultFormValue.subject}
                      //             onChange={addSubject}
                      //           />
                      //         </Form.Group>
                      //         <Form.Group>
                      //           <Form.Label>Mark:</Form.Label>
                      //           <Form.Control
                      //             type="text"
                      //             name="mark"
                      //             value={resultFormValue.mark}
                      //             onChange={addSubject}
                      //           />
                      //         </Form.Group>
                      //       </Form>
                      //     </Modal.Body>
                      //     <Modal.Footer>
                      //       <Button
                      //         variant="secondary"
                      //         onClick={() => setAddResultModalVisible(false)}
                      //       >
                      //         Close
                      //       </Button>
                      //       <Button
                      //         type="submit"
                      //         variant="primary"
                      //         form="addResultForm"
                      //       >
                      //         Submit
                      //       </Button>
                      //     </Modal.Footer>
                      //   </Modal>
                      // </li>
                      }
                    </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
          
        )}
        
      </div> */}
      
    </div>
  );
};

export default Home;
