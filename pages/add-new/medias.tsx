import Layout from "../../components/Layout/HomeLayout";
import { ReactElement, useEffect, useState } from "react";
import API from "../../config";
import router from "next/router";
import SidebarAdvices from "@/components/add-new/SidebarAdvices";
import { MyProductsActions } from "store/myProducts/myProductsActions";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Navbar from "components/productModify/navbar";

import { message, notification } from "antd";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Alert } from "@/components/Alert/Alert";
import { CloseCircleOutlined } from "@ant-design/icons";
import ImagesUploadingGalleries from "@/components/ImagesUploadingGalleries";
import FeaturedUploadingGalleries from "@/components/featuredUploadingGalleries";
import RemoveImageModal from "@/components/removeImageModal";
import NavigationButtons from "@/components/NavigationButtons";

function Medias({ query }) {
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const dispatch = useAppDispatch();
  const getProduct = useAppSelector((state) => state.myProducts.product);

  useEffect(() => {
    if (getProduct.loaded && getProduct.id === query.id) return;
    dispatch(MyProductsActions.getProduct({ id: query.id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/add-new");
      });
  }, []);
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const [featuredMedia, setFeaturedImages]: any = useState("");
  const [galleryMedia, setGalleryMedia]: any = useState([]);
  const [isFeaturedChanged, setIsFeaturedChanged] = useState(false);
  const [isGalleryChanged, setIsGalleryChanged] = useState(false);
  const [isRemoveModal, setIsRemoveModal]: any = useState(false);
  const [removedImage, setRemovedImage]: any = useState({ id: -1, index: -1 });
  const [removedImages, setRemovedImages] = useState([]);

  const id = query.id;
  const veriedEmail = user.email_verified;

  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);

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
      galleries
    );
    return res;
  };

  const loadVideoUrl: any = async () => {
    try {
      await dispatch(
        MyProductsActions.modifySteps({
          url: `api/product/${id}/product-step-four`,
          id,
          body: { url_video: url_video },
          headers: {
            headers: {
              "content-type": "multipart/form-data",
            },
          },
        })
      ).unwrap();
    } catch (e) {
      () => {};
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
        message: getAll("An_error_occurred"),
        description: getAll("Please_add_at_2"),
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
        message: getAll("An_error_occurred"),
        description: getAll("Add_a_profil_picture"),
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
      setLoading(false);

      return;
    }

    if (url_video.length > 0 && !pattern.test(url_video)) {
      notification.open({
        message: getAll("An_error_occurred"),
        description: getAll("Please_enter_a"),
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
          message.success(getAll("The_update_has"));
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
          message.success(getAll("The_update_has"));
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
          message.success(getAll("The_update_has"));
          router.push({
            pathname: "/add-new/complete",
            query: {
              id: id, // pass the id
            },
          });
        }
      } else {
        setLoading(false);
        message.success(getAll("The_update_has"));
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
          message: getAll("An_error_occurred"),
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
        API.post(`api/product/${query.id}/delete_galary`, { id: img })
      );
      await Promise.all(promises);
    } catch (error) {
      notification.open({
        message: getAll("An_error_occurred"),
        icon: <CloseCircleOutlined style={{ color: "#c21c1c" }} />,
      });
    }
  };
  return (
    <>
      <MetaTags
        title={getAll("Add_a_new_service")}
        metaDescription={getAll("Contact_us_Timwoork")}
        ogDescription={getAll("Contact_us_Timwoork")}
      />
      {user.isLogged && veriedEmail && (
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
            <div
              className="row my-3"
              style={{ maxWidth: 1300, marginInline: "auto" }}
            >
              <div className="col-md-4">
                <SidebarAdvices />
              </div>
              <div className="col-md-8 pt-3">
                {/* {getProduct && getProduct.data.galaries.map((item: any) => (
                              <img src={item['data_url']} alt="" width={200} height={100} />
                          ))} */}
                <div
                  className={"timlands-panel" + (loading ? " is-loader" : "")}
                >
                  <Navbar active="gallery" navigate={false} url="" />

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
                            {getAll("Service_introduction_video")}
                          </h4>
                          <div className="timlands-form">
                            <label
                              className="label-block"
                              htmlFor="input-videourl"
                            >
                              {getAll("Video_link")}
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
                    <NavigationButtons
                      onNextClick={() => loadImagesHandle()}
                      nextTitle={getAll("Next_step")}
                      backTitle={getAll("Previous_step")}
                    />
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

export async function getServerSideProps({ query }) {
  return { props: { query } };
}
export default Medias;
Medias.propTypes = {
  query: PropTypes.any,
};
