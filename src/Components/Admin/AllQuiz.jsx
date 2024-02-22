import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";

const AllQuiz = () => {
  const categories = [
    { categorieName: "java", NoOfQuestions: "10" },
    { categorieName: "spring", NoOfQuestions: "30" },
    { categorieName: "react", NoOfQuestions: "40" },
  ];
  const sampleQuestions = {
    java: [
      "Question 1",
      "Question 2",

      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
      "Question 3",
    ],
    spring: ["Question A", "Question B", "Question C"],
    react: ["Question X", "Question Y", "Question Z"],
  };
  // ------------------------
  //clicked component state management
  const [quizCategory, setQuizCategory] = useState("java");
  // Function to handle button clicks in the sidebar
  const handleShowQuestions = (category_name) => {
    setQuizCategory(category_name);
  };
  // ------------------------

  return (
    <Container className=" mt-3">
      <Row>
        <Col md={6}>
          {categories.map((each, index) => {
            return (
              <div className="border border-dark rounded p-3 mb-2  ">
                <h5>
                  {index + 1}.{each.categorieName}
                </h5>
                <h6>No Of Questions: {each.NoOfQuestions}</h6>

                <Button onClick={() => handleShowQuestions(each.categorieName)}>
                  Show Questions
                </Button>
              </div>
            );
          })}
        </Col>

        <Col md={6}>
          <div
            className="border border-dark rounded p-3 mb-2     p-3 mb-2 overflow-y-scroll    "
            style={{ height: "405px" }}
          >
            {quizCategory && (
              <div>
                <h3> Questions for {quizCategory}</h3>
                <ul>
                  {sampleQuestions[quizCategory].map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllQuiz;
