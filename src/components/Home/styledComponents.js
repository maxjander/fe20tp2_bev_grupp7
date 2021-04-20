import styled from "styled-components";

export const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button`
  position: relative;
  display: block;
  margin: 2px;
  width: 120px;
  height: 26px;
  border-radius: 18px;
  background-color: #969696;
  border: solid 1px transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 450;
  cursor: pointer;

  &:hover {
    background-color: #4d4d4d;
    border-color: #fff;
    transition: all 0.1s ease-in-out;
  }
`;

export const StyledEditButton = styled(StyledButton)`
  display: flex;
  width: auto;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

export const StyledDeleteButton = styled(StyledButton)`
  display: flex;
  width: auto;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;
`;

export const StyledSelect = styled.select`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 220px;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  box-sizing: border-box;

  :focus {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

export const StyledAddCardAndGridButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: solid black 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const StyledEditAndDeleteButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: auto;
  margin-top: 4px;
  margin-bottom: 0px;
  /* align-self: center; */
  padding: 0 15px;
  @media (max-width: 800px) {
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
  }
`;

export const StyledModalMain = styled.section`
  position: fixed;
  background: white;
  width: 80vw;
  /* height: 80vh; */
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #000000;
  background: rgba(0, 0, 0, 0.6);
`;
