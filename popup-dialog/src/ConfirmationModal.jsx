import React, { useEffect, useRef } from "react";
import "./styles.css";

function ConfirmationModal({ onClose, children, showDialog }) {
  /** To add a hideAnimation for closing dialog we need
   * to add the class hideDialog conditionally
   */
  const contentRef = useRef();
  const backdropRef = useRef();

  const handleClose = () => {
    // onClose()

    // only after the animation ends we can call the onClose
    // else it will not show
    contentRef.current.classList.add("hide-dialog");
    backdropRef.current.classList.add("hide-dialog");

    contentRef.current.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  };

  const handleAnimationEnd = () => {
    onClose();
  };

  /** Close on click of ESC */
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    /** remove on unmount */
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyUp = (e) => {
    console.log(e.key);
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    showDialog && (
      <div className="modal-box-container">
        <div
          ref={backdropRef}
          className="modal-backdrop"
          onClick={handleClose}
        />
        {/**✔ Screen readers now understand:
              This is a dialog
              What its title is
              What it describes */}
        <div
          ref={contentRef}
          className="modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/** Accessibility (we can't have a div here - need button as it's sccessible) added aria-label tag */}
          <button
            aria-label="Close dialog"
            className="close-btn"
            onClick={handleClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    )
  );
}

export default ConfirmationModal;
