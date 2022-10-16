import PropTypes from "prop-types";
import { ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";

export function SmallSpinner(props: any): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  return props.show ? (
    <div className="spinner-border spinner-border-sm text-light" role="status">
      {" "}
      <span className="visually-hidden">{getAll("Loading")}</span>{" "}
    </div>
  ) : (
    <span></span>
  );
}
SmallSpinner.propTypes = {
  show: PropTypes.bool.isRequired,
};
