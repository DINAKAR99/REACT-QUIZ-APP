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

const AddCategory = ({ modal, backdrop, setModal, setToken }) => {
  const setModalFunc = setModal;
  const toggle = () => setModalFunc(!modal);

  // Define state to manage form input values
  const [category, setCategory] = useState("");

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
    //push the new category to firebase db
    createCategory(category).then(() => {
      setToken((prev) => prev + 1);

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
              <Col>
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
              </Col>

              <Col>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default AddCategory;
