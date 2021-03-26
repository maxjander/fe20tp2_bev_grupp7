import React, { useState, useEffect } from "react";

const UserItemBase = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [cards, setCards] = useState(null);

  // const [location, setLocation] = useState(props.location.state)
  const onSendPasswordResetEmail = () => {
    props.firebase.doPasswordReset(user.email);
  };

  useEffect(() => {
    if (user) {
      return;
    }
    setLoading(true);

    props.firebase.user(props.match.params.id).on("value", (snapshot) => {
      setUser(snapshot.val());
      setLoading(false);

      return () => {
        props.firebase.user(props.match.params.id).off();
      };
    });
    props.firebase.cards().on("value", (snapshot) => {
      const cardObject = snapshot.val();

      if (cardObject) {
        //convert cards list from snapshot
        const cardList = Object.keys(cardObject)
          .map((key) => ({
            ...cardObject[key],
            uid: key,
          }))
          .filter((card) => card.userId === props.match.params.id);

        setCards(cardList);
        console.log(cardList);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [user, props.firebase, props.match.params.id]);

  return (
    <div>
      <h2>User ({props.match.params.id})</h2>
      {loading && <div>Loading ...</div>}

      {user && (
        <div>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
          <span>
            <button type='button' onClick={onSendPasswordResetEmail}>
              Send Password Reset
            </button>
          </span>
        </div>
      )}

      <ul>
        {cards &&
          cards.map((card) => (
            <li key={card.uid}>
              {card.cardName} {card.cardSet.set_rarity_code}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserItemBase;
