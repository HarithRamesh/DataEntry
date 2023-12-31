import React from "react";
import { Modal } from "react-bootstrap";
import Form from "./Form";
import { playerData } from "../interfaces/PlayerInterface";
interface props {
  show: boolean;
  closePopup: () => void;
  data: playerData;
  title: string;
}

const PopupForm: React.FC<props> = ({ show, closePopup, data, title }) => {
  return (
    <Modal show={show} onHide={closePopup}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form values={data} />
      </Modal.Body>
    </Modal>
  );
};

export default PopupForm;
