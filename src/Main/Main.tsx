import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

import Input from "../Components/Input/Input";
import { useInitialLocalStorage } from "../Hooks/useInitialLocalStorage";
import { useUpdateLocalStorage } from "../Hooks/useUpdateLocalStorage";
import { getOmdbResults } from "../Utils/getOmdbResults";

import "./Main.scss";

type TSearchStatus = "idle" | "searching" | "success" | "error";

const InfoField = (props: any) => {
  const { title, children } = props;
  return (
    <div className="info_field_container">
      <div className="info_field_title">{title}:</div>
      <a className="info_field_content" href={children}>
        {children}
      </a>
    </div>
  );
};

const MovieTileContainer = (props: {
  isExpanded: boolean;
  searchResult: any;
  expandedRef: any;
  title: string;
  index: number;
  toggleExpanded: any;
  onAction: any;
  actionButtonVisible: boolean;
}) => {
  const {
    isExpanded,
    searchResult,
    expandedRef,
    title,
    index,
    toggleExpanded,
    onAction,
    actionButtonVisible,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const isTitle = title === "Results";

  const handlers = {
    onAction: () => {
      if (actionButtonVisible) {
        ref.current && ref.current.classList.add("close_animate");

        window.setTimeout(() => {
          onAction(title, searchResult.Title);
        }, 300);
      }
    },
  };

  return (
    <div
      key={uuid()}
      ref={ref}
      className={`movie_info_container ${isTitle ? "results" : "nominations"} ${
        isExpanded ? "expanded" : ""
      } ${!actionButtonVisible ? "hide_action_button" : ""}`}
    >
      <div className="action_hover_wrapper" onClick={handlers.onAction}>
        <div className="poster_container">
          {searchResult.Poster === "N/A" ? (
            <FontAwesomeIcon icon={faFilm} size="lg" color="white" />
          ) : (
            <img src={searchResult.Poster} />
          )}
        </div>
        <div className="info_container">
          {isExpanded ? (
            <>
              {[
                "Title",
                "Director",
                "Actors",
                "Year",
                "Runtime",
                "Rated",
                "Released",
                "Plot",
              ].map((elem) => (
                <InfoField title={elem}>{expandedRef.current[elem]}</InfoField>
              ))}
            </>
          ) : (
            <div className="info_wrapper">
              {`${searchResult.Title} (${searchResult.Year})`}
            </div>
          )}
        </div>
        <div className={`icon_container ${isTitle ? "add" : "remove"}`}>
          <FontAwesomeIcon icon={isTitle ? faPlus : faMinus} color={"black"} />
        </div>
      </div>

      <div
        className="icon_container info"
        onClick={() => toggleExpanded(index, searchResult.imdbID)}
      >
        <FontAwesomeIcon icon={faInfoCircle} color={"black"} />
      </div>
    </div>
  );
};

const ResultContainer = (props: {
  title: string;
  results: any[];
  searchStatus: TSearchStatus;
  onAction: any;
  actionButtonVisible?: boolean;
}) => {
  const {
    title,
    results,
    searchStatus,
    onAction,
    actionButtonVisible = true,
  } = props;
  const [expanded, setExpanded] = useState(-1);
  const expandedRef: any = useRef({});

  const toggleExpanded = async (index: number, imdbId: string) => {
    if (index === expanded) {
      setExpanded(-1);
    } else {
      const res = await getOmdbResults(imdbId, "id");
      expandedRef.current = res;
      setExpanded(index);
    }
  };

  return (
    <div
      className={`result_container ${searchStatus} ${
        !actionButtonVisible ? "hideActionButton" : ""
      }`}
    >
      <div className="title_container">{title}</div>
      <div className="content_wrapper">
        {results.map((searchResult, index) => (
          <MovieTileContainer
            isExpanded={index === expanded}
            {...{
              searchResult,
              expandedRef,
              title,
              index,
              toggleExpanded,
              onAction,
              actionButtonVisible,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Main = () => {
  const [searchStatus, setSearchStatus]: [TSearchStatus, any] = useState(
    "idle"
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  const handlers = {
    input: {
      onChange: (e: any) => {
        setSearchValue(e.target.value);
      },
      onSearch: async () => {
        setSearchStatus("searching");
        const results = await getOmdbResults(searchValue, "search");
        if (results.Search) {
          setSearchResults(results.Search);
          setSearchStatus("success");
        } else {
          setSearchStatus("idle");
        }
      },
      onCancel: () => {
        setSearchValue("");
      },
    },

    nominations: {
      onAction: (type: "Results" | "Nominations", index: number) => {
        if (type === "Results") {
          // @ts-ignore
          const rest = searchResults.find((elem: any) => index === elem.Title);
          // @ts-ignore
          setNominations([rest, ...nominations]);
        } else {
          setNominations(
            [...nominations].filter((elem: any) => index !== elem.Title)
          );
        }
      },
    },
  };

  // Uses the content in local storage to render initial nominations
  useInitialLocalStorage(setNominations);

  // Updates the content of local storage on nominations change
  useUpdateLocalStorage(nominations, setNominations);

  const isBannerActive = nominations.length === 5;
  return (
    <>
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
            title="Results"
            results={searchResults.filter(
              (elem) => !nominations.includes(elem)
            )}
            searchStatus={searchStatus}
            onAction={handlers.nominations.onAction}
            actionButtonVisible={nominations.length !== 5}
          />
          <ResultContainer
            title="Nominations"
            results={nominations}
            searchStatus={searchStatus}
            onAction={handlers.nominations.onAction}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
