import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import styled from "styled-components";
// import PortfolioGraph from "../Graph";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
// import Autocomplete from "../Autocomplete";
import CardPresentation from "../CardPresentation";
import infoData from "../../constants/listOfNames.json";
import allData from "../../constants/data.json";
import cardConditions from "../../constants/cardConditions";
import LineGraph from "../LineChart";
import { CardContext } from "../CardContext";
import LinDat from "../DeltaData";
import { BsFillGridFill } from "react-icons/bs";
import { CgRowFirst } from "react-icons/cg";
import Slider from "../Slider";
import ApiFetch from "../ApiFetch";

import CardList from "./CardList";
import AddCardModal from "./AddCardModal";
import CardPresentationModal from "./CardPresentationModal";
import {
  StyledButton,
  StyledAddCardAndGridButtonContainer,
} from "./styledComponents";
//only run this ^ when you want to push delta data into firebase, make sure only one person is running it so you don't duplicate data.    */

/*
  HomePage
  functional component that renders card component
*/

const HomePage = () => {
  //dagens datum
  const [rangeValue, setRangeValue] = useState(2);
  const onChangeSlider = (e) => {
    setRangeValue(parseInt(e.target.value, 10));
  };

  return (
    <CardContext.Consumer>
      {(context) => (
        <StyledHomeComponent>
          <div>
            <StyledStyledGraphContainer>
              <StyledGraphContainer>
                {context.cards[0] && (
                  <LineGraph
                    data={LinDat(context.cards, rangeValue)}
                    label={"Total value of inventory"}
                  />
                )}
              </StyledGraphContainer>
            </StyledStyledGraphContainer>
            {context.cards[0] && (
              <Slider
                min={1}
                max={localStorage.getItem("totalDays")}
                step={1}
                defaultLength={rangeValue}
                value={rangeValue}
                onChangeValue={onChangeSlider}
              />
            )}
            <StyledInventoryHeader children="Inventory" />
            <Cards />

            <ApiFetch />
          </div>
        </StyledHomeComponent>
      )}
    </CardContext.Consumer>
  );
};

/*
  Cards component is CardsBase component withFirebaseContext
*/

