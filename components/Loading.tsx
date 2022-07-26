import PropTypes from "prop-types";
import { ReactElement } from "react";

function Loading({ size }): ReactElement {
  return (
    <div className={`page-loading-spinner ${size}`}>
      <div className="inner">
        <div
          className="spinner-border"
          style={{ width: 50, height: 50 }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
Loading.propTypes = {
  size: PropTypes.string,
};
