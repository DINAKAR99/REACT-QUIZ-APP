import React, { useState } from "react";
import { Button, Card, CardBody, Container, Input } from "reactstrap";

const AddQuiz = () => {
  const [user, setUser] = useState(undefined);
  const [categories, setCategories] = useState([
    { categoryTitle: "java" },
    { categoryTitle: "react" },
    ,
    { categoryTitle: "spring" },
  ]);

  ///
  const [questionData, setQuestionData] = useState({
    question: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    category: { categoryId: "" },
    correctAnswer: "",
  });
  ////
  //-----------------functions---------------------------------
  //field changed function
  const fieldChanged = (event) => {
    //console.log(event)
    setQuestionData({
      ...questionData,
      [event.target.name]: event.target.value,
    });
  };

  //option  change function
  const optionChanged = (event) => {
    setQuestionData({
      ...questionData,
      options: {
        ...questionData.options,
        [event.target.name]: event.target.value,
      },
    });
  };
  //correct answer change function
  const handleRadioChange = (event) => {
    setQuestionData({
      ...questionData,

      correctAnswer: event.target.value,
    });
  };

  //category  change function
  const categoryChanged = (event) => {
    //console.log(event)
    setQuestionData({
      ...questionData,
      category: { categoryId: event.target.value },
    });
  };
  //-----------------functions--------------------------------

  const createPost = () => {};
  return (
    <Container>
      <div>
        <div className="wrapper  d-flex justify-content-center align-items-center">
          <Card className="shadow-lg      mt-3 w-50 ">
            <CardBody>
              {JSON.stringify(questionData)}
              <h3>CREATE QUESTION</h3>
              <form onSubmit={createPost}>
                <div className="my-3">
                  <label htmlFor="content">
                    <b>Question</b>
                  </label>
                  <Input
                    type="textarea"
                    id="content"
                    placeholder="Enter Question"
                    className="rounded-0"
                    aria-rowcount={4}
                    name="question"
                    onChange={fieldChanged}
                  ></Input>
                </div>

                <div className="my-3">
                  <label htmlFor="content">
                    <b>Category</b>
                  </label>
                  <Input
                    type="select"
                    id="category"
                    placeholder="Enter here"
                    className="rounded-0"
                    name="categoryId"
                    onChange={categoryChanged}
                    defaultValue={0}
                  >
                    <option disabled value={0}>
                      --Select category--
                    </option>
                    {categories.map((category) => (
                      <option
                        value={category.categoryId}
                        key={category.categoryId}
                      >
                        {category.categoryTitle}
                      </option>
                    ))}
                  </Input>
                </div>

                <div id="option-group"></div>
                <div className="my-3">
                  <label htmlFor="content">
                    <b>Option A</b>
                  </label>
                  <Input
                    type="text"
                    id="content"
                    placeholder="Enter here"
                    value={questionData.options.A}
                    className="rounded-0"
                    style={{ height: "30px" }}
                    name="A"
                    onChange={optionChanged}
                  ></Input>
                </div>
                <div className="my-3">
                  <label htmlFor="content">
                    <b>Option B</b>
                  </label>
                  <Input
                    type="text"
                    id="content"
                    placeholder="Enter here"
                    className="rounded-0"
                    value={questionData.options.B}
                    style={{ height: "30px" }}
                    name="B"
                    onChange={optionChanged}
                  ></Input>
                </div>
                <div className="my-3">
                  <label htmlFor="content">
                    <b>Option C</b>
                  </label>
                  <Input
                    type="text"
                    id="content"
                    placeholder="Enter here"
                    className="rounded-0"
                    value={questionData.options.C}
                    style={{ height: "30px" }}
                    name="C"
                    onChange={optionChanged}
                  ></Input>
                </div>

                <div className="my-3">
                  <label htmlFor="content">
                    <b>Option D</b>
                  </label>
                  <Input
                    type="text"
                    id="content"
                    placeholder="Enter here"
                    value={questionData.options.D}
                    className="rounded-0"
                    style={{ height: "30px" }}
                    name="D"
                    onChange={optionChanged}
                  ></Input>
                </div>

                {/* ///radiobutton */}
                <div className="my-3" onChange={handleRadioChange}>
                  <h5>Answer</h5>
                  <Input
                    type="radio"
                    name="answer"
                    value={questionData.options.A}
                  ></Input>
                  &nbsp;A &nbsp;
                  <Input
                    type="radio"
                    name="answer"
                    value={questionData.options.B}
                  ></Input>
                  &nbsp;B &nbsp;
                  <Input
                    type="radio"
                    name="answer"
                    value={questionData.options.C}
                  ></Input>
                  &nbsp;C &nbsp;
                  <Input
                    type="radio"
                    name="answer"
                    value={questionData.options.D}
                  ></Input>
                  &nbsp;D &nbsp;
                </div>

                <Container className="text-center">
                  <Button type="submit" className="rounded" color="dark">
                    Create Question
                  </Button>
                  <Button
                    type="reset"
                    className="rounded ms-2  "
                    color="danger"
                  >
                    Reset Content
                  </Button>
                </Container>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddQuiz;
