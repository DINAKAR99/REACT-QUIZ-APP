import React, { createContext, useEffect, useState } from "react";
import { Button, Col, Collapse, Container, Row } from "reactstrap";
import Mod from "./modals/Mod";
import EditQuiz from "./Edit/EditQuiz";
import {
  deleteQuestion,
  getAllCategories,
  getAllQuestionsPerCategory,
} from "../Helper/QuizHelper";
import myContext from "../context/ContextCore";
import toast from "react-hot-toast";

const AllQuiz = () => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [senderPacket, setSenderPacket] = useState({});
  const [backdrop, setBackdrop] = useState(true);
  const [retrievedQuestions, setRetrievedQuestions] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const categories = [
    { categorieName: "java", NoOfQuestions: "10" },
    { categorieName: "spring", NoOfQuestions: "30" },
    { categorieName: "react", NoOfQuestions: "40" },
  ];

  // java: [
  //   {
  //     question: "What is a constructor in Java?",
  //     options: {
  //       A: "dwdw",
  //       B: "wdw",
  //       C: "s",
  //       D: "add",
  //     },
  //     category: { categoryId: 1 },
  //     correctAnswer: "wdw",
  //   },
  //   {
  //     question: "What is a constructor in Java?",
  //     options: {
  //       A: "dwdw",
  //       B: "wdw",
  //       C: "s",
  //       D: "add",
  //     },
  //     category: { categoryId: 2 },
  //     correctAnswer: "A method used to create objects",
  //   },
  //   {
  //     question: "What is a constructor in Java?",
  //     options: {
  //       A: "dwdw",
  //       B: "wdw",
  //       C: "s",
  //       D: "add",
  //     },
  //     category: { categoryId: 2 },
  //     correctAnswer: "A method used to create objects",
  //   },
  // ]

  //using create context

  // ------------------------
  //clicked component state management
  const [quizCategory, setQuizCategory] = useState("java");
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [toggleOptions, setToggleOptions] = useState({
    category: "",
    index: "",
  });
  const questionsLoader = () => {
    console.log("in question loader");
    for (let index = 0; index < fetchedCategory.length; index++) {
      const catName = fetchedCategory[index];

      console.log(catName);
      // console.log(catName);
      getAllQuestionsPerCategory(catName).then((qArray) => {
        console.log(qArray);
        setRetrievedQuestions((prevState) => ({
          ...prevState,
          [catName]: Object.values(qArray.slice(1, -1)),
        }));
        //
      });
    }
  };
  //useeffect
  useEffect(() => {
    getAllCategories()
      .then((categoryArray) => {
        setFetchedCategory(categoryArray);
        console.log(categoryArray);
        return categoryArray;
      })
      .then((categoryArray) => {
        console.log(fetchedCategory);
        console.log("in second ");
        questionsLoader();
      });
  }, [refreshToken]);

  useEffect(() => {
    if (fetchedCategory) {
      console.log(fetchedCategory);
      questionsLoader();
    }
  }, [fetchedCategory]);

  //function to toggle modal
  const toggle = () => {
    setModal(!modal);

    console.log(retrievedQuestions);
  };

  //edit toggle
  const edittoggle = (datapacket) => {
    setModal2(!modal2);
    setSenderPacket(datapacket);
    console.log(senderPacket);
  };

  // Function to handle button clicks in the sidebar
  const handleShowQuestions = (category_name) => {
    setQuizCategory(category_name);
  };

  //delete function
  const deleteHandler = (category, questionId) => {
    deleteQuestion(category, questionId).then(() => {
      toast.success("Question deleted!");
      setRefreshToken((prev) => prev + 1);
    });
  };

  // Function to toggle collapse options
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
      <myContext.Provider value={{ refreshToken, setRefreshToken }}>
        <Mod modal2={modal} backdrop={backdrop} setModal={setModal} />
        <EditQuiz
          modal2={modal2}
          backdrop2={backdrop}
          setModal={setModal2}
          packet={senderPacket}
        />
      </myContext.Provider>

      <Row>
        <Col md={6}>
          {fetchedCategory &&
            fetchedCategory.map((each, index) => {
              return (
                <div className="border border-dark rounded p-3 mb-2  ">
                  <h5>
                    {index + 1}.{each}
                  </h5>
                  <h6>
                    No Of Questions:{" "}
                    {/* {retrievedQuestions && retrievedQuestions[each].length} */}
                  </h6>

                  <Button
                    size="sm"
                    onClick={() => handleShowQuestions(each)}
                    className="me-2 bg-black "
                  >
                    Show Questions
                  </Button>
                  <Button
                    size="sm"
                    className="me-2 bg-success "
                    onClick={toggle}
                  >
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
                {retrievedQuestions && (
                  <ol type={1}>
                    {retrievedQuestions[quizCategory].map(
                      (QuestionPacket, index) => (
                        <div key={index}>
                          <li key={index}>
                            {Object.values(QuestionPacket)[0].question}
                          </li>
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
                            onClick={() =>
                              edittoggle(Object.values(QuestionPacket)[0])
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            className="me-2 bg-danger"
                            size="sm"
                            onClick={() =>
                              deleteHandler(
                                quizCategory,
                                Object.values(QuestionPacket)[0].questionId
                              )
                            }
                          >
                            Delete
                          </Button>

                          <Collapse
                            isOpen={
                              toggleOptions.category == quizCategory &&
                              toggleOptions.index == index
                            }
                          >
                            <ol type="A">
                              {Object.values(QuestionPacket)[0].options &&
                                Object.keys(
                                  Object.values(QuestionPacket)[0].options
                                ).map((optionKey, indexx) => {
                                  return (
                                    <li key={indexx}>
                                      <input
                                        type="radio"
                                        value={
                                          Object.values(QuestionPacket)[0]
                                            .options[optionKey]
                                        }
                                        checked={
                                          Object.values(QuestionPacket)[0]
                                            .correctAnswer ===
                                          Object.values(QuestionPacket)[0]
                                            .options[optionKey]
                                        }
                                        readOnly
                                      />

                                      {
                                        Object.values(QuestionPacket)[0]
                                          .options[optionKey]
                                      }
                                    </li>
                                  );
                                })}
                            </ol>
                          </Collapse>
                        </div>
                      )
                    )}
                  </ol>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllQuiz;
