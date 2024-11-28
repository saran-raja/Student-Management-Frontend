import React, { useState } from "react";
import { Modal, Button, Form, CloseButton, Col, Row } from "react-bootstrap";

const EditMarksModal = ({
  visibleModal,
  closeModal,
  addMarksFormValue,
  editMarkForm,
  addSubject,
  handleAddSubject,
  handleEditMarks,
  updateSemesterPage,
  updateMarkData,
  handleUpdateMarkInput,
  updateFormValue,
  updatedMarksValue,
  handleSubmitUpdateMark,
}) => {
  return (
    <div>
      <Modal show={visibleModal === 6} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Edit Marks</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="setSemester">
            <Form.Group controlId="formSemester">
              <Form.Label>Semester:</Form.Label>
              <Form.Control
                as="select"
                name="semester"
                onChange={handleEditMarks}
                value={updateFormValue?.semester}
                aria-label="Default select example"
              >
                <option value="">Select the Semester</option>
                {(editMarkForm?.admissionType === "Lateral"
                  ? [3, 4, 5, 6]
                  : [1, 2, 3, 4, 5, 6]
                ).map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={updateSemesterPage} variant="primary">
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
  show={visibleModal === 7}
  onHide={closeModal}
  centered
  backdrop="static"
>
  <Modal.Header>
    <Modal.Title>Edit Marks</Modal.Title>
    <CloseButton onClick={closeModal} />
  </Modal.Header>
  <Modal.Body>
    <Form id="updateMarkForm" onSubmit={handleSubmitUpdateMark}>
      <Form.Group>
        <Form.Label>Roll Number:</Form.Label>
        <Form.Control
          type="number"
          name="rollnumber"
          value={updateFormValue?.rollNumber}
          // onChange={handleUpdateMarkInput}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formSemester">
        <Form.Label>Semester:</Form.Label>
        <Form.Control
          as="select"
          name="semester"
          value={updateFormValue?.semester}
          // onChange={handleUpdateMarkInput}
          aria-label="Default select example"
          disabled
        >
          <option value="">Select the Semester</option>
          {(editMarkForm?.admissionType === "Lateral"
            ? [3, 4, 5, 6]
            : [1, 2, 3, 4, 5, 6]
          ).map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {updatedMarksValue.marks &&
        updatedMarksValue.marks.map((marks, index) => (
          <div key={index}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject:</Form.Label>
                  <Form.Control
                    as="select"
                    name="subject"
                    value={editMarkForm}
                    onChange={handleEditMarks}
                    aria-label="Select Subject"
                    disabled
                  >
                    <option value="">{marks.coursecode}</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formMark">
                  <Form.Label>Mark:</Form.Label>
                  <Form.Control
                    type="number"
                    name="mark"
                    value={marks.mark}
                    min="0"
                    max="100" 
                    onChange={(e) => handleUpdateMarkInput(e, index)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>
      Close
    </Button>
    <Button type="submit" form="updateMarkForm" variant="primary">
      Submit
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default EditMarksModal;
