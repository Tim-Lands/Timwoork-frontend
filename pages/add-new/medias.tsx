import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import Cookies from 'js-cookie'
import ImageLogo from "next/image";
import API from "../../config";
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { Upload, message } from 'antd';
import useSWR from 'swr'
import ReactPlayer from "react-player"
import 'antd/dist/antd.css';
import PropTypes from "prop-types";

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

    const [thumbnail, setThumbnail]: any = useState(null);
    const [thumbnail2, setThumbnail2]: any = useState(null);
    const [thumbnail3, setThumbnail3]: any = useState(null);
    
    const setThumbnailHandle = (e: any) => {
        setThumbnail(e.target.files[0]);
    }
    const setThumbnailHandle2 = (e: any) => {
        setThumbnail2(e.target.files[0]);
    }
    const setThumbnailHandle3 = (e: any) => {
        setThumbnail3(e.target.files[0]);
    }
    const loadImagesHandle = async () => {
        try {
            const datathumb = new FormData()
            datathumb.append('url_video', url_video)
            datathumb.append('images[]', thumbnail2)
            datathumb.append('images[]', thumbnail)
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
                message.success('لقد تم التحديث بنجاح')
            }
        } catch (error: any) {
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
                                    <button onClick={() => router.back()} type="button" className="btn flex-center butt-green-out mr-auto butt-xs">
                                        <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                    <button type="submit" onClick={loadImagesHandle} className="btn flex-center butt-green mr-auto butt-xs">
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
                                                {getProduct && getProduct.data.thumbnail == null ?
                                                    <ImageLogo src={thumbnail3} width={400} height={250} /> :
                                                    <ImageLogo
                                                        loader={myLoader}
                                                        src={APIURL1 + (getProduct && getProduct.data.thumbnail)}
                                                        quality={60}
                                                        width={400}
                                                        height={250}
                                                        placeholder='blur'
                                                        blurDataURL={APIURL1 + (getProduct && getProduct.data.thumbnail)}
                                                    />
                                                }
                                                <h3 className="texth">
                                                    <span className="material-icons-outlined">cloud_upload</span>
                                                   <span className='txt'> رفع الصورة البارزة</span>
                                                </h3>
                                                <div className="overlay-upload">
                                                    <span className='upload-butt'>
                                                        
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={
                                                        (e: any) => {
                                                            setThumbnailHandle3
                                                            setThumbnail3(URL.createObjectURL(e.target.files[0]))
                                                        }
                                                    }
                                                    type="file"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="timlands-form">
                                                <input
                                                    onChange={setThumbnailHandle}
                                                    type="file"
                                                    className="form-control"
                                                />
                                                <input
                                                    onChange={setThumbnailHandle2}
                                                    type="file"
                                                    className="form-control"
                                                />
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