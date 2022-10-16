import { ReactElement, useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { Spin } from "antd";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";

function ImagesUploadingGalleries({
  galaries,
  setGalleryMedia,
  setIsChanged,
  callback,
}): ReactElement {
  const [images, setImages] = useState(galaries);
  const maxNumber = 5;
  const { getAll } = useAppSelector((state) => state.languages);
  useEffect(() => {
    setImages(galaries);
  }, [galaries]);
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    setGalleryMedia(imageList);
    setIsChanged(true);
  };

  const removeImage = async (image, index) => {
    await callback(image, index);
  };
  return (
    <div className="choose-images-file">
      <div className="choose-images-list">
        <div className={"panel-modal-body login-panel-body auto-height"}>
          <div className="images-list-uploading align-center">
            <div className="page-header">
              <h4 className="title" style={{ fontSize: 20 }}>
                {getAll("Gallery")}
              </h4>
            </div>

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                //onImageRemoveAll,
                //onImageUpdate,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <Spin spinning={false}>
                  <div className="upload__image-wrapper">
                    {/* <Progress percent={imageProgress} /> */}
                    <div className="pb-2">
                      {imageList.length < 5 && (
                        <button
                          type="button"
                          className="btn butt-primary2 butt-sm"
                          style={isDragging ? { color: "red" } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          {getAll("You_can_choose")}
                        </button>
                      )}
                      &nbsp;
                      {/* {imageList.length !== 0 && <button type='button' className='btn butt-red-out butt-sm' onClick={onImageRemoveAll}>تفريغ الصور</button>} */}
                    </div>
                    {imageList.length == 0 && (
                      <div className="nothing-images">
                        <h4 className="nothing-title">
                          {getAll("Choose_pictures_from")}
                        </h4>
                        <p className="nothing-text">
                          {getAll("You_must_choose")}
                        </p>
                      </div>
                    )}
                    {imageList &&
                      imageList.map((image, index) => (
                        <div
                          className="image-item"
                          key={index}
                          style={{
                            backgroundImage: `url(${image["data_url"]})`,
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="image-item__btn-wrapper">
                            <button
                              type="button"
                              onClick={() => removeImage(image, index)}
                            >
                              <span className="material-icons-outlined">
                                clear
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </Spin>
              )}
            </ImageUploading>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesUploadingGalleries;
ImagesUploadingGalleries.propTypes = {
  galaries: PropTypes.any,
  setGalleryMedia: PropTypes.func,
  setIsChanged: PropTypes.func,
  callback: PropTypes.func,
};
