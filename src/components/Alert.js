import React, { useState, useEffect } from "react";

function AlertComponent(props) {
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("block");
  };
  const closeModal = () => {
    toggleDisplay("none");
    props.hideError(null);
  };
  useEffect(() => {
    if (props.errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  });

  return (
    <div role="alert" id="alertPopUp" style={{ display: modalDisplay }}>
      <div>
        <span>{props.errorMessage}</span>
        <button type="button" aria-label="Close" onClick={() => closeModal()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default AlertComponent;
