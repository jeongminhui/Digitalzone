import React from "react";
import "./Modal.css";

const Modal = () => {
  const modal = document.querySelector(".modal");
  const btnOpenPopup = document.querySelector(".btn-open-popup");

  // btnOpenPopup.addEventListener("click", () => {
  //   modal.style.display = "block";
  // });

  return (
    <div>
      <div class="modal">
        <div class="modal_body">Modal</div>
      </div>
      <button
        class="btn-open-popup"
        onClick={() => {
          modal.style.display = "block";
        }}
      >
        Modal 띄우기
      </button>
    </div>
  );
};

export default Modal;
