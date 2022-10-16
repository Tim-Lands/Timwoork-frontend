import PropTypes from "prop-types";
import { ReactElement } from "react";

import { useAppSelector } from "@/store/hooks";
function Loading({ size }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className={`page-loading-spinner ${size}`}>
      <div className="inner">
        <div
          className="spinner-border"
          style={{ width: 50, height: 50 }}
          role="status"
        >
          <span className="visually-hidden">{getAll("Loading")}</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
Loading.propTypes = {
  size: PropTypes.string,
};
