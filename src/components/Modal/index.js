import React, { useRef, useEffect, useState } from "react";

import {
  StyledModalMain,
  StyledModal,
  StyledButton,
} from "../Home/styledComponents";

const Modal = () => {
  const [visable, setVisable] = useState(false);

  const node = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        return;
      }
      setVisable(!visable);
    };

    visable
      ? window.addEventListener("mousedown", handleClick)
      : window.removeEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [setVisable, visable]);

  const Content = ({ children }) => {
    return visable ? (
      <StyledModal>
        <StyledModalMain ref={node}>
          {children}
          <StyledButton onClick={() => setVisable(!visable)}>
            Close
          </StyledButton>
        </StyledModalMain>
      </StyledModal>
    ) : null;
  };
  return { visable, setVisable, Content };
};

export default Modal;
