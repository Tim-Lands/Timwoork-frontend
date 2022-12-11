import { MetaTags } from "@/components/SEO/MetaTags";
import Layout from "@/components/Layout/HomeLayout";
import FormLangs from "@/components/Forms/FormLangs";
import FeaturedUploadingGalleries from "@/components/featuredUploadingGalleries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import ImagesUploadingGalleries from "@/components/ImagesUploadingGalleries";
import { useEffect, useState } from "react";
import { FormInput, FormTextarea } from "components/Forms/Forms";
import Tips from "@/components/Portfolio/Tips";
import RemoveImageModal from "@/components/removeImageModal";
import Tags from "@/components/add-new/Tags";
import NavigationButtons from "components/NavigationButtons";
import { useFormik } from "formik";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";

const Add: NextPage = () => {
  const dispatch = useAppDispatch();
  const [galleryMedia, setGalleryMedia]: any = useState([]);
  const [isRemoveModal, setIsRemoveModal]: any = useState(false);
  const [removedImage, setRemovedImage]: any = useState({ id: -1, index: -1 });
  const [isGalleryChanged, setIsGalleryChanged] = useState(false);
  const [isFeaturedChanges, setIsFeaturedChanged] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [featuredMedia, setFeaturedImages]: any = useState("");
  const [removedImages, setRemovedImages] = useState([]);
  const removeImage = async (image, index) => {
    setIsRemoveModal(true);
    setRemovedImage({ id: image.id, index });
  };
  const id = useRouter().query.id;
  const isAdd = id === "add";
  useEffect(() => {
    if (id === "add") return;
  }, [id]);
  const {
    languages: { getAll },
    user,
  } = useAppSelector((state) => state);
  const form = useFormik({
    initialValues: {
      title: "",
      tags: [],
      link: "",
      completed_at: "",
      content: "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });
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

  return (
    <Layout>
      {isRemoveModal && (
        <RemoveImageModal
          onSubmit={onRemoveSubmit}
          image_id={removedImage.id}
          index={removedImage.index}
          setIsRemoveModal={setIsRemoveModal}
        />
      )}
      <div className="container pt-4 mt-2">
        <MetaTags
          title={getAll("Add_New_project") + " | " + getAll("Business_gallery")}
          metaDescription={
            getAll("Add_New_project") + " | " + getAll("Business_gallery")
          }
          ogDescription={
            getAll("Add_New_project") + " | " + getAll("Business_gallery")
          }
        />
        <div className="portfolios-container mb-5">
          <div className="row">
            <div className="col-lg-4 d-none-lg"></div>
            <h3 className="title my-5 mb-4 col-lg-8">
              {getAll("Add_New_project")}
            </h3>
            <div className="col-lg-4 d-none-lg">
              <Tips />
            </div>
            <div className="col-lg-8 bg-white ">
              <div className="row">
                <div className="col-md-12 p-relative portfolio mb-3">
                  <FormInput
                    title={getAll("Project_title")}
                    name="title"
                    handleChange={form.handleChange}
                    value={form.values.title}
                    validationsErrors={
                      validationsErrors?.title && validationsErrors.title[0]
                    }
                  />
                  <FormLangs
                    onClick={() => {
                      // setSelectedLang(lang);
                      // setIsShowenModal(true);
                    }}
                    default_lang={"ar"}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <FeaturedUploadingGalleries
                    setIsChanged={setIsFeaturedChanged}
                    setImage={setFeaturedImages}
                    full_path_thumbnail={featuredMedia || "/g10.png"}
                  />
                </div>
                <div className="col-md-12 mb-3 p-relative portfolio">
                  <FormTextarea
                    minHeight={400}
                    name="content"
                    handleChange={form.handleChange}
                    value={form.values.content}
                    title={getAll("Project_details")}
                    validationsErrors={
                      validationsErrors?.content && validationsErrors.content[0]
                    }
                  />
                  <FormLangs
                    onClick={() => {
                      // setSelectedLang(lang);
                      // setIsShowenModal(true);
                    }}
                    default_lang={"ar"}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <ImagesUploadingGalleries
                    title="You_must_choose_project"
                    callback={removeImage}
                    setIsChanged={setIsGalleryChanged}
                    setGalleryMedia={setGalleryMedia}
                    galaries={galleryMedia}
                  />
                </div>
                <div className="col-md-12">
                  <Tags
                    values={form.values.tags}
                    onChange={form.setFieldValue}
                    onBlur={form.setFieldTouched}
                    validationsErrors={validationsErrors}
                  />
                </div>
                <div className="col-md-8   mb-3">
                  <FormInput
                    title={getAll("Project_link")}
                    name="link"
                    handleChange={form.handleChange}
                    value={form.values.link}
                    validationsErrors={
                      validationsErrors?.link && validationsErrors.link[0]
                    }
                  />
                </div>
                <div className="col-md-4  mb-3">
                  <FormInput
                    type="date"
                    title={getAll("Completion_date")}
                    name="completed_at"
                    handleChange={form.handleChange}
                    value={form.values.completed_at}
                    validationsErrors={
                      validationsErrors?.completed_at &&
                      validationsErrors.completed_at[0]
                    }
                  />
                </div>
              </div>
              <div className="py-4 d-flex">
                <NavigationButtons
                  nextTitle={getAll("Add")}
                  backClass="butt-red"
                  backTitle={getAll("Cancel")}
                  onBackClick={() =>
                    router.push("/portfolios/user/" + user.username)
                  }
                  onNextClick={async () => {
                    if (isAdd) {
                      // try {
                      //   await dispatch(PortfolioActions.addProject()).unwrap();
                      //   router.push("/portfolios/user/" + user.username);
                      // } catch (error) {
                      //   setValidationsErrors(error.data);
                      // }
                    } else {
                      // try {
                      //   await dispatch(
                      //     PortfolioActions.updateProduct()
                      //   ).unwrap();
                      //   router.push("/portfolios/" + id);
                      // } catch (error) {
                      //   setValidationsErrors(error.data);
                      // }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Add;
