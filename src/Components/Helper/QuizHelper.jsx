import axios from "axios";

const public_url =
  "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/";
//get question count

/////
export const getQCount = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/questionCount.json`;

  return axios.get(createUrl);
};

export const incrementQCount = (categoryTitle) => {
  const url = `${public_url}/questions/${categoryTitle}/questionCount.json`;

  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      // user1 = response.data;
      return response.data.count;
      // console.log(user1);
    })
    .then((countt) => {
      axios.put(url, { count: countt + 1 }).then((response) => {
        console.log(response.data);
      });
    });
};
export const decrementQCount = (categoryTitle) => {
  const url = `${public_url}/questions/${categoryTitle}/questionCount.json`;

  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      // user1 = response.data;
      return response.data.count;
      // console.log(user1);
    })
    .then((countt) => {
      axios.put(url, { count: countt - 1 }).then((response) => {
        console.log(response.data);
      });
    });
};

//create category
export const createCategory = (categoryTitle, typer) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/questionList/0.json`;

  // creating the 1st obejct
  return axios.post(createUrl, { sample: "sample" }).then((Response) => {
    console.log(Response.data);
    //for creating question count
    const counturl = `${public_url}/questions/${categoryTitle}/questionCount.json`;
    axios.put(counturl, { count: 0 });
    //for creating question count
    const url = `${public_url}/questions/${categoryTitle}/type.json`;
    axios.put(url, { type: typer });
  });
};
//create category
export const deleteCategory = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}.json`;

  return axios.delete(createUrl);
};

//fecth Types
export const getAllTypes = () => {
  const createUrl = `${public_url}/questions.json`;

  return axios.get(createUrl);
};
//fecth categories
export const getAllCategories = () => {
  const createUrl = `${public_url}/questions.json`;

  return axios.get(createUrl).then((Response) => {
    Object.values(Response.data).forEach((each) => {
      console.log(each.type ? each.type : "no type");
    });
    return Object.keys(Response.data);
  });
};

///////////////////////////////////////////////////////////////

//create question
export const createQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/questionList/${questionId}.json`;

  return axios
    .post(createUrl, questionPacket)
    .then((Response) => console.log(Response.data));
};

// update question
export const updateQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/questionList/${questionId}.json`;
  //first we delete the question
  return deleteQuestion(categoryTitle, questionId).then(() => {
    console.log("dlete success");
    return createQuestion(categoryTitle, questionId, questionPacket);
  });
};

// delete question
export const deleteQuestion = (categoryTitle, questionId) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/questionList/${questionId}.json`;

  //update new count

  return axios.delete(createUrl);
};

//get all questions

export const getAllQuestionsPerCategory = (categoryTitle) => {
  console.log(categoryTitle);
  const createUrl = `${public_url}/questions/${categoryTitle}/questionList.json`;

  return axios.get(createUrl).then((Response) => {
    console.log(Object.values(Response.data));
    return Object.values(Response.data).filter(
      (QuestionList) => QuestionList !== null
    );
  });
};

///////////////////////////////////////////////////////////////
