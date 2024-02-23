import axios from "axios";

const public_url =
  "https://react-quiz-app-001-default-rtdb.asia-southeast1.firebasedatabase.app/";
//get question count
export const getQuestionCount = (categoryTitle) => {
  const createUrl = `${public_url}/questions/${categoryTitle}.json`;

  return axios.get(createUrl);
};
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
