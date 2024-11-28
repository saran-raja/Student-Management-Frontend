import React, { useEffect, useState } from "react";
import "../result.css";
import { useLocation } from "react-router";

const Result = () => {
  const [cgpa, setCgpa] = useState(0);
  const location = useLocation();
  const { resultData } = location.state || {};

  useEffect(() => {
    if (resultData?.results) {
      let totalMarks = 0;
      resultData?.results.forEach((result) => {
        totalMarks += +result?.mark;
      });
      const calculatedCgpa = totalMarks / resultData?.results?.length;
      setCgpa(calculatedCgpa.toFixed(2));
    }
  }, [resultData]);

  if (!resultData) {
    return <div>No result data available.</div>;
  }

  return (
    <div className="result-page">
      <header className="header">
        <h1>Student Result</h1>
      </header>

      <section className="student-details">
        <div className="details">
          <p>
            <strong>Name :</strong> {resultData?.student?.firstName}{" "}
            {resultData?.student?.lastName}
          </p>
          <p>
            <strong>Register Number :</strong> {resultData?.rollNumber}
          </p>
          <p>
            <strong>Degree & Branch :</strong> {resultData?.student?.degree} &{" "}
            {resultData?.student?.department}
          </p>
        </div>
      </section>

      <table className="results-table">
        <thead>
          <tr>
            <th>Semester</th>
            {/* <th>Subject</th> */}
            <th>CourseCode</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {resultData?.results&&resultData?.results.map((result, index) => (
            <tr key={index}>
              <td>{result?.semester}</td>
              {/* <td>{result?.subject}</td> */}
              <td>{result?.coursecode}</td>
               <td>{result?.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="footer">
        <p>
          <strong>Grade Points Average (GPA):</strong> {cgpa}
        </p>
      </section>
    </div>
  );
};

export default Result;
