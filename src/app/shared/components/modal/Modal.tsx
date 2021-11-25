import React from 'react';

interface modalProps {
  children: JSX.Element;
  setShow: Function;
  className: string
}
const Modal = (props: modalProps) => {
  const closeModal = () => {
    props.setShow(false);
  };
  return (
    <>
      <div className="modal-shadow" onClick={closeModal} />
      <div className={`modal ${props.className}`}>
        <button className={`btn btn-danger close-btn`} onClick={closeModal}>
          &#10006;
        </button>
        <div className="modal-content">{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
