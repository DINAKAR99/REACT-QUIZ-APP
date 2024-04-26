import React, { createContext, useContext, useEffect, useState } from "react";

import styles from "react-awesome-button/src/styles/themes/theme-blue";

import { Button, Col, Collapse, Container, Row } from "reactstrap";
import Mod from "./modals/Mod";
import EditQuiz from "./Edit/EditQuiz";
import {
  decrementQCount,
  deleteCategory,
  deleteQuestion,
  getAllCategories,
  getAllQuestionsPerCategory,
} from "../Helper/QuizHelper";
import myContext from "../context/ContextCore";
import toast from "react-hot-toast";
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";

const AllQuiz = ({ token }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [sectionCategory, setSectionCategory] = useState("");

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
        console.log(results);

        // Iterate over results and update state accordingly
        results.forEach((qArray, index) => {
          const catName = fetchedCategory[index];
          console.log(qArray ? qArray : "dwdw");
          console.log("wdwd");
          updatedQuestions[catName] = Object.values(qArray.slice(1));
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
  const toggle = (categoryTitle) => {
    setModal(!modal);
    setSectionCategory((prev) => categoryTitle);
    console.log(retrievedQuestions);
  };

  const deleteCategoryy = (categoryTitle) => {
    deleteCategory(categoryTitle).then(() => {
      setRefreshToken((prev) => prev + 1);
      toast.success("Category deleted!");
      setTimeout(() => {
        window.location.reload();
      }, 400);
    });
  };

  //edit toggle
  const edittoggle = (datapacket) => {
    setModal2(!modal2);
    setSenderPacket(datapacket);
    console.log(senderPacket);
  };

  // Function to handle button clicks in the sidebar
  const handleShowQuestions = (category_name) => {
    console.log(retrievedQuestions);
    setQuizCategory(category_name);
  };

  //delete function
  const deleteHandler = (category, questionId, event) => {
    console.log(event.target);
    deleteQuestion(category, questionId).then(() => {
      decrementQCount(category);
      toast.success("Question deleted!");
      setTimeout(() => {
        window.location.reload();
      }, 400);
      setRefreshToken((prev) => prev + 1);
      // sampleFunction(event);
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

  const sampleFunction = (event) => {
    // Toggle the state variable to change the className
    console.log(event.target);
    // Get the target button element
    const button1 = event.target;

    // Toggle the className name for the clicked button
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
        <Mod
          modal2={modal}
          backdrop={backdrop}
          setModal={setModal}
          categoriesPacket={fetchedCategory}
          section={sectionCategory}
        />
        <EditQuiz
          modal2={modal2}
          backdrop2={backdrop}
          setModal={setModal2}
          packet={senderPacket}
        />
      </myContext.Provider>

      <Row>
        <Col md={6}>
          <div>
            <h3>
              <b>&nbsp; TECHNOLOGIES</b>
            </h3>
          </div>
          {fetchedCategory &&
            fetchedCategory.map((each, index) => {
              return (
                <>
                  <div className=" fader border border-grey        rounded p-3 mb-2 shadow-lg  bg-white   ">
                    <h5>
                      {index + 1}.{each}
                    </h5>
                    <h6>
                      No Of Questions:
                      {retrievedQuestions && (
                        <>{retrievedQuestions[each]?.length}</>
                      )}
                    </h6>

                    <AwesomeButton
                      onPress={() => handleShowQuestions(each)}
                      className="me-2 "
                      type="primary"
                    >
                      Show Questions
                    </AwesomeButton>

                    {/* <AwesomeButton
                      onPress={() => handleShowQuestions(each)}
                      className="me-2 "
                      type="primary"
                    >
                      Show Questions
                    </AwesomeButton> */}

                    <AwesomeButton
                      type="github"
                      className="me-2   "
                      onPress={() => toggle(each)}
                    >
                      Add Question
                    </AwesomeButton>
                    <AwesomeButton
                      type="danger"
                      className="me-2   "
                      onPress={() => deleteCategoryy(each)}
                    >
                      Delete
                    </AwesomeButton>
                  </div>
                </>
              );
            })}
        </Col>

        <Col md={6}>
          <h3>
            <b>&nbsp; QUESTIONS</b>
          </h3>
          <div
            className=" faderborder border-grey  shadow-lg bg-white  rounded p-3 mb-2       p-3 mb-2 overflow-y-scroll    "
            style={{ maxHeight: "405px" }}
          >
            {quizCategory && (
              <div>
                <h3 className="text-center  ">
                  <b> {quizCategory} </b>
                </h3>
                {retrievedQuestions && (
                  <ol type={1}>
                    {retrievedQuestions[quizCategory].map(
                      (QuestionPacket, index) => (
                        <div key={index} className="mt-3">
                          <li key={index} className="mb-2">
                            {Object.values(QuestionPacket)[0].question}
                          </li>
                          <div className="mb-3">
                            <AwesomeButton
                              className="me-2"
                              type="facebook"
                              onPress={() =>
                                toggleCollapse(quizCategory, index)
                              }
                              size="sm"
                            >
                              options
                            </AwesomeButton>
                            <AwesomeButton
                              className="me-2"
                              type="github"
                              onPress={() =>
                                edittoggle(Object.values(QuestionPacket)[0])
                              }
                            >
                              Edit
                            </AwesomeButton>
                            <AwesomeButton
                              className="me-2  "
                              size="sm"
                              type="danger"
                              onPress={() =>
                                deleteHandler(
                                  quizCategory,
                                  Object.values(QuestionPacket)[0].questionId,
                                  event
                                )
                              }
                            >
                              Delete
                            </AwesomeButton>
                          </div>

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

                            <hr />
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
