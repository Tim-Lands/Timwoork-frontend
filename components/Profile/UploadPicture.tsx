import API from "../../config";
import { useState } from "react";
import { Progress } from "antd";
import PropTypes from "prop-types";

export default function UploadPicture({ token, avatarPicture }) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(avatarPicture);
    const [imageProgress, setImageProgress] = useState(0);

    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onUploadPicture = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            onUploadProgress: uploadEvent => {
                setImageProgress(Math.round(uploadEvent.loaded / uploadEvent.total * 100))
            }
        }
        const fd: any = new FormData()
        fd.append('avatar', picture)
        fd.append('steps', 2)
        API.post('https://api.icoursat.com/api/profiles/step_two', fd, config)
            .then(res => {
                console.log(res);

            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="login-panel update-form">
            <div className={"panel-modal-body login-panel-body auto-height"}>
                {imageProgress !== 0 && <Progress percent={imageProgress} />}
                <div className="avatar-uploader">
                    <input id="profilePic" type="file" onChange={onChangePicture} />
                    <img className="playerProfilePic_home_tile" src={imgData} />
                    <button className="upload-btn">
                        <span className="material-icons material-icons-outlined">file_upload</span>
                    </button>
                </div>
                <div className="flex-center-just mt-2">
                    <button className="btn butt-md butt-primary" onClick={onUploadPicture}>رفع الآن</button>
                </div>
            </div>
        </div>
    );
}
UploadPicture.propTypes = {
    token: PropTypes.string,
    avatarPicture: PropTypes.string,
};