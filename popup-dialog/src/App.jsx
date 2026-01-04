import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import "./styles.css";

/**
 * Following requirements to be met.
 *
 * 1. Should open on button click
 * 2. Close by ESC & backdrop
 * 3. Show and Hide with animation (show animation already present)
 * 4. User can pass custom JSX
 * 5. Close button inside dialog
 * 7. It should be accessible
 */

/**
 Accessibility Guidelines
 * 1. It should cover all the screen, nothing should be intractable behind dialog. No Scroll. No Focus.
2. Focus Capturing: Via Tab or Shift + Tab focus should not leave the dialog. Until the dialog is closed.
3. When we Open Dialog, first focusable element should get focused.
4. When we close the dialog, the focus set back to the
triggering element, and if triggering element is not there, focus should be added on the relevant element.
5. aria-labelled by should there
6. if there is description in the dialog, add id to it, and use aria- described by to match it.
7. User aria-modal=true to tell screen readers that content behind it is not expected to be read. Previously we used to add aria-hidden to all other contents. (Still we have to add, because this new property and might not support all tools and browsers)
 */

export default function App() {
  const [showDialog, setShowDialg] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Action status message here"
  );

  const handleShowDialog = () => {
    setShowDialg((prev) => !prev);
  };

  const openDialog = () => {
    setShowDialg(true);
  };

  const handleStatusMessage = (message) => {
    setStatusMessage(message);
  };

  return (
    <div className="app-container">
      {/** Accessibility - wrapping the non dialog contents in a div and
       * giving aria-hidden - showDialog
       * This ensures that the old readers don't pronounce these when  dialogue is open
       */}
      <div className="centered" aria-hidden={showDialog}>
        <button
          className="open-modal-btn"
          data-testid="open-modal-button"
          onClick={openDialog}
        >
          Open Confirmation Modal
        </button>
        <div className="action-status">{statusMessage}</div>
      </div>
      <div className="modal-container">
        <ConfirmationModal onClose={handleShowDialog} showDialog={showDialog}>
          {/** Content is being rendered here as children */}
          {/** adding the appropriate id for screen readers in accessibility */}
          <h2 id="modal-title" className="modal-title">
            Confirm Action
          </h2>
          <p id="modal-description" className="modal-message">
            Are you sure you want to proceed?
          </p>

          <div className="modal-buttons">
            <button
              className="confirm-btn"
              onClick={() => handleStatusMessage("Confirmed")}
            >
              Confirm
            </button>
            <button
              className="cancel-btn"
              onClick={() => handleStatusMessage("Cancelled")}
            >
              Cancel
            </button>
          </div>
        </ConfirmationModal>
      </div>
    </div>
  );
}
