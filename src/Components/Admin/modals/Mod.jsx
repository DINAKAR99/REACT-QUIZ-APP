import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddQuiz from "../AddQuiz";

const Mod = ({ modal2, backdrop2, setModal }) => {
  const setModalFunc = setModal;
  const toggle = () => setModalFunc(!modal2);
  return (
    <div>
      <Modal isOpen={modal2} toggle={toggle} backdrop={backdrop2}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <AddQuiz />
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Mod;
