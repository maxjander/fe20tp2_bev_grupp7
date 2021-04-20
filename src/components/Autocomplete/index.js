import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
    };
  }

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
    this.props.autoCompleteCallback(e.currentTarget.value);
  };

  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
    this.props.autoCompleteCallback(e.currentTarget.innerText);
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
      this.props.autoCompleteCallback(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput.length >= 3) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className='suggestions-container'>
            <ul className='suggestions'>
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className='no-suggestions'>
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <StyledInput
          type='text'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          placeholder='Add a new Card Name here'
        />
        <StyledDiv>{suggestionsListComponent}</StyledDiv>
      </Fragment>
    );
  }
}

export default Autocomplete;

/*---Card Search Field---*/
const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  width: 200px;
  padding: 10px;
  margin: 10px;
  margin-bottom: 0px;

  :focus {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const StyledDiv = styled.div`
  z-index: 20;

  .suggestions-container {
  }

  .no-suggestions {
    color: #999;
    padding: 0.5rem;
  }

  /*---The card suggestions dropdown---*/
  .suggestions {
    border: 1px solid #999;
    border-top-width: 0;
    list-style: none;
    margin-top: 0px;
    max-height: 300px;
    overflow-y: auto;
    padding-left: 0px;
    width: 220px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: white;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .suggestions li {
    padding: 0.5rem;
  }

  .suggestion-active,
  .suggestions li:hover {
    background-color: #c0b9dd;
    color: white;
    cursor: pointer;
    font-weight: 600;
  }

  .suggestions li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;
