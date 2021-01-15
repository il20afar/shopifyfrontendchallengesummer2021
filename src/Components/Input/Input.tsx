import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Input.scss";

const Input = (props: any) => {
  const { value, placeholder, onChange, onSearch, onCancel } = props;
  const inputRef = React.useRef(null);
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
              e.preventDefault();
              onSearch();
            }
          }}
          type="text"
        />
        <div
          className={`cancel_icon_container ${iconAvailability}`}
          onClick={() => {
            console.log("passs");
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

export default Input;
