import React, { useEffect, useState } from "react";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";
import UseApi from "../useApi";

const AddUser = ({
  visibleModal,
  closeModal,
  getStudentDetails,
  openNotification,
  newUserData,
  setNewUserData,
}) => {
  const postUrl = { url: "http://localhost:8081/form/addUser", method: "post" };
  const { stateData: addUserResponse, fetchData: addUser } = UseApi(postUrl);
  const [customQualification, setCustomQualificationVisible] = useState();
  const handleNewUserChange = (event, modal) => {
    const { name, value } = event.target;
    setNewUserData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getStudentDetails();
  }, [addUserResponse]);
  const handleNewUserSubmit = async (event) => {
    event.preventDefault();
    closeModal();
    try {
      const addUserResponse = await addUser(newUserData);

      if (addUserResponse?.data?.status === "success") {
        openNotification(
          "success",
          "Success",
          `handleNewUserSubmit ${addUserResponse?.data?.message}`
        );
        getStudentDetails();
      }
    } catch (error) {
      console.log("error", error);
      openNotification("error", "Error", addUserResponse?.data?.message);
    } finally {
      setNewUserData({});
    }
  };
  const handleQualificationChange = (e) => {
    handleNewUserChange(e);
    if (e.target.value === "others") {
      setCustomQualificationVisible(true);
    } else {
      setCustomQualificationVisible(false);
    }
  };
  useEffect(() => {
    if (
      !addUserResponse?.isLoading &&
      addUserResponse?.data?.status === "success"
    ) {
      openNotification("success", "Success", addUserResponse?.data?.message);
      // getStudentDetails();
    } else if (addUserResponse?.data?.status === "error") {
      openNotification("error", "Error", addUserResponse?.data?.message);
    }
  }, [addUserResponse]);
  return (
    <div>
      <Modal
        show={visibleModal === 1}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Add New User</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="newUserForm" onSubmit={handleNewUserSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                onChange={handleNewUserChange}
                value={newUserData?.firstName}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                onChange={handleNewUserChange}
                value={newUserData?.lastName}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleNewUserChange}
                value={newUserData?.address}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                as="select"
                name="qualification"
                onChange={handleQualificationChange}
                value={newUserData?.qualification}
                aria-label="Default select example"
                required
              >
                <option value="">Select the category</option>
                <option value="SSLC">SSLC</option>
                <option value="DIPLOMA">DIPLOMA</option>
                <option value="HSC">HSC</option>
                <option value="BE">BE</option>
                <option value="B.TECH">B.TECH</option>
                <option value="others">Others</option>
              </Form.Control>
              {customQualification && (
                <Form.Control
                  type="text"
                  name="customQualification"
                  placeholder="Enter your qualification"
                  onChange={handleNewUserChange}
                  value={newUserData.customQualification || ""}
                  className="mt-3"
                  required
                />
              )}
            </Form.Group>

            <Form.Group controlId="formDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                onChange={handleNewUserChange}
                value={newUserData.degree}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                onChange={handleNewUserChange}
                value={newUserData.department}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                onChange={handleNewUserChange}
                value={newUserData.dob}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                onChange={handleNewUserChange}
                value={newUserData.age}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="rollNumber"
                onChange={handleNewUserChange}
                value={newUserData.rollNumber}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formadmissionType">
              <Form.Label>AdmissionType:</Form.Label>
              <Form.Control
                as="select"
                name="admissionType"
                value={newUserData.admissionType}
                onChange={handleNewUserChange}
                aria-label="Default select example"
                required
              >
                <option value="">Select the category</option>
                <option value="Regular">Regular</option>
                <option value="Lateral">Lateral</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                name="mobileNumber"
                onChange={handleNewUserChange}
                value={newUserData.mobileNumber}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" form="newUserForm" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUser;
