import React, { useState } from "react";
import { Button, Col, Collapse, Container, Row } from "reactstrap";
import Mod from "./modals/Mod";
import EditQuiz from "./Edit/EditQuiz";

const AllQuiz = () => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [senderPacket, setSenderPacket] = useState({});
  const [backdrop, setBackdrop] = useState(true);

  const categories = [
    { categorieName: "java", NoOfQuestions: "10" },
    { categorieName: "spring", NoOfQuestions: "30" },
    { categorieName: "react", NoOfQuestions: "40" },
  ];
  const sampleQuestions = {
    java: [
      {
        question: "What is a constructor in Java?",
        options: {
          A: "dwdw",
          B: "wdw",
          C: "s",
          D: "add",
        },
        category: { categoryId: 1 },
        correctAnswer: "wdw",
      },
      {
        question: "What is a constructor in Java?",
        options: {
          A: "dwdw",
          B: "wdw",
          C: "s",
          D: "add",
        },
        category: { categoryId: 2 },
        correctAnswer: "A method used to create objects",
      },
      {
        question: "What is a constructor in Java?",
        options: {
          A: "dwdw",
          B: "wdw",
          C: "s",
          D: "add",
        },
        category: { categoryId: 2 },
        correctAnswer: "A method used to create objects",
      },
    ],
    // spring: [
    //   {
    //     question: "What is Spring Framework?",
    //     options: [
    //       "An open-source Java platform",
    //       "A database management system",
    //       "A version control system",
    //       "An operating system",
    //     ],
    //     correctAnswer: "An open-source Java platform",
    //   },
    //   {
    //     question: "What is Dependency Injection in Spring?",
    //     options: [
    //       "A design pattern",
    //       "A software testing technique",
    //       "A form of data storage",
    //       "A database query language",
    //     ],
    //     correctAnswer: "A design pattern",
    //   },
    //   {
    //     question: "What is a Bean in Spring?",
    //     options: [
    //       "A Java class",
    //       "A type of vegetable",
    //       "An instance of a class managed by Spring",
    //       "A type of coffee",
    //     ],
    //     correctAnswer: "An instance of a class managed by Spring",
    //   },
    // ],
    // react: [
    //   {
    //     question: "What is JSX?",
    //     options: [
    //       "A JavaScript extension",
    //       "A CSS preprocessor",
    //       "A markup syntax",
    //       "A programming language",
    //     ],
    //     correctAnswer: "A markup syntax",
    //   },
    //   {
    //     question: "What is the virtual DOM in React?",
    //     options: [
    //       "A representation of the actual DOM in memory",
    //       "A type of JavaScript function",
    //       "A way to style components",
    //       "A server-side rendering technique",
    //     ],
    //     correctAnswer: "A representation of the actual DOM in memory",
    //   },
    //   {
    //     question: "What is a React component?",
    //     options: [
    //       "A JavaScript function or class that returns a React element",
    //       "A HTML element",
    //       "A CSS class",
    //       "A type of DOM node",
    //     ],
    //     correctAnswer:
    //       "A JavaScript function or class that returns a React element",
    //   },
    // ],
  };

  // ------------------------
  //clicked component state management
  const [quizCategory, setQuizCategory] = useState("java");
  const [toggleOptions, setToggleOptions] = useState({
    category: "",
    index: "",
  });

  //function to toggle modal
  const toggle = () => setModal(!modal);
  const edittoggle = (datapacket) => {
    setModal2(!modal2);
    setSenderPacket(datapacket);
    console.log(senderPacket);
  };

  // Function to handle button clicks in the sidebar
  const handleShowQuestions = (category_name) => {
    setQuizCategory(category_name);
  };

  // Function to toggle collapse state
  const toggleCollapse = (category, index) => {
    if (toggleOptions.category === category && toggleOptions.index === index) {
      // Collapse if already open
      setToggleOptions({ category: "", index: "" });
    } else {
      // Expand if closed or different question is clicked
      setToggleOptions({ ...toggleOptions, category: category, index });
      console.log(toggleOptions);
    }
  };
  // ------------------------

  return (
    <Container className="mt-3 ">
      <Mod modal2={modal} backdrop2={backdrop} setModal={setModal} />
      <EditQuiz
        modal2={modal2}
        backdrop2={backdrop}
        setModal={setModal2}
        packet={senderPacket}
      />
      <Row>
        <Col md={6}>
          {categories.map((each, index) => {
            return (
              <div className="border border-dark rounded p-3 mb-2  ">
                <h5>
                  {index + 1}.{each.categorieName}
                </h5>
                <h6>No Of Questions: {each.NoOfQuestions}</h6>

                <Button
                  size="sm"
                  onClick={() => handleShowQuestions(each.categorieName)}
                  className="me-2 bg-black "
                >
                  Show Questions
                </Button>
                <Button size="sm" className="me-2 bg-success " onClick={toggle}>
                  Add Question
                </Button>
              </div>
            );
          })}
        </Col>

        <Col md={6}>
          <div
            className="border border-dark rounded p-3 mb-2     p-3 mb-2 overflow-y-scroll    "
            style={{ maxHeight: "405px" }}
          >
            {quizCategory && (
              <div>
                <h3> Questions for {quizCategory}</h3>

                <ol type={1}>
                  {sampleQuestions[quizCategory].map(
                    (QuestionPacket, index) => (
                      <div key={index}>
                        <li key={index}>{QuestionPacket.question}</li>
                        <Button
                          className="me-2 bg-black "
                          onClick={() => toggleCollapse(quizCategory, index)}
                          size="sm"
                        >
                          options
                        </Button>
                        <Button
                          className="me-2 bg-grey "
                          size="sm"
                          onClick={() => edittoggle(QuestionPacket)}
                        >
                          Edit
                        </Button>
                        <Button className="me-2 bg-danger   " size="sm">
                          Delete
                        </Button>

                        <Collapse
                          isOpen={
                            toggleOptions.category == quizCategory &&
                            toggleOptions.index == index
                          }
                        >
                          <ol type="A">
                            {Object.keys(QuestionPacket.options).map(
                              (optionKey, indexx) => {
                                return (
                                  <li key={indexx}>
                                    <input
                                      type="radio"
                                      value={QuestionPacket.options[optionKey]}
                                      checked={
                                        QuestionPacket.correctAnswer ===
                                        QuestionPacket.options[optionKey]
                                      }
                                      readOnly
                                    />

                                    {QuestionPacket.options[optionKey]}
                                  </li>
                                );
                              }
                            )}
                          </ol>
                        </Collapse>
                      </div>
                    )
                  )}
                </ol>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllQuiz;
