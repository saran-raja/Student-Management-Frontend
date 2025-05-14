import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import UseApi from "../useApi";

const DeleteMarks = ({
  visibleModal,
  allMarks,
  closeModal,
  selectedItems,
  setSelectedItems,
  getStudentDetails,
  openNotification,
  setDeleteMarkParams,
}) => {
  const [deleteMarksParams, setDeleteMarksParams] = useState(0);
  const deleteMarksUrl = {
    url: `https://student-management-backend-api.onrender.com/form/deleteMarks/${deleteMarksParams}`,
    method: "delete",
  };
  const { stateData: deleteMarks, fetchData: setDeleteMarks } =
    UseApi(deleteMarksUrl);
  // useEffect(() => {
  //   console.log(deleteMarks);
  // }, [deleteMarks]);
  const semesters = {};
  if (allMarks.data && allMarks.data.length > 0) {
    allMarks.data.forEach((item) => {
      if (!semesters[item.semester]) {
        semesters[item.semester] = [];
        // console.log("//",semesters[item.semester]);
      }
      semesters[item.semester].push(item);
    });
  }

  const handleSelectedItems = (e, item) => {
    const isSelected = e.target.checked;
    setDeleteMarksParams(item.rollNumber);
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };
      if (isSelected) {
        console.log(item);

        updatedItems[item.id] = {
          semester: item.semester,
          coursecode: item.coursecode,
          mark: item.mark,
        };
      } else {
        delete updatedItems[item.id];
      }
      return updatedItems;
    });
  };
  const submitDeleteMarks = async (e) => {
    e.preventDefault();
    console.log("selectedItems", selectedItems);
    await setDeleteMarks(selectedItems);
  };

  const isItemSelected = (item) => !!selectedItems[item.id];
  useEffect(() => {
    if (!deleteMarks?.isLoading && deleteMarks?.data?.status === "success") {
      openNotification("success", "Success", deleteMarks?.data?.message);
      // getStudentDetails();
      setDeleteMarksParams(0);
      setDeleteMarkParams(0);
      closeModal();
    } else if (deleteMarks?.data?.status === "error") {
      openNotification("error", "Error", deleteMarks?.data?.message);
    }
  }, [deleteMarks]);
  return (
    <Modal
      show={visibleModal === 10}
      onHide={closeModal}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Marks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(semesters).map((semester) => (
            <div key={semester}>
              <div key={semester} className="position-relative">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Semester: {semester}</h5>
                  <h6 className="mt-0 mx-4 ">Select</h6>
                </div>
              </div>

              {semesters[semester].map((item) => (
                <Row className="mb-2 align-items-center" key={item.id}>
                  <Col xs={6}>
                    <Form.Group controlId={`formCourseCode-${item.id}`}>
                      <Form.Label>Course Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Course code"
                        value={item.coursecode}
                        readOnly
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group controlId={`formMarks-${item.id}`}>
                      <Form.Label>Marks</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Marks"
                        value={item.mark}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col
                    xs={2}
                    className="text-end"
                    style={{ paddingTop: "30px" }}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`checkbox-${item.id}`}
                      label=""
                      checked={isItemSelected(item)}
                      onChange={(e) => handleSelectedItems(e, item)}
                    />
                  </Col>
                </Row>
              ))}
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            submitDeleteMarks(e);
            setSelectedItems({});
          }}
        >
          Delete Selected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMarks;
