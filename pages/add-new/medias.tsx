import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import API from '../../config';
import 'rsuite/dist/rsuite.min.css';
import router from 'next/router';
import SidebarAdvices from './SidebarAdvices';
import ImgCrop from 'antd-img-crop';
import { Upload, message } from 'antd';
import 'antd/dist/antd.css';

function Medias() {
    const [fileList, setFileList]: any = useState([
        {
            uid: '-1',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);

        if (imgWindow) {
            imgWindow.document.write(image.outerHTML);
        } else {
            window.location.href = src;
        }
    };
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
    const [GetMainCategories, setMainCategories] = useState([])
    const [isError, setIsError] = useState(false)
    const getCategories = async () => {
        try {
            const res: any = await API.get('dashboard/categories')
            if (res) {
                setMainCategories(res.data.data)
                setIsError(false)
                console.log(res.data.data);
            }
        } catch (error) {
            setIsError(true)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
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
                                <h3 className="title">المرحلة الأولى</h3>
                                <h3 className="text">معلومات عامة</h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="title">المرحلة الثانية</h3>
                                <h3 className="text">السعر والتطويرات</h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="title">المرحلة الثالثة</h3>
                                <h3 className="text">الوصف وتعليمات المشتري</h3>
                            </div>
                            <div className="timlands-step-item active">
                                <h3 className="title">المرحلة الرابعة</h3>
                                <h3 className="text">مكتبة الصور والملفات</h3>
                            </div>
                            <div className="timlands-step-item">
                                <h3 className="title">المرحلة الخامسة</h3>
                                <h3 className="text">نشر الخدمة</h3>
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

                        <div className="timlands-content-form">
                            <div className="choose-images-file">
                                <h4 className="timlands-content-form-subtitle">
                                    اختيار الصور
                                </h4>
                                <ImgCrop grid aspect={100 / 38} quality={0.7} modalWidth={500}>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                    >
                                        {fileList.length < 5 && '+ رفع'}
                                    </Upload>
                                </ImgCrop>
                            </div>
                            <div className="choose-images-file">
                                <h4 className="timlands-content-form-subtitle">
                                    اختيار ملف PDF
                                </h4>
                                <Upload {...props}>
                                    <button >Upload png only</button>
                                </Upload>
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
