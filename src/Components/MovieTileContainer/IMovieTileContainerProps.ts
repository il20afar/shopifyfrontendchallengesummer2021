interface IMovieTileContainerProps {
  /**
   * To which type of ResultContainer this tile is in
   */
  type: "Results" | "Nominations";
  /**
   * Index of the movie in the list
   */
  index: number;
  /**
   * Object representing the movie information of this tile
   * Has more properties if isExpanded is true
   */
  movieResult: any;
  /**
   * Is the tile expanded (more movie info) or not
   */
  isExpanded: boolean;
  /**
   * Expand the tile to display additional information
   */
  toggleExpanded: any;
  /**
   * Add or remove the movie from its respective
   */
  onAction: any;
  /**
   * Show or not the + or - action button icons
   */
  showActionButton: boolean;
}

export type { IMovieTileContainerProps };
