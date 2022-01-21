import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import API from "../../config";
import ImageUploading from "react-images-uploading";
import { motion } from 'framer-motion';
import router from 'next/router';
import { message } from 'antd';
import useSWR, { mutate } from 'swr'
import ReactPlayer from "react-player"
import PropTypes from "prop-types";
import { Alert } from '@/components/Alert/Alert';
import Link from 'next/link'

function Medias({ query }) {
    const id = query.id
    const token = Cookies.get('token')
    const { data: getUser }: any = useSWR('api/me')
    const { data: getProduct }: any = useSWR(`api/product/${query.id}`)
    async function getProductId() {
        try {
            const res: any = await API.get(`api/my_products/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 422) {
                router.back()
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                router.back()
            }
        }
    }
    async function stepFive() {
        try {
            const res = await API.post(`api/product/${query.id}/product-step-five`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                console.log('success');
                
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع');
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        getProductId()
        if (getProduct && getUser) {
            if (getProduct.profile_seller_id !== getUser.id) {
                router.push('/add-new')
            }
        }
    }, [])
    const [url_video, setVideourl] = useState('')
    const handleSetVideourl = (e: any) => {
        setVideourl(e.target.value)
    }
    const [thumbnailImage, setThumbnailImage]: any = useState([]);
    const onChangeThumbnailImage = (imageList) => {
        // data for submit
        setThumbnailImage(imageList);
    };
    const [images, setImages]: any = useState([]);
    const maxNumber = 69;
    const onChangeL = (imageList) => {
        // data for submit
        console.log(images.map(e => (e.file)))
        setImages(imageList);
    };
    const [loading, setLoading] = useState(false);
    const loadImagesHandle = async () => {
        setLoading(true)
        try {
            const datathumb = new FormData()
            images.map(e => (
                datathumb.append('thumbnail', e.file)
            ))
            thumbnailImage.map(e => (
                datathumb.append('images[]', e.file)
            ))
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
                stepFive()
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

    return (
        <div className="container-fluid">
            {token &&
                <div className="row justify-content-md-center">
                    <div className="col-md-8 pt-3">
                        <div className={"timlands-panel" + (loading ? ' is-loader' : '')}>
                            <div className="timlands-steps">
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <Link href={`/edit-product/overview?id=${id}`}>
                                            <a>
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">collections_bookmark</span>
                                                </span>
                                                معلومات عامة
                                            </a>
                                        </Link>
                                    </h3>
                                </div>
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <Link href={`/edit-product/prices?id=${id}`}>
                                            <a>
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">payments</span>
                                                </span>
                                                السعر والتطويرات
                                            </a>
                                        </Link>
                                    </h3>
                                </div>
                                <div className="timlands-step-item">
                                    <h3 className="text">
                                        <Link href={`/edit-product/description?id=${id}`}>
                                            <a>
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">description</span>
                                                </span>
                                                الوصف وتعليمات المشتري
                                            </a>
                                        </Link>
                                    </h3>
                                </div>
                                <div className="timlands-step-item active">
                                    <h3 className="text">
                                        <Link href={`/edit-product/medias?id=${id}`}>
                                            <a>
                                                <span className="icon-circular">
                                                    <span className="material-icons material-icons-outlined">mms</span>
                                                </span>
                                                مكتبة الصور والملفات
                                            </a>
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                            <div className="timlands-panel-header mt-3">
                                <div className="flex-center">
                                    <h2 className="title"><span className="material-icons material-icons-outlined">mms</span>مكتبة الصور والملفات</h2>
                                    <div className={"header-butt"}>
                                        <button type="submit" disabled={loading} onClick={loadImagesHandle} className="btn flex-center butt-green mr-auto butt-xs">
                                            <span className="text">حفظ التغييرات</span>
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
                                                <div className="timlands-form">
                                                    <div className="page-header">
                                                        <h3 className="title">اختر الصورة البارزة</h3>
                                                    </div>
                                                    <ImageUploading
                                                        value={images}
                                                        onChange={onChangeL}
                                                        maxNumber={maxNumber}
                                                        dataURLKey="data_url"
                                                    >
                                                        {({
                                                            imageList,
                                                            onImageUpload,
                                                            onImageUpdate,
                                                            onImageRemove,
                                                            isDragging,
                                                            dragProps
                                                        }) => (
                                                            // write your building UI
                                                            <div className="choose-images-file featured-image">
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
                                                                    {(imageList.length && imageList.length >= 1) ? <Alert type='info'>يمكنك فقط إضافة صورة واحدة بارزة</Alert> :

                                                                        <button
                                                                            style={isDragging ? { color: "red" } : undefined}
                                                                            className="uploader-btn"
                                                                            onClick={onImageUpload}
                                                                            {...dragProps}
                                                                        >
                                                                            <span className="material-icons-outlined">upload</span>
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )}
                                                    </ImageUploading>
                                                </div>
                                                <div className="timlands-form">
                                                    <div className="page-header">
                                                        <h3 className="title">معرض الصور</h3>
                                                    </div>
                                                    <ImageUploading
                                                        multiple
                                                        value={thumbnailImage}
                                                        onChange={onChangeThumbnailImage}
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
                                                                    {(imageList.length && imageList.length >= 5) ? <Alert type="info"><p className="text">لايمكنك إضافة أكثر من 5 صور</p></Alert> :

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

                            <div className="col-md-12">
                                <div className="py-4 d-flex">
                                    <button type="submit" disabled={loading} className="btn flex-center butt-green ml-auto butt-sm">
                                        <span className="text">حفظ التغييرات</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
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