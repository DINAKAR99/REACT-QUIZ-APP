import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  createQuestion,
  getAllCategories,
  getQCount,
  incrementQCount,
} from "../../Helper/QuizHelper";
import toast from "react-hot-toast";

const CodingQuestion = ({ toggle, check, categorypacket }) => {
  const [question, setQuestion] = useState("Enter the Question");
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  // Configuration for CKEditor
  const editorConfig = {
    autoGrow_minHeight: 5 * 25, // 5 rows with default line height of 25px
  };
  const submitHandler = () => {
    console.log(question.replace(/<\/?p>/g, ""));
    console.log(currentCategory);
    toggle();
  };

  const handleSubmit = () => {
    event.preventDefault();

    //get question count
    getQCount(currentCategory)
      .then((Response) => {
        console.log(Response.data.count);

        return Response.data.count;
      })
      .then((questionCount) => {
        //pushing into firebase db
        const ques = question.replace(/<\/?p>/g, "");
        toast.promise(
          createQuestion(currentCategory, questionCount + 1, {
            category: {
              categoryId: 1,
              categoryTitle: currentCategory,
            },
            question: ques,
            questionId: questionCount + 1,
          }),
          {
            loading: "Creating...",
            success: <b>Question Created!</b>,
            error: <b>Could not create question</b>,
          }
        );
        ///after pushing question we increment the question count
        incrementQCount(currentCategory);
      })
      .then(() => {
        toggle();
      });
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setQuestion(data);
    console.log(data); // Log the editor content
  };

  useEffect(() => {
    getAllCategories().then((res) => {
      console.log(res);
      setFetchedCategory((e) => res);
    });
  }, []);
  return (
    <div>
      <div>
        <Button color="danger" onClick={toggle}>
          Click Me
        </Button>
        <Modal isOpen={check} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <CKEditor
              editor={ClassicEditor}
              data={question}
              config={editorConfig}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={handleEditorChange}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
            <select
              name="quizcategory"
              className="form-select mb-4"
              onChange={(e) => {
                setCurrentCategory(e.target.value);
              }}
            >
              <option value="" selected disabled>
                --select--
              </option>
              {fetchedCategory?.map((each) => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default CodingQuestion;
