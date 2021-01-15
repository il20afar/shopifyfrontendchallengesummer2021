import { TSearchStatus } from "../../Main/Main";

interface IResultContainerProps {
  /**
   * Type of ResultContainer
   */
  type: "Results" | "Nominations";
  /**
   * Array of movie objects search results
   */
  searchResults: any[];
  /**
   * Search status of container
   */
  searchStatus: TSearchStatus;
  /**
   * Add or remove a movie from this container
   */
  onAction: any;
  /**
   * Display or not the action button
   * @default true
   */
  showActionButton?: boolean;
}

export type { IResultContainerProps };
