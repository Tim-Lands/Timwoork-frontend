import { ReactElement, useState } from "react";
import { Spin } from 'antd';
import PropTypes from "prop-types";
import ImageUploading from 'react-images-uploading';

function ImagesUploadingGalleries({ galaries }): ReactElement {
    const [images, setImages] = useState(galaries);
    const maxNumber = 5;

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
    }
    return (
        <div className="choose-images-file">
            <div className="choose-images-list">
                <div className={"panel-modal-body login-panel-body auto-height"}>
                    <div className="row">
                        <div className="col-md-12 align-center">
                            <div className="images-list-uploading">
                                <div className="page-header">
                                    <h4 className="title" style={{ fontSize: 20 }}>معرض الصور</h4>
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
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <Spin spinning={false}>
                                            <div className="upload__image-wrapper">
                                                {/* <Progress percent={imageProgress} /> */}
                                                <div className="pb-2">

                                                    {imageList.length < 5 && <button type='button' className='btn butt-primary2 butt-sm'
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                    >
                                                        يمكنك الاختيار من جهازك
                                                    </button>}
                                                    &nbsp;
                                                    {imageList.length !== 0 && <button type='button' className='btn butt-red-out butt-sm' onClick={onImageRemoveAll}>تفريغ الصور</button>}

                                                </div>
                                                {imageList.length == 0 && <div className='nothing-images'>
                                                    <h4 className="nothing-title">
                                                        اختر صور من جهازك
                                                    </h4>
                                                    <p className="nothing-text">
                                                        يجب أن تختار على الأقل صورة في معرض الخدمة ويجب ان تكون الصور مناسبة من الخدمة
                                                    </p>
                                                </div>}
                                                <div className="row">
                                                    {imageList && imageList.map((image, index) => (

                                                        <div className="col-sm-6" key={index}>
                                                            <div className="image-item" style={{ backgroundImage: `url(${image['data_url']})`, backgroundSize: 'cover' }}>
                                                                <div className="image-item__btn-wrapper">
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => onImageUpdate(index)}>
                                                                        <span className="material-icons-outlined">edit</span>
                                                                    </button>
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => onImageRemove(index)}>
                                                                        <span className="material-icons-outlined">clear</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Spin>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagesUploadingGalleries
ImagesUploadingGalleries.propTypes = {
    galaries: PropTypes.any,
};