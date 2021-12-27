import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import Cookies from 'js-cookie'
import ImageLogo from "next/image";
import API from "../../config";
import ImageUploading from "react-images-uploading";
import { motion } from 'framer-motion';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { Upload, message } from 'antd';
import useSWR, { mutate } from 'swr'
import ReactPlayer from "react-player"
import 'antd/dist/antd.css';
import PropTypes from "prop-types";
import { Alert } from '@/components/Alert/Alert';
import Unauthorized from '@/components/Unauthorized';

function Medias({ query }) {
    const id = query.id
    const token = Cookies.get('token')
    const APIURL1 = 'http://api.timwoork.com/products/thumbnails/'
    //const APIURL2 = 'https://api.timwoork.com/products/galaries-images/'
    const { data: getProduct }: any = useSWR(`api/product/${query.id}`)
    const myLoader = () => {
        return `${APIURL1}${getProduct && getProduct.data.thumbnail}`;
    }
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
    const [url_video, setVideourl] = useState('')
    const handleSetVideourl = (e: any) => {
        setVideourl(e.target.value)
    }
    const [images, setImages]: any = useState([]);
    const maxNumber = 69;
    const onChangeL = (imageList) => {
        // data for submit
        setImages(imageList);
    };
    const [thumbnail3, setThumbnail3]: any = useState(null);
    const [loading, setLoading] = useState(false);

    const setThumbnailHandle3 = (e: any) => {
        setThumbnail3(e.target.files[0]);        
    }
    const loadImagesHandle = async () => {
        setLoading(true)
        try {
            const datathumb = new FormData()
            images.map(e => (
                datathumb.append('images[]', e.file)
            ))
            datathumb.append('thumbnail', thumbnail3)
            const res = await API.post(`api/product/${id}/product-step-four`, datathumb,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                })
            // Authentication was successful.
            if (res.status === 200) {
                setLoading(false)
                message.success('لقد تم التحديث بنجاح')
                mutate(`api/product/${query.id}`)
                router.push({
                    pathname: '/add-new/complete',
                    query: {
                        id: id, // pass the id 
                    },
                })
            }
        } catch (error: any) {
            setLoading(false)
            if (error.response && error.response.status === 200) {
                message.success('لقد تم التحديث بنجاح')
            }
            if (error.response && error.response.status === 422) {
                message.error("يرجى تعبئة البيانات")
            }
            if (error.response && error.response.status === 403) {
                message.error("هناك خطأ ما حدث في قاعدة بيانات , يرجى التأكد من ذلك")
            }
            if (error.response && error.response.status === 419) {
                message.error("العملية غير ناجحة")
            }
            if (error.response && error.response.status === 400) {
                message.error("حدث خطأ.. يرجى التأكد من البيانات")
            } else {
                message.error("حدث خطأ غير متوقع")
            }
        }
    }
    if (token == '') return <Unauthorized />
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <SidebarAdvices />
                </div>
                <div className="col-md-8 pt-3">
                    <div className={"timlands-panel" + (loading ? ' is-loader' : '')}>
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
                                    <button onClick={() => router.back()} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
                                        <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                    <button type="submit" disabled={loading} onClick={loadImagesHandle} className="btn flex-center butt-green mr-auto butt-xs">
                                        <span className="text">المرحلة التالية</span><span className="material-icons-outlined">chevron_left</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="choose-images-file">
                            <div className="choose-images-list">
                                <div className={"panel-modal-body login-panel-body auto-height"}>
                                    <div className="row">
                                        <div className="col-md-12 align-center">
                                            <div className="featured-image">
                                                <ImageLogo
                                                    loader={myLoader}
                                                    src={APIURL1 + (getProduct && getProduct.data.thumbnail)}
                                                    quality={60}
                                                    width={400}
                                                    height={250}
                                                    placeholder='blur'
                                                    blurDataURL={'/avatar2.png'}
                                                />
                                                <h3 className="texth">
                                                    رفع الصورة البارزة</h3>
                                                <div className="overlay-upload">
                                                    <span className='upload-butt'>

                                                    </span>
                                                </div>
                                                <input
                                                    onChange={setThumbnailHandle3}
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="timlands-form">
                                                <div className="page-header">
                                                    <h3 className="title">معرض الصور</h3>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="timlands-content-form">
                            <div className="choose-images-file">
                                <h4 className="timlands-content-form-subtitle">
                                    اختيار ملف PDF
                                </h4>
                                <Upload {...props} multiple={false}>
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
                                        name="url_video"
                                        value={url_video}
                                        onChange={handleSetVideourl}
                                        dir="ltr"
                                        placeholder="https://"
                                        className="timlands-inputs"
                                        autoComplete="off"
                                    />
                                    {url_video &&
                                        <ReactPlayer
                                            style={{ borderRadius: 6, overflow: 'hidden', marginTop: 6 }}
                                            width="100%"
                                            url={url_video}
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
Medias.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Medias
Medias.getInitialProps = ({ query }) => {
    return { query }
}
Medias.propTypes = {
    query: PropTypes.any,
};