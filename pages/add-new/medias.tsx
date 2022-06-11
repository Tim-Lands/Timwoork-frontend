import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "../../config";
import router from "next/router";
import SidebarAdvices from "./SidebarAdvices";
import { message, notification } from "antd";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import cookies from "next-cookies";
import { MetaTags } from "@/components/SEO/MetaTags";
import useSWR from "swr";
import { Alert } from "@/components/Alert/Alert";
import { CloseCircleOutlined } from "@ant-design/icons";
import ImagesUploadingGalleries from "@/components/ImagesUploadingGalleries";
import FeaturedUploadingGalleries from "@/components/featuredUploadingGalleries";
import RemoveImageModal from "@/components/removeImageModal";

function Medias({ query, stars }) {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [featuredMedia, setFeaturedImages]: any = useState(
    stars.data.full_path_thumbnail
  );
  const [galleryMedia, setGalleryMedia]: any = useState(stars.data.galaries);
  const [isFeaturedChanged, setIsFeaturedChanged] = useState(false);
  const [isGalleryChanged, setIsGalleryChanged] = useState(false);
  const [isRemoveModal, setIsRemoveModal]: any = useState(false);
  const [removedImage, setRemovedImage]: any = useState({ id: -1, index: -1 });
  const [removedImages, setRemovedImages] = useState([]);

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const id = query.id;
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  async function getProductId() {
    try {
      // const res: any =
      await API.get(`api/my_products/product/${query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (res.status === 200) {
      // }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        router.push("/add-new");
      }
      if (error.response && error.response.status === 404) {
        router.push("/add-new");
      }
    }
  }
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    getProductId();
  }, []);

  const [validationsGeneral, setValidationsGeneral]: any = useState({});

  const [url_video, setVideourl] = useState("");
  const handleSetVideourl = (e: any) => {
    setVideourl(e.target.value);
  };
  const [loading, setLoading] = useState(false);
  function setValidationsErrorsHandle() {
    setValidationsErrors({});
    setValidationsGeneral({});
  }
  const loadFeatureImage: any = async () => {
    const imageFeature = new FormData();
    imageFeature.append("thumbnail", featuredMedia[0].file);
    imageFeature.append("url_video", url_video);
    const res = await API.post(
      `api/product/${id}/upload-thumbnail-step-four`,
      imageFeature,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  };

  const loadGalleryImages: any = async () => {
    const galleries = new FormData();
    galleryMedia.map(
      (e: any) => e.file && galleries.append("images[]", e.file)
    );
    //galleries.append('images[]', images)
    const res: any = await API.post(
      `api/product/${id}/upload-galaries-step-four`,
      galleries,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  };

  const loadVideoUrl: any = async () => {
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
      return res;
    } catch (e) {
      () => { };
    }
  };
  const loadImagesHandle = async () => {
    setLoading(true);
    setValidationsErrorsHandle();
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    if (galleryMedia.length <= 0) {
      notification.open({
        message: "حدث خطأ",
        description: "برجاء وضع صورة على الأقل في المعرض",
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
      setLoading(false);

      return;
    }

    if (
      !(featuredMedia instanceof Array) &&
      featuredMedia.split("/")[5].length <= 0
    ) {
      notification.open({
        message: "حدث خطأ",
        description: "برجاء وضع صورة بارزة",
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
      setLoading(false);

      return;
    }

    if (url_video.length > 0 && !pattern.test(url_video)) {
      notification.open({
        message: "حدث خطأ",
        description: "برجاء وضع عنوان صالح",
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
      setLoading(false);

      return;
    }

    try {
      if (isGalleryChanged && isFeaturedChanged) {
        const [res1, res2] = await Promise.all([
          loadFeatureImage(),
          loadGalleryImages(),
        ]);
        // Authentication was successful.
        if (res1.status === 200 && res2.status === 200) {
          await loadVideoUrl();
          setLoading(false);
          message.success("لقد تم تحديث بنجاح");
          router.push({
            pathname: "/add-new/complete",
            query: {
              id: id, // pass the id
            },
          });
        }
      } else if (isFeaturedChanged) {
        const [res] = await Promise.all([loadFeatureImage()]);
        // Authentication was successful.
        if (res.status === 200) {
          await loadVideoUrl();
          setLoading(false);
          message.success("لقد تم تحديث بنجاح");
          router.push({
            pathname: "/add-new/complete",
            query: {
              id: id, // pass the id
            },
          });
        }
      } else if (isGalleryChanged) {
        const [res] = await Promise.all([loadGalleryImages()]);

        // Authentication was successful.
        if (res.status === 200) {
          setLoading(false);
          await loadVideoUrl();
          message.success("لقد تم تحديث بنجاح");
          router.push({
            pathname: "/add-new/complete",
            query: {
              id: id, // pass the id
            },
          });
        }
      } else {
        setLoading(false);
        message.success("لقد تم تحديث بنجاح");
        router.push({
          pathname: "/add-new/complete",
          query: {
            id: id, // pass the id
          },
        });
      }
      await sendRemoveRequest();
    } catch (error: any) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setValidationsErrors(error.response.data.errors);
      }
      if (error.response && error.response.data) {
        setValidationsGeneral(error.response.data);
      }
      if (validationsErrors && validationsErrors.thumbnail) {
        notification.open({
          message: "حدث خطأ",
          description: validationsErrors.thumbnail[0],
          icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
        });
      }
    }
  };
  const removeImage = async (image, index) => {
    setIsRemoveModal(true);
    setRemovedImage({ id: image.id, index });
  };
  const onRemoveSubmit = async (image_id, index) => {
    if (image_id) {
      setRemovedImages([...removedImages, image_id]);
      setGalleryMedia(galleryMedia.filter((media) => media.id !== image_id));
    } else {
      const temp_arr = galleryMedia;
      temp_arr.splice(index, 1);
      setGalleryMedia(temp_arr);
    }
    setIsRemoveModal(false);
  };

  const sendRemoveRequest = async () => {
    try {
      const promises = removedImages.map((img) =>
        API.post(
          `api/product/${query.id}/delete_galary`,
          { id: img },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );
      await Promise.all(promises);
    } catch (error) {
      notification.open({
        message: "حدث خطأ",
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
    }
  };
  return (
    <>
      <MetaTags
        title="إضافة خدمة جديدة - إضافة وسائط"
        metaDescription="اتصل بنا - تيموورك"
        ogDescription="اتصل بنا - تيموورك"
      />
      {token && veriedEmail && (
        <>
          <div className="container-fluid">
            {isRemoveModal && (
              <RemoveImageModal
                onSubmit={onRemoveSubmit}
                product_id={query.id}
                image_id={removedImage.id}
                index={removedImage.index}
                setIsRemoveModal={setIsRemoveModal}
              />
            )}
            <div className="row my-3" style={{ maxWidth: 1300, marginInline: "auto" }}>
              <div className="col-md-4">
                <SidebarAdvices />
              </div>
              <div className="col-md-8 pt-3">
                {/* {getProduct && getProduct.data.galaries.map((item: any) => (
                              <img src={item['data_url']} alt="" width={200} height={100} />
                          ))} */}
                <div className={"timlands-panel" + (loading ? " is-loader" : "")}>
                  <div className="timlands-steps">
                    <div className="timlands-step-item">
                      <h3 className="text">
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            collections_bookmark
                          </span>
                        </span>
                        معلومات عامة
                      </h3>
                    </div>
                    <div className="timlands-step-item">
                      <h3 className="text">
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            payments
                          </span>
                        </span>
                        السعر والتطويرات
                      </h3>
                    </div>
                    <div className="timlands-step-item">
                      <h3 className="text">
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            description
                          </span>
                        </span>
                        الوصف وتعليمات المشتري
                      </h3>
                    </div>
                    <div className="timlands-step-item active">
                      <h3 className="text">
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            mms
                          </span>
                        </span>
                        مكتبة الصور والملفات
                      </h3>
                    </div>
                    <div className="timlands-step-item">
                      <h3 className="text">
                        <span className="icon-circular">
                          <span className="material-icons material-icons-outlined">
                            publish
                          </span>
                        </span>
                        نشر الخدمة
                      </h3>
                    </div>
                  </div>
                  {validationsGeneral.msg && (
                    <Alert type="error">{validationsGeneral.msg}</Alert>
                  )}
                  <div className="row justify-content-md-center">
                    <div className="">
                      <FeaturedUploadingGalleries
                        setIsChanged={setIsFeaturedChanged}
                        setImage={setFeaturedImages}
                        full_path_thumbnail={featuredMedia || "/seo.png"}
                      />
                      <ImagesUploadingGalleries
                        callback={removeImage}
                        setIsChanged={setIsGalleryChanged}
                        setGalleryMedia={setGalleryMedia}
                        galaries={galleryMedia}
                      />
                      <div className="timlands-content-form mt-2">
                        <div className="choose-images-file">
                          <h4 className="timlands-content-form-subtitle">
                            فيديو تعريفي للخدمة (اختياري)
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
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="py-4 d-flex">
                      <button
                        onClick={() => router.back()}
                        type="button"
                        className="btn flex-center butt-primary2-out me-auto butt-md"
                      >
                        <span className="material-icons-outlined">
                          chevron_right
                        </span>
                        <span className="text">المرحلة السابقة</span>
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        onClick={loadImagesHandle}
                        className="btn flex-center butt-green ml-auto butt-sm"
                      >
                        <span className="text">المرحلة التالية</span>
                        <span className="material-icons-outlined">
                          chevron_left
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
Medias.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};

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
export default Medias;
Medias.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
