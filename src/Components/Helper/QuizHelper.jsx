import axios from "axios";

const public_url =
  "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/";
//get question count

export const getQuestionCount = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}.json`;

  return axios.get(createUrl);
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
//////

//create question
export const createQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;

  axios
    .post(createUrl, questionPacket)
    .then((Response) => console.log(Response.data));
};

// update question
export const updateQuestion = (categoryTitle, questionId, questionPacket) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;

  axios
    .put(createUrl, questionPacket)
    .then((Response) => console.log(Response.data));
};

// delete question
export const deleteQuestion = (categoryTitle, questionId) => {
  const createUrl = `${public_url}/questions/${categoryTitle}/${questionId}.json`;

  axios.delete(createUrl).then((Response) => console.log(Response.data));
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
