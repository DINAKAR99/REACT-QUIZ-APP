import axios from "axios";

const firebaseURL =
  "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/";
const public_url = "http://localhost:8080";
//get question count

export const userRegister = (user) => {
  console.log("in user register");
  const createUrl = `${public_url}/auth/register`;

  return axios.post(createUrl, user);
};
export const userLogin = (user) => {
  console.log("in user login");
  const createUrl = `${public_url}/auth/login`;

  return axios.post(createUrl, user);
};

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

//create category
export const createCategory = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/0.json`;

  //for creating question count
  const counturl = `${public_url}/questions/${categoryTitle}/questionCount.json`;
  axios.put(counturl, { count: 0 });

  // creating the 0 obejct
  return axios
    .post(createUrl, { sample: "sample" })
    .then((Response) => console.log(Response.data));
};
//create category
export const deleteCategory = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}.json`;

  return axios.delete(createUrl);
};

//fecth categories
export const getAllCategories = () => {
  const createUrl = `${public_url}/questions.json`;

  return axios.get(createUrl).then((Response) => {
    console.log(Object.keys(Response.data));
    return Object.keys(Response.data);
  });
};

export const getUserCompletedQuiz = (userid) => {
  console.log("user completed quiz fetcher");
  const createUrl = `${public_url}/questions.json`;

  return axios.get(createUrl).then((Response) => {
    console.log(Object.keys(Response.data));
    return Object.keys(Response.data);
  });
};

///////////////////////////////////////////////////////////////

//create question
export const createQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;

  return axios
    .post(createUrl, questionPacket)
    .then((Response) => console.log(Response.data));
};

// update question
export const updateQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;
  //first we delete the question
  deleteQuestion(categoryTitle, questionId);
  console.log("dlete success");
  return createQuestion(categoryTitle, questionId, questionPacket);
};

// delete question
export const deleteQuestion = (categoryTitle, questionId) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;

  return axios.delete(createUrl);
};

//get all questions

export const getAllQuestionsPerCategory = (categoryTitle) => {
  console.log(categoryTitle);
  const createUrl = `${public_url}/questions/${categoryTitle}.json`;

  return axios.get(createUrl).then((Response) => {
    // console.log(Object.values(Response.data));
    return Object.values(Response.data);
  });
};

///////////////////////////////////////////////////////////////
