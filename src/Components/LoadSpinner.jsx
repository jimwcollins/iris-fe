import React from 'react';
import icons from '../images/iris-icons.svg';

const LoadSpinner = () => {
  return (
    <div className="loadSpinner__container">
      <svg className="loadSpinner">
        <use href={icons + '#icon-spinner9'}></use>
      </svg>
    </div>
  );
};

export default LoadSpinner;
