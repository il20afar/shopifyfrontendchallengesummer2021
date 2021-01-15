// [IMPORTS]
/* node_modules */
import React, { useState } from "react";
import Div100vh from "react-div-100vh";
/* project */
import Input from "../Components/Input/Input";
import ResultContainer from "../Components/ResultContainer/ResultContainer";
import { useInitialLocalStorage } from "../Hooks/useInitialLocalStorage";
import { useUpdateLocalStorage } from "../Hooks/useUpdateLocalStorage";
import { getOmdbResults } from "../Utils/getOmdbResults";
/* folder */
import "./Main.scss";

// [GLOBAL TYPES]
export type TSearchStatus =
  | "idle"
  | "searching"
  | "success"
  | "noresults"
  | "error";

// [FUNCTIONAL COMPONENTS]
const Main = () => {
  const [searchStatus, setSearchStatus]: [TSearchStatus, any] = useState(
    "idle"
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  // Handlers for input and nominations actions
  const handlers = {
    input: {
      onChange: (e: { target: { value: React.SetStateAction<string> } }) => {
        setSearchValue(e.target.value);
      },
      onSearch: async () => {
        setSearchStatus("searching");
        const results = await getOmdbResults(searchValue, "search");
        if (results.Search) {
          setSearchResults(results.Search);
          setSearchStatus("success");
        } else {
          setSearchResults([]);
          setSearchStatus("noresults");
        }
      },
      onCancel: () => {
        setSearchValue("");
      },
    },

    nominations: {
      onAction: (type: "Results" | "Nominations", index: number) => {
        console.log(index);
        if (type === "Results") {
          // @ts-ignore
          const rest = searchResults.find((elem: any) => index === elem.imdbID);
          // @ts-ignore
          setNominations([rest, ...nominations]);
        } else {
          setNominations(
            [...nominations].filter((elem: any) => index !== elem.imdbID)
          );
        }
      },
    },
  };

  // Uses the content in local storage to render initial nominations
  useInitialLocalStorage(setNominations);

  // Updates the content of local storage on nominations change
  useUpdateLocalStorage(nominations, setNominations);

  console.log(searchResults, nominations);

  const isBannerActive = nominations.length === 5;
  return (
    <Div100vh style={{ maxHeight: "100%" }}>
      <div className={`nominations_banner ${isBannerActive ? "show" : "hide"}`}>
        You have successfully selected all of your nominations, thank you for
        using Shoppies 🙂
      </div>

      <div
        className={`main_container ${searchStatus} ${
          isBannerActive ? "showBanner" : ""
        }`}
      >
        <div className="logo_container">The Shoppies</div>
        <div className="search_container">
          <Input
            value={searchValue}
            placeholder="Search for a movie..."
            onChange={handlers.input.onChange}
            onSearch={handlers.input.onSearch}
            onCancel={handlers.input.onCancel}
          />
        </div>
        <div className="content_container">
          <ResultContainer
            type="Results"
            searchResults={searchResults.filter(
              (elem) => !nominations.includes(elem)
            )}
            searchStatus={searchStatus}
            onAction={handlers.nominations.onAction}
            showActionButton={nominations.length !== 5}
          />
          <ResultContainer
            type="Nominations"
            searchResults={nominations}
            searchStatus={"idle"}
            onAction={handlers.nominations.onAction}
          />
        </div>
      </div>
    </Div100vh>
  );
};

// [EXPORTS]
export default Main;
