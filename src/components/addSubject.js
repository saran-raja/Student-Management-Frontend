import React from "react";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";

const AddSubject = ({
  visibleModal,
  closeModal,
  handleAddSubjectInputChange,
  addSubjectFormData,
  addSubjectBtn,
  submitAddSubjectForm,
}) => {
  return (
    <div>
      <Modal show={visibleModal === 8} onHide={closeModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>Add Subjects</Modal.Title>
          <CloseButton onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
          <Form
            id="addSubjectForm"
            onSubmit={submitAddSubjectForm}
            backdrop="static"
          >
            {/* <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                name="id"
                value={addSubjectFormData.id}
                onChange={handleAddSubjectInputChange}
              />
            </Form.Group> */}

            <Form.Group controlId="formRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Roll Number"
                name="rollNumber"
                value={addSubjectFormData.rollNumber}
                onChange={handleAddSubjectInputChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formSemester">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                as="select"
                name="semester"
                value={addSubjectFormData.semester}
                onChange={handleAddSubjectInputChange}
                required
              >
                <option value="">Select the Semester</option>
                {(addSubjectFormData.admissionType === "Lateral"
                  ? ["3", "4", 5, 6]
                  : ["1", "2", 3, 4, 5, 6]
                ).map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {addSubjectFormData.subjects.map((subject, index) => (
              <div key={index}>
                <Form.Group controlId={`formCourseCode-${index}`}>
                  <Form.Label>Course Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Course Code"
                    name="courseCode"
                    value={subject.courseCode}
                    onChange={(e) =>
                      handleAddSubjectInputChange(e, index, "subject")
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId={`formSubjectName-${index}`}>
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject Name"
                    name="subjectName"
                    value={subject.subjectName}
                    onChange={(e) =>
                      handleAddSubjectInputChange(e, index, "subject")
                    }
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <br />
            <Button variant="secondary" onClick={addSubjectBtn}>
              Add Subject
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit" form="addSubjectForm" variant="primary">
            Submit
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddSubject;
