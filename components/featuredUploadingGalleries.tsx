import { ReactElement, useState } from "react";
import { Spin } from 'antd';
import PropTypes from "prop-types";
import ImageUploading from 'react-images-uploading';

function FeaturedUploadingGalleries({ full_path_thumbnail, setImage, setIsChanged }): ReactElement {
    const [featuredImages, setFeaturedImages]: any = useState([
        {
            data_url: full_path_thumbnail
        }
    ]); 

    const onChangeFeatured = (imageListc) => {
        // data for submit
        console.log(featuredImages)
        setFeaturedImages(imageListc);
        setImage(imageListc)
        setIsChanged(true)
        console.log(featuredImages)
    };
    return (
        <div className="choose-images-file">
            <div className="choose-images-list">
                <div className={"panel-modal-body login-panel-body auto-height"}>
                    <div className="row">
                        <div className="col-md-12 align-center">
                            <div className="images-list-uploading">
                                <div className="page-header">
                                    <h4 className="title" style={{ fontSize: 20 }}>الصورة البارزة</h4>
                                </div>
                                <p className="text-note mt-3" style={{ color: '#555', margin: 0, fontSize: 13 }}>يجب أن تكون الصورة البارزة واضحة وبجودة واضحة تعكس محتوى الخدمة</p>
                                <p className="text-resolotion" style={{ color: '#222', margin: 0, fontSize: 13, fontWeight: 'bold' }}>من الأفضل أن تكون الأبعاد: 755X418</p>
                                <ImageUploading
                                    value={featuredImages}
                                    onChange={onChangeFeatured}
                                    maxNumber={1}
                                    dataURLKey="data_url"

                                >
                                    {({
                                        imageList,
                                        onImageUpdate,
                                    }) => (
                                        // write your building UI
                                        <Spin spinning={false}>
                                            <div className="upload__image-wrapper">

                                                {imageList && imageList.map((image, index) => (
                                                    <div className="p-0" key={index}>
                                                        <div className="image-item featured-wrapper" style={{ height: 140, backgroundImage: `url(${image['data_url']})`, backgroundSize: 'cover' }}>

                                                            <div className="image-item__btn-wrapper">
                                                                <button
                                                                    type='button'
                                                                    onClick={() => onImageUpdate(index)}>
                                                                    <span className="material-icons-outlined">backup</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* {featuredProgress !== 0 && <Progress percent={featuredProgress} />} */}
                                                {imageList.length == 0 && <div className='nothing-images'>
                                                    <h4 className="nothing-title">
                                                        اختر الصورة البارزة
                                                    </h4>
                                                    <p className="nothing-text">
                                                        يجب أن تختار الصورة البارزة للخدمة ويجب ان تكون الصورة متناسقة مع محتوى الخدمة
                                                    </p>
                                                </div>}
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

export default FeaturedUploadingGalleries
FeaturedUploadingGalleries.propTypes = {
    full_path_thumbnail: PropTypes.any,
    setImage:PropTypes.func,
    setIsChanged:PropTypes.func
};