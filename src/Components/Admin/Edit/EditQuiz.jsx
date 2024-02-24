import React, { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EditForm from "./EditForm";

const EditQuiz = ({ modal2, backdrop2, setModal, packet }) => {
  const setModalFunc = setModal;
  let airdrop = packet;
  const toggle = () => setModalFunc(!modal2);

  useEffect(() => {
    console.log(airdrop);
  });
  return (
    <div>
      <Modal isOpen={modal2} toggle={toggle} backdrop={backdrop2}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <EditForm packet={packet} />
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

export default EditQuiz;
