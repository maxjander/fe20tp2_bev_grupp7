import React, { useState } from "react";
import { compose } from "recompose";
import styled from "styled-components";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import LineGraph from "../LineChart";
import { CardContext } from "../CardContext";
import LinDat from "../DeltaData";
import { BsFillGridFill } from "react-icons/bs";
import { CgRowFirst } from "react-icons/cg";
import Slider from "../Slider";

import CardList from "./CardList";
import AddCard from "../AddCard";
import Modal from "../Modal";

import {
  StyledButton,
  StyledAddCardAndGridButtonContainer,
} from "./styledComponents";

/*
  HomePage
  functional component that renders card component
*/

const HomePage = () => {
  const [rangeValue, setRangeValue] = useState(1);
  const onChangeSlider = (e) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  return (
    <CardContext.Consumer>
      {(context) => (
        <StyledHomeComponent>
          <StyledStyledGraphContainer>
            <StyledGraphContainer>
              {context.cards && (
                <LineGraph
                  data={LinDat(context.cards, rangeValue)}
                  label={"Total value of inventory"}
                />
              )}
            </StyledGraphContainer>
          </StyledStyledGraphContainer>
          {context.cards && (
            <Slider
              min={1}
              max={localStorage.getItem("totalDays")}
              step={1}
              defaultLength={rangeValue}
              value={rangeValue}
              onChangeValue={onChangeSlider}
            />
          )}
          <StyledInventoryHeader children='Inventory' />
          <Cards cards={context.cards} />

          {/* <ApiFetch /> */}
        </StyledHomeComponent>
      )}
    </CardContext.Consumer>
  );
};

/*
  Cards component is CardsBase component withFirebaseContext
*/

const CardsBase = (props) => {
  const { cards } = props;

  const { setVisable: toggleAddCardModal, Content: AddCardModal } = Modal();

  const [toggleGridView, setToggleGridView] = useState(false); //grid: false //grid:true

  const handleToggleGridView = () => setToggleGridView(!toggleGridView); //grid: false -> grid: true

  //onRemoveMessage

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          <StyledAddCardAndGridButtonContainer>
            <StyledButton onClick={toggleAddCardModal}>Add Card</StyledButton>

            <StyledButton onClick={handleToggleGridView}>
              {toggleGridView ? <BsFillGridFill /> : <CgRowFirst />}
            </StyledButton>
          </StyledAddCardAndGridButtonContainer>

          <CardList /*propmessages, oneditmessage, onremovemessage */
            cards={cards}
            firebase={props.firebase}
            toggleGridView={toggleGridView}
            authUser={authUser}
          />

          <AddCardModal>
            <AddCard firebase={props.firebase} authUser={authUser} />
          </AddCardModal>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const Cards = withFirebase(CardsBase);
const condition = (authUser) => !!authUser;
export default compose(withAuthorization(condition))(HomePage);

/*---THE ENTIRE HOME COMPONENT STYLE---*/

const StyledHomeComponent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const StyledInventoryHeader = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const StyledStyledGraphContainer = styled.div`
  display: flex;
  /* max-width: 99%; */
  justify-content: center;
  background-color: lightgrey;
`;

const StyledGraphContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 99%;
  @media screen and (min-width: 1000px) {
    max-width: 999px;
  }
`;
