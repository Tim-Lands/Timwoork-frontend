import API from "../../config";
import { useState } from "react";
import { message, Progress } from "antd";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import router from "next/router";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

export default function UploadPicture({ token, avatarPicture }) {
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(avatarPicture);
  const [imageProgress, setImageProgress] = useState(0);

  const onChangePicture = (e) => {
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
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (uploadEvent) => {
        setImageProgress(
          Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
        );
      },
    };
    const fd: any = new FormData();
    fd.append("avatar", picture);
    fd.append("steps", 2);
    API.post("https://api.timwoork.com/api/profiles/step_two", fd, config)
      .then(() => {
        message.success(getAll("The_profile_picture"));
        router.reload();
      })
      .catch(() => {});
  };
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();

  return (
    <div className="login-panel update-form">
      <div className={"panel-modal-body login-panel-body auto-height"}>
        {imageProgress !== 0 && <Progress percent={imageProgress} />}
        <div className="avatar-uploader">
          <input id="profilePic" type="file" onChange={onChangePicture} />
          <img className="playerProfilePic_home_tile" src={imgData} />
          <button className="upload-btn">
            <span className="material-icons material-icons-outlined">
              file_upload
            </span>
          </button>
        </div>
        {(picture !== null || undefined) && (
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-center-just mt-2"
          >
            <button
              className="btn butt-md butt-primary"
              onClick={onUploadPicture}
            >
              {getAll("Upload")}
            </button>
          </motion.div>
        )}
        <p
          className="note"
          style={{
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {getAll("profile_photo")}
        </p>
      </div>
    </div>
  );
}
UploadPicture.propTypes = {
  token: PropTypes.string,
  avatarPicture: PropTypes.string,
};
