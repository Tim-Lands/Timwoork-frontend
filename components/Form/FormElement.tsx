/*
|--------------------------------------------------------------------------
| Form Element components.
|--------------------------------------------------------------------------
|
| A collection of form elements ready to plug in to other compents.
| They all have error messages ready to be displayed.
|
*/
import PropTypes from "prop-types";
import {ReactElement} from "react";
import { motion } from "framer-motion";

/**
 * Text input field.
 *
 * @param {object} props
 *   The props object.
 */
 export function TextInput(props: any): ReactElement {
    
    const formClasses: string = `timlands-form ${props.errorMsg ? "form-error" : ""}`;
    const inputClasses: string = `timlands-input ${props.errorMsg ? "has-error" : ""}`;
    const noteClasses: string = `timlands-form-note form-note-error`;

    // Return statement.
    return (
        <div className={formClasses}>
            <label className="label-block" htmlFor={props.idName}>{props.title}</label>
            <input
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                id={props.idName}
                name={props.name}
                placeholder={props.placeholder || ""}
                className={inputClasses}
            />
            {/* Shor error message if given. */}
            {props.errorMsg && (
                <div style={{ overflow: 'hidden' }}>
                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={noteClasses}>
                        <p className="text">{props.errorMsg}</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
TextInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    idName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};
/**
 * Textarea input field.
 *
 * @param {object} props
 *   The props object.
 */
export function TextArea(props: any): ReactElement {
    const formClasses: string = `timlands-form ${props.errorMsg ? "form-error" : ""}`;
    const inputClasses: string = `timlands-input ${props.errorMsg ? "has-error" : ""}`;
    const noteClasses: string = `timlands-form-note form-note-error`;
    
    return (
        <div className={formClasses}>
            <label htmlFor={props.idName}>{props.title}</label>

            <textarea
                name={props.name}
                rows={3}
                id={props.idName}
                placeholder={props.placeholder}
                onChange={props.onChange}
                cols={50}
                className={inputClasses}
            >
                {props.value}
            </textarea>
            {props.errorMsg && (
                <div className={noteClasses}>
                    <p className="text">{props.errorMsg}</p>
                </div>
            )}
        </div>
    );
}
TextArea.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    errorMsg: PropTypes.string,
};
