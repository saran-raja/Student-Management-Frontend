import React from "react";

import { Modal, Form, Button, CloseButton } from "react-bootstrap";

const Modals = ({
  visibleModal,
  closeModal,
  handleAddSubject,
  addSubject,
  handleViewResultInput,
  handleViewResultSubmit,
  viewResultData,
  addMarksFormValue,
 
}) => {
  return (
    <div>
      <Modal
        show={visibleModal === 4}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>View Result</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="viewResultForm" onSubmit={handleViewResultSubmit}>
            <Form.Group>
              <Form.Label>Roll Number:</Form.Label>
              <Form.Control
                type="number"
                name="rollNumber"
                value={viewResultData.rollnumber}
                onChange={handleViewResultInput}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DOB:</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={viewResultData.dob}
                onChange={handleViewResultInput}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSemester">
              <Form.Label>Semester:</Form.Label>
              <Form.Control
                type="text"
                name="semester"
                value={viewResultData.semester}
                onChange={handleViewResultInput}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" form="viewResultForm" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={visibleModal === 5} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Add Marks</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="setSemester">
            <Form.Group controlId="formSemester">
              <Form.Label>Semester:</Form.Label>
              <Form.Control
                as="select"
                name="semester"
                value={addMarksFormValue.semester}
                onChange={addSubject}
                aria-label="Default select example"
                required
              >
                <option value="">Select the Semester</option>
                {(addMarksFormValue?.admissionType === "Lateral"
                  ? [3, 4, 5, 6]
                  : [1, 2, 3, 4, 5, 6]
                ).map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>{" "}
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={handleAddSubject} variant="primary">
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
