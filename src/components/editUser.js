import React, { useEffect } from "react";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";

const EditUser = ({
  closeModal,
  visibleModal,
  handleEditSubmit,
  updateData,
  handleEditInput,
  updateUserResponse,
  openNotification,
}) => {
  useEffect(() => {
    if (
      !updateUserResponse?.isLoading &&
      updateUserResponse?.data?.status === "success"
    ) {
      openNotification("success", "Success", updateUserResponse?.data?.message);
    } else if (updateUserResponse?.data?.status === "error") {
      openNotification("error", "Error", updateUserResponse?.data?.message);
    }
  }, [updateUserResponse]);
  return (
    <div>
      <Modal
        show={visibleModal === 2}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="editUserForm" onSubmit={handleEditSubmit}>
            <Form.Group controlId="formEditFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                onChange={handleEditInput}
                value={updateData?.firstName}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEditLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                onChange={handleEditInput}
                value={updateData?.lastName}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEditAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleEditInput}
                value={updateData?.address}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEditQualification">
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                onChange={handleEditInput}
                value={updateData?.qualification}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEditDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                onChange={handleEditInput}
                value={updateData?.degree}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEditDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                onChange={handleEditInput}
                value={updateData?.department}
                required
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formEditDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                onChange={handleEditInput}
                value={updateData?.dob}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEditAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                onChange={handleEditInput}
                value={updateData?.age}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEditRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="number"
                name="rollNumber"
                onChange={handleEditInput}
                value={updateData?.rollNumber}
                required
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formEditAdmissionType">
              <Form.Label>admissionType:</Form.Label>
              <Form.Control
                as="select"
                name="admissionType"
                value={updateData?.admissionType}
                onChange={handleEditInput}
                aria-label="Default select example"
                required
                disabled
              >
                <option value="">Select the category</option>
                <option value="Regular">Regular</option>
                <option value="Lateral">Lateral</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEditMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                name="mobileNumber"
                onChange={handleEditInput}
                value={updateData?.mobileNumber}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" form="editUserForm" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;
