import TimeAgo from "react-timeago";
import fr from "react-timeago/lib/language-strings/fr";
import en from "react-timeago/lib/language-strings/en";
import ar from "react-timeago/lib/language-strings/ar";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useAppSelector } from "@/store/hooks";
import PropTypes from "prop-types";

export default function LastSeen({ date }) {
  const language = useAppSelector((state) => state.languages.language);

  const formatter = buildFormatter(which(language));

  return <span>{<TimeAgo date={date} formatter={formatter} />}</span>;
}

const which = (language) => {
  switch (language) {
    case "ar":
      return ar;
    case "en":
      return en;
    case "fr":
      return fr;
  }
};

LastSeen.propTypes = {
  date: PropTypes.any,
};
