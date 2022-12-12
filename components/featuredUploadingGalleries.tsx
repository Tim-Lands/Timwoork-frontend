import { ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Spin } from "antd";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { useAppSelector } from "@/store/hooks";

function FeaturedUploadingGalleries({
  full_path_thumbnail,
  setImage,
  setIsChanged,
  validationsErrors = "",
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const [featuredImages, setFeaturedImages]: any = useState([
    {
      data_url: full_path_thumbnail,
    },
  ]);
  useEffect(() => {
    if (full_path_thumbnail)
      setFeaturedImages([{ data_url: full_path_thumbnail }]);
  }, [full_path_thumbnail]);
  const onChangeFeatured = (imageListc) => {
    // data for submit
    setFeaturedImages(imageListc);
    setImage(imageListc);
    setIsChanged(true);
  };
  return (
    <div
      className={`choose-images-file ${validationsErrors ? "error" : ""}`}
      style={{ width: "100%" }}
    >
      <div className="choose-images-list">
        <div className={"panel-modal-body login-panel-body auto-height"}>
          <div className="images-list-uploading align-center">
            <div className="page-header">
              <h4 className="title" style={{ fontSize: 20 }}>
                {getAll("Profil_picture")}
              </h4>
            </div>
            <p
              className="text-note mt-3"
              style={{ color: "#555", margin: 0, fontSize: 13 }}
            >
              {getAll("The_profile_picture")}
            </p>
            <p
              className="text-resolotion"
              style={{
                color: "#222",
                margin: 0,
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {getAll("It’s_better_that")}
            </p>
            <ImageUploading
              value={featuredImages}
              onChange={onChangeFeatured}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpdate }) => (
                // write your building UI
                <Spin spinning={false}>
                  <div className="upload__image-wrapper">
                    {imageList &&
                      imageList.map((image, index) => (
                        <div className="p-0" key={index}>
                          <div
                            className="image-item featured-wrapper"
                            style={{
                              backgroundImage: `url(${image["data_url"]})`,
                              backgroundSize: "cover",
                            }}
                          >
                            <div className="image-item__btn-wrapper">
                              <button
                                type="button"
                                onClick={() => onImageUpdate(index)}
                              >
                                <span className="material-icons-outlined">
                                  backup
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* {featuredProgress !== 0 && <Progress percent={featuredProgress} />} */}
                    {imageList.length == 0 && (
                      <div className="nothing-images">
                        <h4 className="nothing-title">
                          {getAll("Choose_a_profile")}
                        </h4>
                        <p className="nothing-text">
                          {getAll("You_must_choose")}
                        </p>
                      </div>
                    )}
                  </div>
                </Spin>
              )}
            </ImageUploading>
            {validationsErrors && (
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="timlands-form-note form-note-error"
                >
                  <p className="text">{validationsErrors}</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedUploadingGalleries;
FeaturedUploadingGalleries.propTypes = {
  full_path_thumbnail: PropTypes.any,
  setImage: PropTypes.func,
  setIsChanged: PropTypes.func,
  validationsErrors: PropTypes.string,
};
