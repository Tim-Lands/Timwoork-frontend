import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function UploadImageForm({validationsErrors, setPicture }: any) {
    //const [imgData, setImgData] = useState(src);
    const [images, setImages] = useState([])
    const [imagesData, setImagesData] = useState([]);
    const onChangePicture = (e: any) => {
        if (e.target.files[0]) {
            setPicture([...images,e.target.files[e.target.files.length-1]]);
            setImages([...images, e.target.files[e.target.files.length-1]])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImagesData([...imagesData,reader.result]);
            
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    };

    const clearImages=()=>{
        setPicture([])
        setImages([])
        setImagesData([])
    }
    return (
        <div className="login-panel update-form">
            <div className={"panel-modal-body login-panel-body auto-height"}>
            <button onClick={clearImages}>clear</button>
                <div className="avatar-uploader image-identifie">
                    <img width={110} height={110} src={imagesData[0]} />
                    <input id="profilePic" type="file" multiple onChange={onChangePicture} />
                    <button className="upload-btn">
                        <span className="material-icons material-icons-outlined">file_upload</span>
                    </button>
                </div>
                {imagesData.slice(1).map((image,index)=><img width={110} src={image} key={index}/>)}

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