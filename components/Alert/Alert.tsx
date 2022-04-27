/*
|--------------------------------------------------------------------------
| Alert components.
|--------------------------------------------------------------------------
|
| A collection of different alerts that can be used to notify the user about
| important events & state changes.
|
*/

import PropTypes from "prop-types";
import {ReactElement} from "react";

export function Alert({type, children, position}): ReactElement {
    // Determine the classes of the alert depending ong the type given as a prop.
    const alertType = (): string => {
        switch (type) {
            case "error":
                return "timlands-alert-error";
            case "warning":
                return "timlands-alert-warning";
            case "success":
                return "timlands-alert-success";
            case "primary":
                return "timlands-alert-primary";
            case "primary2":
                return "timlands-alert-primary2";
            default:
                return "timlands-alert-error";
        }
    };
    const alertPosition = (): string => {
        switch (position) {
            case "fixedTop":
                return "timlands-alert-fixed alert-top";
            case "fixedBottom":
                return "timlands-alert-fixed alert-bottom";
            default:
                return "";
        }
    };
    const alertTypeClasses: string = alertType();
    const alertPositionClasses: string = alertPosition();
    const classes = `timlands-alert ${alertTypeClasses} ${alertPositionClasses}`;

    // Returns statement.
    return (
        <div className={classes} role="alert">
           <p className="text"> {children}</p>
        </div>
    );
}

Alert.propTypes = {
    children: PropTypes.any,
    type: PropTypes.string.isRequired,
    position: PropTypes.string,
};
