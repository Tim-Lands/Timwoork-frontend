import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie'
import API from "../../config";
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import { message, Progress } from 'antd';
import useSWR, { mutate } from 'swr'
import ReactPlayer from "react-player"
import PropTypes from "prop-types";
import useFileUpload from 'react-use-file-upload';
import Image from 'next/image'

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
                router.push("/add-new")
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
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
        if (getProduct && getUser) {
            if (getProduct.profile_seller_id !== getUser.id) {
                router.push('/add-new')
            }
        }
    }, [])
    const [imageProgress, setImageProgress] = useState(0);

    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        //handleDragDropEvent,
        clearAllFiles,
        //createFormData,
        setFiles,
        removeFile,
      } = useFileUpload();
    
      const inputRef: any = useRef();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const galleries = new FormData();
        files.map((file: any) =>
            galleries.append('images[]', file)
        )
        try {
          API.post(`api/product/${id}/upload-galaries-step-four`, galleries, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            onUploadProgress: uploadEvent => {
                setImageProgress(Math.round(uploadEvent.loaded / uploadEvent.total * 100))
            }
        });
        } catch (error) {
          console.error('Failed to submit files.');
        }
      };
    const [url_video, setVideourl] = useState('')
    const handleSetVideourl = (e: any) => {
        setVideourl(e.target.value)
    }
    const [loading, setLoading] = useState(false);
    const loadImagesHandle = async () => {
        setLoading(true)
        try {
            const res = await API.post(`api/product/${id}/product-step-four`, { url_video: url_video },
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

    return (
        <div className="container-fluid">
            {token &&
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
                            <div className="choose-images-file">
                                <div className="choose-images-list">
                                    <div className={"panel-modal-body login-panel-body auto-height"}>
                                        <div className="row">
                                            {getProduct && getProduct.galaries.map((e: any) => (
                                                <div className="col-sm-4" key={e.id}>
                                                    <Image src={e.full_path_galary} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 align-center">
                                                <div>
                                                    <h1>Upload Files</h1>
                                                    {imageProgress !== 0 && <Progress percent={imageProgress} />}
                                                    <p>Please use the form to your right to upload any file(s) of your choosing.</p>

                                                    <div className="form-container">
                                                        {/* Display the files to be uploaded */}
                                                        <div>
                                                            <ul>
                                                                {fileNames.map((name) => (
                                                                    <li key={name}>
                                                                        <span>{name}</span>

                                                                        <span onClick={() => removeFile(name)}>
                                                                            <i className="fa fa-times" />
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            {files.length > 0 && (
                                                                <ul>
                                                                    <li>File types found: {fileTypes.join(', ')}</li>
                                                                    <li>Total Size: {totalSize}</li>
                                                                    <li>Total Bytes: {totalSizeInBytes}</li>

                                                                    <li className="clear-all">
                                                                        <button onClick={() => clearAllFiles()}>Clear All</button>
                                                                    </li>
                                                                </ul>
                                                            )}
                                                        </div>

                                                        {/* Provide a drop zone and an alternative button inside it to upload files. */}
                                                        <div>
                                                            <p>Drag and drop files here</p>

                                                            <button onClick={() => inputRef.current.click()}>Or select files to upload</button>
                                                            {/* Hide the crappy looking default HTML input */}
                                                            <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e: any) => setFiles(e)} />
                                                        </div>
                                                    </div>

                                                    <div className="submit">
                                                        <button onClick={handleSubmit}>Submit</button>
                                                    </div>
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
export default Medias
Medias.getInitialProps = ({ query }) => {
    return { query }
}
Medias.propTypes = {
    query: PropTypes.any,
};