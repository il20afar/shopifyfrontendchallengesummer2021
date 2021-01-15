// [IMPORTS]
/* node_modules */
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

/* folder */
import "./Input.scss";
import { IInputProps } from "./IInputProps";

// [FUNCTIONAL COMPONENTS]
const Input = (props: IInputProps) => {
  const { value, placeholder, onChange, onSearch, onCancel } = props;
  const inputRef = useRef(null);
  const iconAvailability = value === "" ? "unavailable" : "available";
  return (
    <div className="component_il20afar_input">
      <div className="input_container">
        <input
          ref={inputRef}
          className="input_div"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (value !== "") {
                e.preventDefault();
                onSearch();
              }
            }
          }}
          type="text"
        />
        <div
          className={`cancel_icon_container ${iconAvailability}`}
          onClick={() => {
            onCancel();
            //@ts-ignore
            inputRef.current.focus();
          }}
        >
          <FontAwesomeIcon icon={faTimes} color="red" size="sm" />
        </div>
      </div>

      <div
        className={`search_icon_container ${iconAvailability}`}
        onClick={onSearch}
      >
        <FontAwesomeIcon icon={faSearch} color="white" size="sm" />
      </div>
    </div>
  );
};

// [EXPORTS]
export default Input;
