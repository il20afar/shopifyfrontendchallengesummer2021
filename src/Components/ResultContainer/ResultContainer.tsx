// [IMPORTS]
/* node_modules */
import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
/* project */
import MovieTileContainer from "../MovieTileContainer/MovieTileContainer";
import { getOmdbResults } from "../../Utils/getOmdbResults";
/* folder */
import "./ResultContainer.scss";
import { IResultContainerProps } from "./IResultContainerProps";

const ResultContainer = (props: IResultContainerProps) => {
  const {
    type,
    searchResults,
    searchStatus,
    onAction,
    showActionButton = true,
  } = props;
  const [expanded, setExpanded] = useState(-1);
  const movieResultExpandedRef: any = useRef({});

  const toggleExpanded = async (index: number, imdbId: string) => {
    if (index === expanded) {
      setExpanded(-1);
    } else {
      const res = await getOmdbResults(imdbId, "id");
      movieResultExpandedRef.current = res;
      setExpanded(index);
    }
  };

  React.useEffect(() => {
    setExpanded(-1);
  }, [searchStatus]);

  return (
    <div
      className={`component_il20afar_result_container ${searchStatus} ${
        !showActionButton ? "hideActionButton" : ""
      }`}
    >
      <div className="title_container">{type}</div>
      <div className="content_wrapper">
        {searchResults.length === 0 ? (
          <div className="empty_result_container">
            {type === "Results"
              ? searchStatus === "idle"
                ? "Search to display movie results."
                : "No results found..."
              : "Add movies from the 'Results' section!"}
          </div>
        ) : (
          searchResults.map((movieResult, index) => {
            const isExpanded = index === expanded;

            return (
              <MovieTileContainer
                key={uuid()}
                type={type}
                index={index}
                movieResult={
                  isExpanded ? movieResultExpandedRef.current : movieResult
                }
                isExpanded={isExpanded}
                toggleExpanded={toggleExpanded}
                onAction={onAction}
                showActionButton={showActionButton}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ResultContainer;
