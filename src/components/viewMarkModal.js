import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const ViewMarkModal = ({ closeModal, visibleModal, viewMarks }) => {
  return (
    <div>
      {" "}
      <Modal show={visibleModal === 11} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View Marks </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Semester</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {viewMarks?.data?.length > 0 ? (
                viewMarks.data
                  .slice()
                  .sort((a, b) => a.semester - b.semester)
                  .map((mark, index) => (
                    <tr key={index}>
                      <td>{mark.coursecode}</td>
                      <td>{mark.semester}</td>
                      <td>{mark.mark}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewMarkModal;
