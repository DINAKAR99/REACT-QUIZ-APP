import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { createCategory } from "../../Helper/QuizHelper";
import myContext from "../../context/ContextCore";
import { Radio } from "@mui/material";
import toast from "react-hot-toast";

const AddCategory = ({ modal, backdrop, setModal, setToken }) => {
  const setModalFunc = setModal;
  const toggle = () => setModalFunc(!modal);

  // Define state to manage form input values
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  //just a count for useeffect to occur again
  const [count, setCount] = useState(0);

  //  a function that increments count
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    console.log("in useeffect");
  }, [count]);
  //  a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    toggle();
    // Perform any validation or data processing here
    console.log("Category submitted:", category);
    console.log("type submitted:", type);
    //push the new category to firebase db

    createCategory(category, type).then(() => {
      setToken((prev) => prev + 1);
      toast.success("Category Added successfully");

      //now trigger the rerender and change modal backdrop to false
      incrementCount();
    });

    // Reset the form input after submission if needed
    setCategory("");
  };

  //  a function to handle changes in the form inputs
  const handleInputChange = (event) => {
    setCategory(event.target.value); // Update the category state with the input value
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>Category</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Label className="visually-hidden" for="exCategory">
                Category
              </Label>
              <Input
                id="exCategory"
                name="category"
                placeholder="Enter Category "
                value={category}
                onChange={handleInputChange} // Call handleInputChange when the input value changes
              />

              <div>
                MCQ
                <Radio
                  name="type"
                  value="mcq"
                  checked={"mcq" === type}
                  onChange={(e) => setType(e.target.value)}
                ></Radio>
                CODING
                <Radio
                  name="type"
                  value="coding"
                  checked={"coding" == type}
                  onChange={(e) => setType(e.target.value)}
                ></Radio>
                <br />
                <br />
                <Button type="submit">Submit</Button>
              </div>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default AddCategory;
