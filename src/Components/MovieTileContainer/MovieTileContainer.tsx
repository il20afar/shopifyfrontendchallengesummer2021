// [IMPORTS]
/* node_modules */
import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPlus,
  faMinus,
  faInfoCircle,
  faSpinner,
  faFilm,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

/* project */
import InfoFieldContainer from "../InfoFieldContainer/InfoFieldContainer";
/* folder */
import "./MovieTileContainer.scss";
import { IMovieTileContainerProps } from "./IMovieTileContainerProps";

// [FUNCTIONAL COMPONENTS]
const MovieTileContainer = (props: IMovieTileContainerProps) => {
  const {
    type,
    index,
    movieResult,
    isExpanded,
    toggleExpanded,
    onAction,
    showActionButton,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [isExpandLoading, setIsExpandLoading] = useState(false);

  const isResults = type === "Results";

  const handlers = {
    onAction: () => {
      if (showActionButton) {
        ref.current && ref.current.classList.add("close_animate");
        window.setTimeout(() => {
          onAction(type, movieResult.Title);
        }, 300);
      }
    },
    onExpandInfo: () => {
      if (ref.current) {
        !isExpandLoading && setIsExpandLoading(true);
        toggleExpanded(index, movieResult.imdbID);
      }
    },
  };

  return (
    <div
      key={uuid()}
      ref={ref}
      className={`component_il20afar_movie_info_container ${
        isResults ? "results" : "nominations"
      } ${isExpanded ? "expanded" : ""} ${
        !showActionButton ? "hide_action_button" : ""
      }`}
    >
      <div className="action_hover_wrapper" onClick={handlers.onAction}>
        <div className="poster_container">
          {movieResult.Poster === "N/A" ? (
            <FontAwesomeIcon icon={faFilm} size="lg" color="white" />
          ) : (
            <img
              src={movieResult.Poster}
              alt={`movie-poster-${movieResult.Title}`}
            />
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
                <InfoFieldContainer key={uuid()} title={elem}>
                  {movieResult[elem]}
                </InfoFieldContainer>
              ))}
            </>
          ) : (
            <div className="info_wrapper">
              {`${movieResult.Title} (${movieResult.Year})`}
            </div>
          )}
        </div>
        <div className={`icon_container ${isResults ? "add" : "remove"}`}>
          <FontAwesomeIcon
            icon={isResults ? faPlus : faMinus}
            color={"black"}
          />
        </div>
      </div>

      <div
        className={`icon_container info ${isExpandLoading ? "animate" : ""}`}
        onClick={handlers.onExpandInfo}
      >
        <FontAwesomeIcon
          icon={
            isExpandLoading
              ? faSpinner
              : isExpanded
              ? faTimesCircle
              : faInfoCircle
          }
          color={"black"}
        />
      </div>
    </div>
  );
};

// [EXPORTS]
export default MovieTileContainer;
