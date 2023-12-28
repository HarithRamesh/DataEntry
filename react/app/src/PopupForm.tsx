import {Modal } from "react-bootstrap";
import Form from "./Form";
import React from "react";
interface props {
  show: boolean,
  closePopup: () => void
}

const PopupForm: React.FC<props> = ({ show,closePopup }) => {
  
  return (
    <Modal show={show} onHide={closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>Create Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal>
  );
}

export default PopupForm;
