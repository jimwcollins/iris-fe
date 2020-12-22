import React from 'react';
import { navigate } from '@reach/router';

const Modal = (props) => {
  let modalClass = 'modal';
  modalClass += props.showModal ? ' modal--show' : '';

  const handleClick = () => {
    props.modalHandler(false, '');
    navigate(props.navTo);
  };

  return (
    <div className={modalClass}>
      <h3 className="modal__title">{props.title}</h3>
      <button onClick={handleClick} className="modal__btn">
        {props.message}
      </button>
    </div>
  );
};

export default Modal;
