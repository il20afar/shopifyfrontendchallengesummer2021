// [IMPORTS]
/* folder */
import "./InfoFieldContainer.scss";
import { IInfoFieldContainerProps } from "./IInfoFieldContainerProps";

// [FUNCTIONAL COMPONENTS]
const InfoFieldContainer = (props: IInfoFieldContainerProps) => {
  const { title, children } = props;
  return (
    <div className="component_il20afar_info_field_container">
      <div className="info_field_title">{title}:</div>
      <a className="info_field_content" href={children}>
        {children}
      </a>
    </div>
  );
};

// [EXPORTS]
export default InfoFieldContainer;
