import React, { useRef, useEffect } from "react";

// import { CardContext } from "../../CardContext";
import {
  StyledButton,
  StyledModalMain,
  StyledModal,
} from "../styledComponents";

const CardPresentationModal = ({
  handleCardPresentationToggleModal,
  toggleCardPresentationModal,
  children,
}) => {
  const presentationNode = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (presentationNode.current.contains(e.target)) {
        return;
      }
      handleCardPresentationToggleModal();
    };

    if (toggleCardPresentationModal === true) {
      window.addEventListener("mousedown", handleClick);
    } else {
      window.removeEventListener("mousedown", handleClick);
    }
    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleCardPresentationModal, handleCardPresentationToggleModal]);

  return toggleCardPresentationModal ? (
    <StyledModal>
      <StyledModalMain ref={presentationNode}>
        {children}
        <br />
        <StyledButton onClick={handleCardPresentationToggleModal}>
          Close
        </StyledButton>
      </StyledModalMain>
    </StyledModal>
  ) : null;
};

export default CardPresentationModal;
