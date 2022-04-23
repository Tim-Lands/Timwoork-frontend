import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function UploadImageForm({ src, validationsErrors, setPicture }: any) {
    const [imgData, setImgData] = useState(src);

    const onChangePicture = (e: any) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    };
    return (
        <div className="login-panel update-form">
            <div className={"panel-modal-body login-panel-body auto-height"}>
                <div className="avatar-uploader image-identifie">
                    <img width={110} height={110} src={imgData} />
                    <input id="profilePic" type="file" multiple onChange={onChangePicture} />
                    <button className="upload-btn">
                        <span className="material-icons material-icons-outlined">file_upload</span>
                    </button>
                </div>
            </div>
            {validationsErrors &&
                <div style={{ overflow: 'hidden' }}>
                    <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="app-form-note form-note-error">
                        <p className="text">{validationsErrors}</p>
                    </motion.div>
                </div>}
        </div>
    );
}
UploadImageForm.propTypes = {
    src: PropTypes.string,
    validationsErrors: PropTypes.any,
    picture: PropTypes.any,
    setPicture: PropTypes.func,
};