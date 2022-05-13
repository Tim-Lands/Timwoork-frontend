import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie'
import API from "../../config";
import router from 'next/router';
import { message, notification } from 'antd';
import ReactPlayer from "react-player"
import PropTypes from "prop-types";
import cookies from 'next-cookies'
import { MetaTags } from '@/components/SEO/MetaTags';
import useSWR from 'swr';
import { Alert } from '@/components/Alert/Alert';
import { CloseCircleOutlined } from '@ant-design/icons'
import ImagesUploadingGalleries from '@/components/ImagesUploadingGalleries';
import FeaturedUploadingGalleries from '@/components/featuredUploadingGalleries';
import RemoveImageModal from '@/components/removeImageModal';
import Link from 'next/link'

function Medias({ query, stars }) {
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [featuredMedia, setFeaturedImages]: any = useState(stars.data.full_path_thumbnail);
    const [galleryMedia, setGalleryMedia]: any = useState(stars.data.galaries)
    const [isGalleryChanged, setIsGalleryChanged]: any = useState(false)
    const [isFeaturedChanged, setIsFeaturedChanged]: any = useState(false)
    const [isRemoveModal, setIsRemoveModal]: any = useState(false)
    const [removedImage, setRemovedImage]: any = useState({ id: -1, index: -1 });
    const [removedImages, setRemovedImages] = useState([]);
    console.log(galleryMedia);
    let token = Cookies.get('token')
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem('token');
    const id = query.id
    const { data: userInfo }: any = useSWR('api/me')
    const veriedEmail = userInfo && userInfo.user_details.email_verified_at
    async function getProductId() {
        try {
            const res: any = await API.get(`api/my_products/product/${query.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                console.log(true)
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                router.push("/add-new")
            }
            if (error.response && error.response.status === 404) {
                router.push("/add-new")
            }
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
            return
        }
        getProductId()
    }, [])
    console.log(query)
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const [url_video, setVideourl] = useState('')
    const [temp_url_video, setTempUrlVideo] = useState('')
    const timer = useRef(null);
    const handleSetVideourl = () => {
        setVideourl(temp_url_video)
    }
    const handleChangeVideoUrl = e => {
        console.log(e.target.value)
        setTempUrlVideo(e.target.value)
    }
    useEffect(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(handleSetVideourl, 1000)
    }, [temp_url_video])
    const [loading, setLoading] = useState(false);
    function setValidationsErrorsHandle() {
        setValidationsErrors({})
        setValidationsGeneral({})
    }
    const loadFeatureImage: any = async () => {
        const imageFeature = new FormData();
        imageFeature.append('thumbnail', featuredMedia[0].file)
        imageFeature.append('url_video', url_video)
        const res = await API.post(`api/product/${id}/upload-thumbnail-step-four`, imageFeature,
            {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
        return res;
    }

    const loadGalleryImages: any = async () => {
        const galleries = new FormData();
        galleryMedia.map((e: any) => (
            e.file && galleries.append('images[]', e.file)
        ))
        //galleries.append('images[]', images)
        const res: any = await API.post(`api/product/${id}/upload-galaries-step-four`, galleries, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    }

    const loadVideoUrl: any = async () => {
        try {
            const res = await API.post(`api/product/${id}/product-step-four`, { url_video: url_video },
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                })
            return res;
        }
        catch (e) {
            console.log('')
        }
    }
    const loadImagesHandle = async () => {
        setLoading(true)
        setValidationsErrorsHandle()
        console.log(validationsErrors)
        console.log(galleryMedia);
        console.log(featuredMedia)
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i');
        if (isGalleryChanged && galleryMedia.size <= 0) {
            notification.open({
                message: 'حدث خطأ',
                description: 'برجاء وضع صورة على الأقل في المعرض',
                icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
            });
            setLoading(false)

            return
        }

        if (isFeaturedChanged && !(featuredMedia instanceof Array)) {
            notification.open({
                message: 'حدث خطأ',
                description: 'برجاء وضع صورة بارزة',
                icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
            });
            setLoading(false)

            return
        }
        if (url_video.length > 0 && !pattern.test(url_video)) {
            notification.open({
                message: 'حدث خطأ',
                description: 'برجاء وضع عنوان صالح',
                icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
            });
            setLoading(false)

            return

        }

        try {
            if (isFeaturedChanged && isGalleryChanged)
                await uploadImages()
            else if (isFeaturedChanged)
                await uploadFeatured()
            else if (isGalleryChanged)
                await uploadGallery()
            else
                await uploadVideoUrl()
            await sendRemoveRequest()

        } catch (error: any) {
            setLoading(false)
            console.log(error.response)
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationsErrors(error.response.data.errors);
            }
            if (error.response && error.response.data) {
                setValidationsGeneral(error.response.data);
            }
            if (validationsErrors && validationsErrors.thumbnail) {
                notification.open({
                    message: 'حدث خطأ',
                    description: validationsErrors.thumbnail[0],
                    icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
                });
            }
        }
    }
    const uploadImages = async () => {
        const [res1, res2] = await Promise.all([loadFeatureImage(), loadGalleryImages(), loadVideoUrl()])
        // Authentication was successful.
        if (res1.status === 200 && res2.status === 200) {
            setLoading(false)
            message.success('لقد تم تحديث بنجاح')

        }
    }
    const uploadFeatured = async () => {
        const [res] = await Promise.all([loadFeatureImage(), loadVideoUrl()])
        // Authentication was successful.
        if (res.status === 200) {
            setLoading(false)
            message.success('لقد تم تحديث بنجاح')
        }
    }
    const uploadGallery = async () => {
        const [res] = await Promise.all([loadGalleryImages(), loadVideoUrl()])
        // Authentication was successful.
        if (res.status === 200) {
            setLoading(false)
            message.success('لقد تم تحديث بنجاح')
        }
    }
    const uploadVideoUrl = async () => {
        const res = await loadVideoUrl();
        if (res.status === 200) {
            setLoading(false)
            message.success('لقد تم تحديث بنجاح')
        }
    }

    const removeImage = async (image, index) => {
        console.log(image)
        setIsRemoveModal(true);
        setRemovedImage({ id: image.id, index });

    }
    const onRemoveSubmit = async (image_id, index) => {
        if (image_id) {
            setRemovedImages([...removedImages, image_id])
            setGalleryMedia(galleryMedia.filter(media => media.id !== image_id))

        }
        else {
            console.log(index)
            const temp_arr = galleryMedia;
            temp_arr.splice(index, 1);
            setGalleryMedia(temp_arr)
        }
        setIsRemoveModal(false)


    }

    const sendRemoveRequest = async () => {
        try {
            const promises = removedImages.map(img => API.post(`api/product/${query.id}/delete_galary`,
                { id: img },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }))
            await Promise.all(promises)
        }
        catch (error) {
            console.log(error.response)
            notification.open({
                message: 'حدث خطأ',
                icon: <CloseCircleOutlined style={{ color: '#c21c1c' }} />,
            });

        }
    }
    return (
        <div className="container-fluid">
            <MetaTags
                title="إضافة خدمة جديدة - إضافة وسائط"
                metaDescription="اتصل بنا - تيموورك"
                ogDescription="اتصل بنا - تيموورك"
            />

            {token && veriedEmail &&
                <div className="row justify-content-md-center my-3">
                    <div className="col-md-7 pt-3">
                        {isRemoveModal && <div className="overlay-fixed">
                            <RemoveImageModal onSubmit={onRemoveSubmit} product_id={query.id} image_id={removedImage.id} index={removedImage.index} setIsRemoveModal={setIsRemoveModal} />
                        </div>}
                        {/* {getProduct && getProduct.data.galaries.map((item: any) => (
                            <img src={item['data_url']} alt="" width={200} height={100} />
                        ))} */}
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
                            {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                            <div className="row justify-content-md-center">
                                <div className="col-xl-10">
                                    <FeaturedUploadingGalleries setIsChanged={setIsFeaturedChanged} setImage={setFeaturedImages} full_path_thumbnail={featuredMedia || '/seo.png'} />
                                    <ImagesUploadingGalleries setIsChanged={setIsGalleryChanged} setGalleryMedia={setGalleryMedia} galaries={galleryMedia} callback={removeImage} />
                                    <div className="timlands-content-form mt-2">
                                        <div className="choose-images-file">
                                            <h4 className="timlands-content-form-subtitle">
                                                فيديو تعريفي للخدمة (اختياري)
                                            </h4>
                                            <div className="timlands-form">
                                                <label className="label-block" htmlFor="input-videourl">رابط الفيديو</label>
                                                <input
                                                    type="text"
                                                    id="input-videourl"
                                                    name="url_video"
                                                    onKeyUp={handleChangeVideoUrl}
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

                            <div className="col-md-12">
                                <div className="py-4 d-flex">
                                    <button onClick={() => router.back()} type="button" className="btn flex-center butt-green-out me-auto butt-xs">
                                        <span className="material-icons-outlined">chevron_right</span><span className="text">المرحلة السابقة</span>
                                        <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                                    </button>
                                    <button type="submit" disabled={loading} onClick={loadImagesHandle} className="btn flex-center butt-green ml-auto butt-sm">
                                        <span className="text">المرحلة التالية</span><span className="material-icons-outlined">chevron_left</span>
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

export async function getServerSideProps(ctx) {
    const token = cookies(ctx).token || ''
    const uriString = `api/my_products/product/${ctx.query.id}`
    // Fetch data from external API
    const res = await API.get(uriString, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return { props: { query: ctx.query, stars: res.data } }
}
export default Medias
Medias.propTypes = {
    query: PropTypes.any,
    stars: PropTypes.any,
};