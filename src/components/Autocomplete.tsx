import { useState, useEffect, SetStateAction } from "react";
import suggestions from "./suggestions";
import { useSelector } from "react-redux";

const AutoComplete = ({ setComment }: any) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) {
      setComment(input);
    }
  }, [input, setComment]);

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const userInput: any = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked: any = suggestions.filter((suggestion) =>
      suggestion?.toLowerCase()?.startsWith(userInput?.toLowerCase())
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e: { target: { innerText: SetStateAction<string>; }; }) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            // @ts-ignore  
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>
          {/* `No suggestions for you {userInfo?.firstname} , you're on your own!` */}
        </em>
      </div>
    );
  };

  return (
    <>
      <input
        className="comment-input"
        type="text"
        onChange={onChange}
        // onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;
