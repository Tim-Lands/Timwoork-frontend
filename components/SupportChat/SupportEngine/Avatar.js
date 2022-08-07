import PropTypes from "prop-types";
import { styles } from "./styles";
import { LanguageContext } from "../contexts/languageContext/context";
import { useContext, useState } from "react";

const Avatar = ({ style, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div style={style}>
      <div
        className="transition-3"
        style={{
          ...styles.avatarHello,
          ...{ display: hovered ? "block" : "none" },
        }}
      >
        {getAll("Do_you_need")}
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick && onClick()}
        className="transition-3"
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "1px solid #FFFF00" : "4px solid #009d00" },
        }}
      />
    </div>
  );
};
Avatar.propTypes = {
  style: PropTypes.any,
  onClick: PropTypes.func,
};
export default Avatar;
