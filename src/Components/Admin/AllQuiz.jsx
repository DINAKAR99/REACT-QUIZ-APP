import React, { createContext, useContext, useEffect, useState } from "react";
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

const AllQuiz = ({ token }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  //usecontext
  // const { token } = useContext(myContext);

  const [senderPacket, setSenderPacket] = useState({});
  const [backdrop, setBackdrop] = useState(true);
  const [retrievedQuestions, setRetrievedQuestions] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const [isButtonActive, setIsButtonActive] = useState(false);
  let buttonClassName = `button ${isButtonActive ? "delete" : ""}`;

  // ------------------------
  //clicked component state management
  const [quizCategory, setQuizCategory] = useState("java");
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [toggleOptions, setToggleOptions] = useState({
    category: "",
    index: "",
  });
  const questionsLoader = () => {
    // Create an array to store all promises
    const promises = [];

    console.log("in question loader");
    for (let index = 0; index < fetchedCategory.length; index++) {
      const catName = fetchedCategory[index];
      // console.log(catName);

      // Push each promise into the promises array
      promises.push(getAllQuestionsPerCategory(catName));
    }

    Promise.all(promises)
      .then((results) => {
        // console.log(results);
        const updatedQuestions = {};

        // Iterate over results and update state accordingly
        results.forEach((qArray, index) => {
          const catName = fetchedCategory[index];
          // console.log(qArray);
          updatedQuestions[catName] = Object.values(qArray.slice(1, -1));
        });
        setRetrievedQuestions(updatedQuestions);

        return updatedQuestions;
        // Update the state once with all the retrieved questions
      })
      .then(() => {
        console.log(retrievedQuestions);
      })

      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  };
  //useeffect
  useEffect(() => {
    console.log("use effect of All quiz ");
    getAllCategories()
      .then((categoryArray) => {
        setFetchedCategory(categoryArray);
        // questionsLoader(categoryArray);
        // console.log(categoryArray);
        return categoryArray;
      })
      .then(() => {
        console.log(fetchedCategory);
        console.log("in second ");
        // questionsLoader();
      });
  }, [refreshToken, token]);

  useEffect(() => {
    if (fetchedCategory && fetchedCategory.length > 0) {
      // console.log(fetchedCategory);
      questionsLoader();
    }
  }, [fetchedCategory]);

  //function to toggle modal
  const toggle = () => {
    setModal(!modal);

    console.log(retrievedQuestions);
  };

  const deleteCategory = () => {};

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
  const deleteHandler = (category, questionId, event) => {
    console.log(event.target);
    // deleteQuestion(category, questionId).then(() => {
    //   toast.success("Question deleted!");
    //   setRefreshToken((prev) => prev + 1);
    sampleFunction(event);
    // });
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

  const sampleFunction = (event) => {
    // Toggle the state variable to change the class
    console.log(event.target);
    // Get the target button element
    const button1 = event.target;

    // Toggle the class name for the clicked button
    button1.classList.add("delete");

    // setIsButtonActive(!isButtonActive);

    setTimeout(() => {
      button1.classList.remove("delete");
    }, 3200);
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
                    {retrievedQuestions && (
                      <>{retrievedQuestions[each]?.length}</>
                    )}
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
                  <Button
                    size="sm"
                    className="me-2 bg-danger  "
                    onClick={toggle}
                  >
                    Delete
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

                          {
                            <>
                              {" "}
                              <button
                                class={buttonClassName}
                                // onClick={() => sampleFunction()}
                                onClick={() =>
                                  deleteHandler(
                                    quizCategory,
                                    Object.values(QuestionPacket)[0].questionId,
                                    event
                                  )
                                }
                              >
                                <div class="trash">
                                  <div class="top">
                                    <div class="paper"></div>
                                  </div>
                                  <div class="box"></div>
                                  <div class="check">
                                    <svg viewBox="0 0 8 6">
                                      <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                                    </svg>
                                  </div>
                                </div>
                              </button>
                            </>
                          }

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
