import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
//import API from '../../config';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { Upload, message } from 'antd';
import ReactPlayer from "react-player"
import 'antd/dist/antd.css';
import ImageUploading from "react-images-uploading";
import { Alert } from '@/components/Alert/Alert';
import { motion } from 'framer-motion';

function Medias() {
    const props = {
        beforeUpload: file => {
            if (file.type !== 'application/pdf') {
                message.error(`${file.name} is not a png file`);
            }
            return file.type === 'application/pdf' ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
            console.log(info.fileList);
        },
    };
    const [videourl, setVideourl] = useState('')
    const handleSetVideourl = (e: any) => {
        setVideourl(e.target.value)
    }
    // Image Upload

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChangeL = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <SidebarAdvices />
                </div>
                <div className="col-md-8 pt-3">
                    <div className={"timlands-panel"}>
                        <div className="timlands-steps">
                            <div className="timlands-step-item">
                                <h3 className="text">
                                    <span className="icon-circular">
                                        <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                    </span>
                                    معلومات عامة
                                </h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="text">
                                    <span className="icon-circular">
                                        <span className="material-icons material-icons-outlined">payments</span>
                                    </span>
                                    السعر والتطويرات
                                </h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="text">

                                    <span className="icon-circular">
                                        <span className="material-icons material-icons-outlined">description</span>
                                    </span>
                                    الوصف وتعليمات المشتري
                                </h3>
                            </div>
                            <div className="timlands-step-item active">
                                <h3 className="text">
                                    <span className="icon-circular">
                                        <span className="material-icons material-icons-outlined">mms</span>
                                    </span>
                                    مكتبة الصور والملفات
                                </h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="text">
                                    <span className="icon-circular">
                                        <span className="material-icons material-icons-outlined">publish</span>
                                    </span>
                                    نشر الخدمة
                                </h3>
                            </div>
                        </div>
                        <div className="timlands-panel-header mt-3">
                            <div className="flex-center">
                                <h2 className="title"><span className="material-icons material-icons-outlined">mms</span>مكتبة الصور والملفات</h2>
                                <div className={"header-butt"}>
                                    <button onClick={() => router.push('/add-new/description')} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
                                        <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                    <button type="submit" className="btn flex-center butt-green mr-auto butt-xs">
                                        <span className="text">المرحلة التالية</span><span className="material-icons-outlined">chevron_left</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChangeL}
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
                                dragProps
                            }) => (
                                // write your building UI
                                <div className="choose-images-file">
                                    <div className="choose-images-list d-flex">
                                        {imageList.map((image, index) => (
                                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="choose-images-item" key={index}>
                                                <div className="image-item">
                                                    <img src={image["data_url"]} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <button onClick={() => onImageUpdate(index)}>
                                                            <span className="material-icons-outlined">edit</span>
                                                        </button>
                                                        <button onClick={() => onImageRemove(index)}>
                                                            <span className="material-icons-outlined">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                        {(imageList.length && imageList.length >= 5) ? <Alert type="error"><p className="text">لايمكنك إضافة أكثر من 5 صور</p></Alert> :

                                            <button
                                                style={isDragging ? { color: "red" } : undefined}
                                                className="uploader-btn"
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <span className="material-icons-outlined">upload</span>
                                            </button>
                                        }
                                        &nbsp;
                                        <button className="uploader-btn clear" onClick={onImageRemoveAll}><span className="material-icons-outlined">clear</span></button>
                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                            <div className="images-btns-upload">
                                <div className="inner-div">
                                    <p className="note-text">
                                        يجب أن يكون حجم كل صورة أقل من <strong>1MB</strong>
                                    </p>
                                    <button type="submit" className="btn butt-sm butt-primary">
                                        تحميل الآن
                                    </button>
                                </div>
                            </div>
                        <div className="timlands-content-form">
                            <div className="choose-images-file">
                                <h4 className="timlands-content-form-subtitle">
                                    اختيار ملف PDF
                                </h4>
                                <Upload {...props}>
                                    <button className="btn butt-md butt-primary2">تحميل ملف PDF من جهازك</button>
                                </Upload>
                            </div>
                            <div className="choose-images-file">
                                <h4 className="timlands-content-form-subtitle">
                                    فيديو تعريفي للخدمة
                                </h4>
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-videourl">رابط الفيديو</label>
                                    <input
                                        type="text"
                                        id="input-videourl"
                                        name="videourl"
                                        value={videourl}
                                        onChange={handleSetVideourl}
                                        dir="ltr"
                                        placeholder="https://"
                                        className="timlands-inputs"
                                        autoComplete="off"
                                    />
                                    {videourl &&
                                        <ReactPlayer
                                            style={{ borderRadius: 6 }}
                                            width="100%"
                                            url={videourl}
                                        />
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Medias.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Medias
