import React from "react";

export default class FetchRandCard extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    const response = await fetch(url);
    const cardData = await response.json();
    console.log(cardData);
  }

  render() {
    return (
      <div>
        {this.state.loading ? <div>Loading Portfolio...</div> : <div>Test</div>}
      </div>
    );
  }
}
