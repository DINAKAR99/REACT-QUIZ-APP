import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container, Input } from "reactstrap";

const EditForm = ({ packet }) => {
  //------------
  const [questionPacket, setQuestionPacket] = useState({
    question: "sample",
    options: {
      A: "wdw",
      B: "dwd",
      C: "dw",
      D: "x",
    },
    category: { categoryId: "", categoryTitle: "" },
    correctAnswer: "",
  });

  const [categories, setCategories] = useState([
    { categoryTitle: "java", categoryId: 1 },
    { categoryTitle: "react", categoryId: 2 },
    ,
    { categoryTitle: "spring", categoryId: 3 },
  ]);
  //------------
  //edit function
  const handleEdit = (event) => {
    event.preventDefault();
    console.log(questionPacket);
    //pushing into firebase db
    //get question count
    updateQuestion(
      questionPacket.category.categoryTitle,
      length,
      questionPacket
    );
  };

  //   ------------------
  useEffect(() => {
    setQuestionPacket(packet);
    console.log(packet);
  }, []);
  //   ------------------

  //-----------------functions---------------------------------
  //field changed function
  const fieldChanged = (event) => {
    //console.log(event)
    setQuestionPacket({
      ...questionPacket,
      [event.target.name]: event.target.value,
    });
  };

  //option  change function
  const optionChanged = (event) => {
    setQuestionPacket({
      ...questionPacket,
      options: {
        ...questionPacket.options,
        [event.target.name]: event.target.value,
      },
    });
  };
  //correct answer change function
  const handleRadioChange = (event) => {
    setQuestionPacket({
      ...questionPacket,

      correctAnswer: event.target.value,
    });
  };

  //category  change function
  const categoryChanged = (event) => {
    const selectedCategory = JSON.parse(event.target.value);
    console.log(selectedCategory);
    setQuestionPacket({
      ...questionPacket,
      category: selectedCategory,
    });
  };
  //-----------------functions--------------------------------

  const createPost = () => {};
  return (
    <Container>
      <div>
        <div className="wrapper    justify-content-center align-items-center">
          {JSON.stringify(questionPacket)}
          <h3>CREATE QUESTION</h3>
          <form onSubmit={handleEdit}>
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
                value={questionPacket.question}
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
                value={questionPacket.category.categoryId}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option
                    value={JSON.stringify(category)}
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
                value={questionPacket.options.A}
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
                value={questionPacket.options.B}
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
                value={questionPacket.options.C}
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
                value={questionPacket.options.D}
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
                checked={
                  questionPacket.correctAnswer === questionPacket.options.A
                }
                value={questionPacket.options.A}
              ></Input>
              &nbsp;A &nbsp;
              <Input
                type="radio"
                name="answer"
                checked={
                  questionPacket.correctAnswer === questionPacket.options.B
                }
                value={questionPacket.options.B}
              ></Input>
              &nbsp;B &nbsp;
              <Input
                type="radio"
                name="answer"
                checked={
                  questionPacket.correctAnswer === questionPacket.options.C
                }
                value={questionPacket.options.C}
              ></Input>
              &nbsp;C &nbsp;
              <Input
                type="radio"
                name="answer"
                checked={
                  questionPacket.correctAnswer === questionPacket.options.D
                }
                value={questionPacket.options.D}
              ></Input>
              &nbsp;D &nbsp;
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded" color="dark">
                Create Question
              </Button>
              <Button type="reset" className="rounded ms-2  " color="danger">
                Reset Content
              </Button>
            </Container>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditForm;
