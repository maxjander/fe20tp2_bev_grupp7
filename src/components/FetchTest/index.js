import React from "react";

export default class FetchRandCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentDidMount() {
    const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
    const response = await fetch(url);
    const cardData = await response.json();
    console.log(cardData);
    this.setState({ loading: false });
  }

  componentWillUnmount() {}
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading Portfolio...</div>
        ) : (
          <div>All Data is now loaded</div>
        )}
      </div>
    );
  }
}
