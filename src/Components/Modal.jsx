import React from 'react';
import { navigate } from '@reach/router';

const Modal = (props) => {
  let modalBgClass = 'modal__bg';
  modalBgClass += props.showModal ? ' modal__bg--show' : '';
  let modalBoxClass = 'modal__box';
  modalBoxClass += props.showModal ? ' modal__box--show' : '';

  const handleClick = () => {
    props.modalHandler(false, '');
    navigate(props.navTo);
  };

  return (
    <div className={modalBgClass}>
      <div className={modalBoxClass}>
        <h3 className="modal__title">{props.title}</h3>
        <button onClick={handleClick} className="btn">
          {props.message}
        </button>
      </div>
    </div>
  );
};

export default Modal;
