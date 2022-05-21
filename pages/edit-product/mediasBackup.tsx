import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../../config";
import router from "next/router";
import { message, notification, Progress, Spin } from "antd";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import cookies from "next-cookies";
import { MetaTags } from "@/components/SEO/MetaTags";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

function Medias({ query, stars }) {
  const id = query.id;
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;

  async function getProductId() {
    try {
      const res: any = await API.get(`api/my_products/product/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        router.push("/add-new");
      }
      if (error.response && error.response.status === 404) {
        router.push("/add-new");
      }
    }
  }
  const [images, setImages] = useState(stars.data.galaries);
  const [featuredImages, setFeaturedImages]: any = useState([
    {
      data_url: stars.data.full_path_thumbnail,
    },
  ]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    getProductId();
  }, []);
  async function stepFive() {
    try {
      const res = await API.post(
        `api/product/${query.id}/product-step-five`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
      }
    } catch (error: any) {
      message.error("حدث خطأ غير متوقع");
    }
  }

  const [imageProgress, setImageProgress] = useState(0);
  const [featuredProgress, setFeaturedProgress] = useState(0);

  const [galariesLoading, seGalariesLoading] = useState(false);
  const [featuredLoading, seFeaturedLoading] = useState(false);

  const [galariesSuccess, seGalariesSuccess] = useState(false);
  const [featuredSuccess, seFeaturedSuccess] = useState(false);

  const maxNumber = 5;

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };
  const onChangeFeatured = (imageListc) => {
    // data for submit
    setFeaturedImages(imageListc);
  };

  const uploadGalleryHandle = async (e) => {
    e.preventDefault();
    seGalariesLoading(true);
    seGalariesSuccess(false);
    const galleries = new FormData();
    images.map((e: any) => galleries.append("images[]", e.file));
    //galleries.append('images[]', images)
    try {
      const res: any = await API.post(
        `api/product/${id}/upload-galaries-step-four`,
        galleries,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (uploadEvent) => {
            setImageProgress(
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
            );
          },
        }
      );
      if (res.status === 200) {
        notification["success"]({
          message: "إشعار",
          description: "لقد تم رفع الصور بنجاح",
        });
        seGalariesLoading(false);
        seGalariesSuccess(true);
      }
    } catch (error) {
      seGalariesLoading(false);
      seGalariesSuccess(false);
    }
  };
  const uploadFeaturedHandle = async (e) => {
    e.preventDefault();
    seFeaturedLoading(true);
    seFeaturedSuccess(false);
    const imageFeature = new FormData();
    featuredImages.map((e: any) => imageFeature.append("thumbnail", e.file));
    //galleries.append('images[]', images)
    try {
      const res: any = await API.post(
        `api/product/${id}/upload-thumbnail-step-four`,
        imageFeature,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (uploadEvent) => {
            setFeaturedProgress(
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
            );
          },
        }
      );
      if (res.status === 200) {
        notification["success"]({
          message: "إشعار",
          description: "لقد تم رفع الصور بنجاح",
        });
        seFeaturedLoading(false);
        seFeaturedSuccess(true);
      }
    } catch (error) {
      seFeaturedLoading(false);
      seFeaturedSuccess(false);
    }
  };
  const [url_video, setVideourl] = useState("");
  const handleSetVideourl = (e: any) => {
    setVideourl(e.target.value);
  };
  const [loading, setLoading] = useState(false);
  const loadImagesHandle = async () => {
    setLoading(true);
    try {
      const res = await API.post(
        `api/product/${id}/product-step-four`,
        { url_video: url_video },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Authentication was successful.
      if (res.status === 200) {
        setLoading(false);
        message.success("لقد تم التحديث بنجاح");
        stepFive();
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.status === 200) {
        message.success("لقد تم التحديث بنجاح");
      }
      if (error.response && error.response.status === 422) {
        message.error("يرجى تعبئة البيانات");
      }
      if (error.response && error.response.status === 403) {
        message.error("هناك خطأ ما حدث في قاعدة بيانات , يرجى التأكد من ذلك");
      }
      if (error.response && error.response.status === 419) {
        message.error("العملية غير ناجحة");
      }
      if (error.response && error.response.status === 400) {
        message.error("حدث خطأ.. يرجى التأكد من البيانات");
      } else {
        message.error("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <div className="container-fluid">
      <MetaTags
        title="تعديل الخدمة - الوسائط"
        metaDescription="تعديل الخدمة - الوسائط"
        ogDescription="تعديل الخدمة - الوسائط"
      />
      {token && veriedEmail && (
        <div className="row justify-content-md-center my-3">
          <div className="col-md-7 pt-3">
            {/* {getProduct && getProduct.data.galaries.map((item: any) => (
                            <img src={item['data_url']} alt="" width={200} height={100} />
                        ))} */}
            <div className={"timlands-panel" + (loading ? " is-loader" : "")}>
              <div className="timlands-steps">
                <div className="timlands-step-item">
                  <h3 className="text">
                    <Link href={`/edit-product/overview?id=${id}`}>
                      <a>
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            collections_bookmark
                          </span>
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
                          <span className="material-icons material-icons-outlined">
                            payments
                          </span>
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
                          <span className="material-icons material-icons-outlined">
                            description
                          </span>
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
                          <span className="material-icons material-icons-outlined">
                            mms
                          </span>
                        </span>
                        مكتبة الصور والملفات
                      </a>
                    </Link>
                  </h3>
                </div>
              </div>
              <div className="choose-images-file">
                <div className="choose-images-list">
                  <div
                    className={"panel-modal-body login-panel-body auto-height"}
                  >
                    <div className="row">
                      <div className="col-md-12 align-center">
                        <div className="images-list-uploading">
                          <div className="page-header">
                            <h4 className="title">الصورة البارزة</h4>
                          </div>
                          <p
                            className="text-note mt-3"
                            style={{ color: "#555", margin: 0, fontSize: 13 }}
                          >
                            يجب أن تكون الصورة البارزة واضحة وبجودة واضحة تعكس
                            محتوى الخدمة
                          </p>
                          <p
                            className="text-resolotion"
                            style={{
                              color: "#222",
                              margin: 0,
                              fontSize: 13,
                              fontWeight: "bold",
                            }}
                          >
                            من الأفضل أن تكون الأبعاد: 755X418
                          </p>
                          <ImageUploading
                            value={featuredImages}
                            onChange={onChangeFeatured}
                            maxNumber={1}
                            dataURLKey="data_url"
                          >
                            {({ imageList, onImageUpdate }) => (
                              // write your building UI
                              <Spin spinning={featuredLoading}>
                                <div className="upload__image-wrapper">
                                  {featuredProgress !== 0 && (
                                    <Progress percent={featuredProgress} />
                                  )}
                                  {imageList.length == 0 && (
                                    <div className="nothing-images">
                                      <h4 className="nothing-title">
                                        اختر الصورة البارزة
                                      </h4>
                                      <p className="nothing-text">
                                        يجب أن تختار الصورة البارزة للخدمة ويجب
                                        ان تكون الصورة متناسقة مع محتوى الخدمة
                                      </p>
                                    </div>
                                  )}
                                  {imageList &&
                                    imageList.map((image, index) => (
                                      <div className="p-0" key={index}>
                                        <div className="image-item featured-wrapper">
                                          <Image
                                            src={image["data_url"]}
                                            alt="الصورة البارزة"
                                            width={755}
                                            height={418}
                                            quality={85}
                                            placeholder="blur"
                                            blurDataURL={image["data_url"]}
                                          />

                                          <div className="image-item__btn-wrapper">
                                            <button
                                              disabled={featuredLoading}
                                              type="button"
                                              onClick={() =>
                                                onImageUpdate(index)
                                              }
                                            >
                                              <span className="material-icons-outlined">
                                                edit
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  <hr />
                                  <button
                                    type="button"
                                    disabled={
                                      featuredLoading ||
                                      (galariesSuccess && featuredSuccess)
                                    }
                                    className="btn butt-lg butt-primary"
                                    onClick={uploadFeaturedHandle}
                                  >
                                    رفع الصورة الآن
                                  </button>
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
              <div className="choose-images-file">
                <div className="choose-images-list">
                  <div
                    className={"panel-modal-body login-panel-body auto-height"}
                  >
                    <div className="row">
                      <div className="col-md-12 align-center">
                        <div className="images-list-uploading">
                          <div className="page-header">
                            <h4 className="title">معرض الصور</h4>
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
                              <Spin spinning={galariesLoading}>
                                <div className="upload__image-wrapper">
                                  {imageProgress !== 0 && (
                                    <Progress percent={imageProgress} />
                                  )}
                                  <div className="pb-2">
                                    <button
                                      type="button"
                                      disabled={galariesLoading}
                                      className="btn butt-primary2 butt-sm"
                                      style={
                                        isDragging
                                          ? { color: "red" }
                                          : undefined
                                      }
                                      onClick={onImageUpload}
                                      {...dragProps}
                                    >
                                      يمكنك الاختيار من جهازك
                                    </button>
                                    &nbsp;
                                    <button
                                      type="button"
                                      disabled={galariesLoading}
                                      className="btn butt-red-out butt-sm"
                                      onClick={onImageRemoveAll}
                                    >
                                      تفريغ الصور
                                    </button>
                                  </div>
                                  {imageList.length == 0 && (
                                    <div className="nothing-images">
                                      <h4 className="nothing-title">
                                        اختر صور من جهازك
                                      </h4>
                                      <p className="nothing-text">
                                        يجب أن تختار على الأقل صورة في معرض
                                        الخدمة ويجب ان تكون الصور مناسبة من
                                        الخدمة
                                      </p>
                                    </div>
                                  )}
                                  <div className="row">
                                    {imageList &&
                                      imageList.map((image, index) => (
                                        <div className="col-md-12" key={index}>
                                          <div className="image-item">
                                            <Image
                                              src={image["data_url"]}
                                              alt="الصورة البارزة"
                                              width={755}
                                              height={418}
                                              quality={85}
                                              placeholder="blur"
                                              blurDataURL={image["data_url"]}
                                            />
                                            <div className="image-item__btn-wrapper">
                                              <button
                                                disabled={galariesLoading}
                                                type="button"
                                                onClick={() =>
                                                  onImageUpdate(index)
                                                }
                                              >
                                                <span className="material-icons-outlined">
                                                  edit
                                                </span>
                                              </button>
                                              <button
                                                disabled={galariesLoading}
                                                type="button"
                                                onClick={() =>
                                                  onImageRemove(index)
                                                }
                                              >
                                                <span className="material-icons-outlined">
                                                  clear
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                  <hr />
                                  <button
                                    type="button"
                                    disabled={galariesLoading}
                                    className="btn butt-lg butt-primary"
                                    onClick={uploadGalleryHandle}
                                  >
                                    رفع الصور الآن
                                  </button>
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

              <div className="timlands-content-form">
                <div className="choose-images-file">
                  <h4 className="timlands-content-form-subtitle">
                    فيديو تعريفي للخدمة
                  </h4>
                  <div className="timlands-form">
                    <label className="label-block" htmlFor="input-videourl">
                      رابط الفيديو
                    </label>
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
                    {url_video && (
                      <ReactPlayer
                        style={{
                          borderRadius: 6,
                          overflow: "hidden",
                          marginTop: 6,
                        }}
                        width="100%"
                        url={url_video}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="py-4 d-flex">
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={loadImagesHandle}
                    className="btn flex-center butt-green ml-auto butt-sm"
                  >
                    <span className="text">حفظ التعديلات</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
Medias.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Medias;
export async function getServerSideProps(ctx) {
  const token = cookies(ctx).token || "";
  const uriString = `api/my_products/product/${ctx.query.id}`;
  // Fetch data from external API
  const res = await API.get(uriString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { props: { query: ctx.query, stars: res.data } };
}
Medias.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
