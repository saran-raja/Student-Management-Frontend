import React from "react";
import { Button, CloseButton, Form, Modal } from "react-bootstrap";

const AddMarks = ({
  visibleModal,
  closeModal,
  submitSemesterPage,
  addMarksFormValue,
  viewSubjectData,
  addSubject,
}) => {
  return (
    <div>
      <Modal
        show={visibleModal === 3}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Add Marks</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form id="addResultForm" onSubmit={submitSemesterPage}>
            <Form.Group>
              <Form.Label>Roll Number:</Form.Label>
              <Form.Control
                type="number"
                name="rollNumber"
                value={addMarksFormValue.rollNumber}
                disabled
                required
              />
            </Form.Group>
            <Form.Group controlId="formSemester">
              <Form.Label>Semester:</Form.Label>
              <Form.Control
                as="select"
                name="semester"
                value={addMarksFormValue.semester}
                onChange={addSubject}
                aria-label="Default select example"
                disabled
              >
                <option value="">Select the Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSubject">
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                as="select"
                name="subject"
                value={viewSubjectData.subject}
                onChange={addSubject}
                aria-label="Select Subject"
                required
              >
                <option value="">Select a Subject</option>

                {viewSubjectData.data &&
                  viewSubjectData.data.map((subject) => (
                    <option
                      key={subject.coursecode}
                      value={`${subject.coursecode}-${subject.subjectname}`}
                    >
                      {subject.coursecode} - {subject.subjectname}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMark">
  <Form.Label>Mark:</Form.Label>
  <Form.Control
    type="number" 
    name="mark"
    value={addMarksFormValue.mark}
    onChange={addSubject}
    min="0"
    max="100" 
    required
  />
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" form="addResultForm" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMarks;