const CardsBase = (props) => {
  /*
  autocompletelement creates ref to this state to Autocomplete Component
  */
  // const autoCompleteElement = React.createRef();
  const [cardName, setCardName] = useState("");
  const [apiCard, setApiCard] = useState(null);
  const [cardSet, setCardSet] = useState("");
  const [cardCondition, setCardCondition] = useState("");
  const [setPrice, setSetPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyPoint, setBuyPoint] = useState(null);
  const [cards, setCards] = useState([]);

  const [toggleModal, setToggleModal] = useState(false);

  const [
    toggleCardPresentationModal,
    setToggleCardPresentationModal,
  ] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);

  // const node = useRef(); //ref for modal to cancel onmousedown
  // const presentationNode = useRef(); //ref for presentationmodal cancel onmousedown

  const [toggleGridView, setToggleGridView] = useState(false); //grid: false //grid:true

  /*
  useEffect is react hooks version of componentdidmount

  And its return is hooks version of componentwillunmount
  */
  useEffect(() => {
    setLoading(true);
    //messages
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();

      if (cardObject) {
        //convert cards list from snapshot

        /*
          takes a snapshot off all cards, and takes the cards uniqe id 
          and adds it the cardobject.
        */
        const cardList = Object.keys(cardObject).map((key) => ({
          ...cardObject[key],
          uid: key,
        }));
        const cardsWithImages = cardList.map((card) => {
          const tempCardObject = { ...card };
          let allDataCard = allData.data.find(
            (item) => Number(item.id) === Number(card.cardId)
          );
          //console.log(card.id)
          //console.log(allDataCard)
          tempCardObject.image = allDataCard["card_images"][0].image_url;
          return tempCardObject;
        });
        //Set CardList to state
        setCards(cardsWithImages);
        //approves loading of page
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      //when component unmounts, this disconncts form the cards entity of the
      //database
      props.firebase.cards().off();
    };
  }, [props.firebase]);

  const handleToggleModal = () => {
    setCardName("");
    setCardSet("");
    setCardCondition("");
    setApiCard(null);
    // setToggleModal(false);
    // autoCompleteElement.current.setState({
    //   userInput: "",
    // });
    setToggleModal(!toggleModal);
  };

  const handleCardPresentationToggleModal = () => {
    if (toggleCardPresentationModal === true) {
      setClickedCard(null);
    }
    setToggleCardPresentationModal(!toggleCardPresentationModal);
  };

  const handleToggleGridView = () => setToggleGridView(!toggleGridView); //grid: false -> grid: true

  const onChangeCardName = (event) => setCardName(event.target.value);
  //did not exist
  const onChangeCardSet = (event) => {
    //Function for setting Cardset to state, it's a callback from input field when adding cards.

    //setting index for selecting the right cardset
    let index = event.target.options.selectedIndex - 1;

    /*
    if the index is above or equal to zero it defines the state
    with an object with set_code and set_rarity_code.
    */
    if (index >= 0) {
      setCardSet({
        set_code: apiCard.card_sets[index].set_code,
        set_rarity_code: apiCard.card_sets[index].set_rarity_code,
      });

      setSetPrice(apiCard.card_sets[index].set_price);
    } else {
      setCardSet("");
    }
  }; //did not exist
  const onChangeCardCondition = (event) => setCardCondition(event.target.value);
  const onChangeBuyPoint = (event) => setBuyPoint(event.target.value);
  //onCreateMessage

  const onCreateCard = (event, authUser) => {
    //Checks if input is correct and voids the post if incorrect
    // https://firebase.google.com/docs/database/ios/structure-data
    if (cardConditions.includes(cardCondition)) {
      props.firebase
        .cards()
        .push({
          cardId: apiCard.id,
          cardName: cardName,
          cardSet: cardSet,
          cardCondition: cardCondition,
          buy_point: buyPoint,
          marketPrice: {
            marketPriceDateAdded: setPrice,
          },
          priceChangeDeltaValueHistory: { [Date.now()]: 0 },
          userId: authUser.uid,
          createdAt: props.firebase.serverValue.TIMESTAMP,
        })
        /*
  Above pushes our card to firebase, with the values from state
  */
        .then((res) => {
          let createdCardId = res.getKey();
          props.firebase
            .userCardArray(authUser.uid)
            .child(createdCardId)
            .set(true);
        });
      /* 
        Above takes the response from the push and gets the new uid for the card
        and sets it to the correct user
*/

      //Resets State when Card is created
      setCardName("");
      setCardSet("");
      setCardCondition("");
      setApiCard(null);
      setToggleModal(false);

      //This changes states on the autocomplete when Card is created
      // autoCompleteElement.current.setState({
      //   userInput: "",
      // });
    }
    event.preventDefault();
  };

  //onRemoveMessage
  const onRemoveCard = (uid, authUser) => {
    props.firebase.userCardArray(authUser.uid).child(uid).remove();
    props.firebase.card(uid).remove();
  };
  //oneditmessage //message //text
  const onEditCard = (card, cardName, cardSet, cardCondition) => {
    const { uid, ...cardSnapshot } = card;

    props.firebase.card(card.uid).set({
      ...cardSnapshot,
      cardName,
      cardSet,
      cardCondition,
      editedAt: props.firebase.serverValue.TIMESTAMP,
    });
  };
  const autoCompleteCallback = (cardNameFromAutoComplete) => {
    // Callback function to send down the component tree to update state
    const innerApiCard = allData.data.find(
      (item) => item.name === cardNameFromAutoComplete
    );

    setApiCard(innerApiCard);
    setCardName(cardNameFromAutoComplete);
    setCardSet("");
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <>
          {/* <LineGraph /> */}
          {/* {cards ? <PortfolioGraph cards={cards} authUser={authUser} /> : null} */}
          <StyledAddCardAndGridButtonContainer>
            <StyledButton onClick={handleToggleModal}>Add Card</StyledButton>
            {toggleGridView ? (
              <StyledButton onClick={handleToggleGridView}>
                <BsFillGridFill />
              </StyledButton>
            ) : (
              <StyledButton onClick={handleToggleGridView}>
                <CgRowFirst />
              </StyledButton>
            )}
          </StyledAddCardAndGridButtonContainer>

          {loading && <div>Loading...</div>}
          {/*messages*/}

          <CardList /*propmessages, oneditmessage, onremovemessage */
            cards={cards}
            onEditCard={onEditCard}
            onRemoveCard={onRemoveCard}
            props={props}
            authUser={authUser}
            toggleGridView={toggleGridView}
            handleToggleGridView={handleToggleGridView}
            setClickedCard={setClickedCard}
            handleCardPresentationToggleModal={
              handleCardPresentationToggleModal
            }
          />

          <CardPresentationModal
            // ref={presentationNode}

            /* 

            handleCardPresenation Modal, 
                Skickar med den när funktionen som prop och deconstrucas i Childet

                som finns i 

            const handleCardPresentationToggleModal = () => {
                if (toggleCardPresentationModal === true) {
                  setClickedCard(null);
                }
               setToggleCardPresentationModal(!toggleCardPresentationModal);

                skickar även med statet toggleCardPresentationModal som false från början
                ifall togglePresentationModal är true så returneras CardPresentation från props children inuti en modal
                annars returnas null; 

                och skickar med authUser

                Och skickar även med statet clickedCard 

                som sätts från Componenten CardItem med en onClick på en span som wrappar runt varje kort

                i CardPresentation componenten så hämtas all info om kortet från vårat Api, 
                så länge vi inte har fått svaret från api så Renderas ingenting

  };


            */
            handleCardPresentationToggleModal={
              handleCardPresentationToggleModal
            }
            toggleCardPresentationModal={toggleCardPresentationModal}
            authUser={authUser}
          >
            {clickedCard && <CardPresentation card={clickedCard} />}
          </CardPresentationModal>

          <AddCardModal
            // ref={node}
            handleToggleModal={handleToggleModal}
            toggleModal={toggleModal}
            authUser={authUser}
            onCreateCard={onCreateCard}
            cardName={cardName}
            onChangeCardName={onChangeCardName}
            infoData={infoData}
            autoCompleteCallback={autoCompleteCallback}
            apiCard={apiCard}
            onChangeCardSet={onChangeCardSet}
            cardSet={cardSet}
            cardCondition={cardCondition}
            onChangeCardCondition={onChangeCardCondition}
            cardConditions={cardConditions}
            buyPoint={buyPoint}
            onChangeBuyPoint={onChangeBuyPoint}
          />

          {/* <button type="button" onClick={handleToggleModal}>
            Add Card
          </button> */}
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

  @media (max-width: 800px) {
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
