import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Container, Input } from "reactstrap";
import {
  createQuestion,
  getQCount,
  incrementQCount,
} from "../Helper/QuizHelper";
import myContext from "../context/ContextCore";

const AddQuiz = ({ toggle, categoryPacket, section }) => {
  // using context

  const { setRefreshToken } = useContext(myContext);

  const [categories, setCategories] = useState([
    { categoryTitle: "java", categoryId: 2 },
    { categoryTitle: "react", categoryId: 4 },
    ,
    { categoryTitle: "spring", categoryId: 5 },
  ]);

  useEffect(() => {
    console.log(categoryPacket);
    let catArray = [];
    let temp = {};
    categoryPacket?.forEach((category) => {
      temp = { categoryTitle: category, categoryId: 1 };
      catArray.push(temp);
    });
    setCategories(catArray);

    console.log(catArray);
    // setCategories(categoryPacket);
  });

  const [questionData, setQuestionData] = useState({
    questionId: "",
    question: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    category: { categoryId: "", categoryTitle: "" },
    correctAnswer: "",
  });
  ////
  //-----------------functions---------------------------------

  //submmit function
  const handleSubmit = (event) => {
    event.preventDefault();

    //get question count
    getQCount(questionData.category.categoryTitle)
      .then((Response) => {
        console.log(Response.data.count);

        return Response.data.count;
      })
      .then((questionCount) => {
        //pushing into firebase db
        toast.promise(
          createQuestion(questionData.category.categoryTitle, questionCount, {
            ...questionData,
            questionId: questionCount,
          }),
          {
            loading: "Creating...",
            success: <b>Question Created!</b>,
            error: <b>Could not create question</b>,
          }
        );
        ///after pushing question we increment the question count
        incrementQCount(questionData.category.categoryTitle);
      })
      .then(() => {
        setRefreshToken((prev) => prev + 1);

        toggle();
      });
  };

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
    const selectedCategory = JSON.parse(event.target.value);
    console.log(selectedCategory);
    setQuestionData({
      ...questionData,
      category: selectedCategory,
    });
  };
  //-----------------functions--------------------------------

  const createPost = () => {};
  return (
    <Container>
      <div>
        <div className="wrapper    justify-content-center align-items-center">
          {JSON.stringify(questionData)}
          <h3>CREATE QUESTION</h3>
          <form onSubmit={handleSubmit}>
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

export default AddQuiz;
