interface IInputProps {
  /**
   * Controlled value of input
   */
  value: string;
  /**
   * Placeholder if value empty
   */
  placeholder: string;
  /**
   * Function to trigger when value changes
   */
  onChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  /**
   * Function to trigger when user searches
   */
  onSearch: () => void;
  /**
   * Function to trigger when user deletes input by clicking on red x button
   */
  onCancel: () => void;
}

export type { IInputProps };
