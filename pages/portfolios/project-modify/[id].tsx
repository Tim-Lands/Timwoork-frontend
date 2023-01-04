import { MetaTags } from "@/components/SEO/MetaTags";
import Layout from "@/components/Layout/HomeLayout";
import FormLangs from "@/components/Forms/FormLangs";
import FeaturedUploadingGalleries from "@/components/featuredUploadingGalleries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import ImagesUploadingGalleries from "@/components/ImagesUploadingGalleries";
import { useEffect, useState } from "react";
import { FormInput, FormTextarea, FormSelect2 } from "components/Forms/Forms";
import Tips from "@/components/Portfolio/Tips";
import RemoveImageModal from "@/components/removeImageModal";
import Tags from "@/components/add-new/Tags";
import NavigationButtons from "components/NavigationButtons";
import { useFormik } from "formik";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";
import API from "../../../config";
import FormModal from "@/components/Forms/FormModal";
import { CategoriesActions } from "@/store/categories/categoriesActions";

let testTime;
const Add: NextPage = () => {
  const dispatch = useAppDispatch();
  const [galleryMedia, setGalleryMedia]: any = useState([]);
  const [isRemoveModal, setIsRemoveModal]: any = useState(false);
  const [removedImage, setRemovedImage]: any = useState({ id: -1, index: -1 });
  const [, setIsGalleryChanged] = useState(false);
  const [, setIsFeaturedChanged] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const [featuredMedia, setFeaturedImages]: any = useState("");
  const [removedImages, setRemovedImages] = useState([]);
  const [selectedLangTitle, setSelectedLangTitle] = useState("");
  const [selectedLangContent, setSelectedLangContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [subtitlesTitle, setSubtitlesTitle] = useState({
    ar: null,
    fr: null,
    en: null,
  });
  const [subtitlesContent, setSubtitlesContent] = useState({
    ar: null,
    fr: null,
    en: null,
  });
  const [isSubtitleTitle, setIsSubtitleTitle] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [isSubtitleContent, setIsSubtitleContent] = useState({
    ar: false,
    fr: false,
    en: false,
  });

  const [isShownModalTitle, setIsShownModalTitle] = useState(false);
  const [isShownModalContent, setIsShownModalContent] = useState(false);

  const [checkedLangsTitle, setCheckedLangsTitle] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [checkedLangsContent, setCheckedLangsContent] = useState({
    ar: false,
    fr: false,
    en: false,
  });
  const [userLang, setUserLang] = useState();


  const removeImage = async (image, index) => {
    setIsRemoveModal(true);
    setRemovedImage({ id: image.id, index });
  };
  const [project, setProject]: any = useState({});
  const id: any = useRouter().query.id;
  const isAdd = id === "add";

  const addSubtitleTitle = (subtitle) => {
    switch (selectedLangTitle) {
      case "ar":
        setSubtitlesTitle({ ...subtitlesTitle, ar: subtitle });
        break;
      case "en":
        setSubtitlesTitle({ ...subtitlesTitle, en: subtitle });
        break;
      case "fr":
        setSubtitlesTitle({ ...subtitlesTitle, fr: subtitle });
        break;
    }
  };

  const addSubtitleContent = (subtitle) => {
    switch (selectedLangContent) {
      case "ar":
        setSubtitlesContent({ ...subtitlesContent, ar: subtitle });
        break;
      case "en":
        setSubtitlesContent({ ...subtitlesContent, en: subtitle });
        break;
      case "fr":
        setSubtitlesContent({ ...subtitlesContent, fr: subtitle });
        break;
    }
  };

  useEffect(() => {
    if (id === "add") return;
    else if (id) fetchData();
  }, [id]);

  useEffect(()=>{
    CategoriesActions.getAllCategories({})
  },[])
  const {
    languages: { getAll },
    user,
    categories
  } = useAppSelector((state) => state);
  const form = useFormik({
    initialValues: {
      title: project.title,
      tags: project.portfolio_item_tags,
      url: project.url,
      completed_date: project.completed_date,
      content: project.content,

      category: project.subcategory?.parent_id,
      subcategory: project.subcategory?.id,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const fetchData = async () => {
    const res = await API.get(`/api/portfolios/items/${id}`);
    setProject(res.data.data);
    setFeaturedImages([{data_url:res.data.data.cover_url}])
    setGalleryMedia(res.data.data.gallery.map(img=>({...img, data_url:img.image_url})))
  };

  const deleteImages = async()=>{
    console.log(removedImages)
    const promises = removedImages.map((img) =>
        API.delete(`api/portfolios/items/images/${img}`)
      );
      await Promise.all(promises);
  }

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
  const detectLang = async (txt, callback) => {
    const res = await API.post(`/api/detectLang`, { sentence: txt });
    callback(res.data.data);
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  console.log(featuredMedia)
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
            {isShownModalTitle && (
              <FormModal
                defaultValue={subtitlesTitle[selectedLangTitle]}
                isSwitchChecked={isSubtitleTitle[selectedLangTitle]}
                onSwitch={() =>
                  setIsSubtitleTitle({
                    ...isSubtitleTitle,
                    [selectedLangTitle]: !isSubtitleTitle[selectedLangTitle],
                  })
                }
                onSubmit={(txt) => addSubtitleTitle(txt)}
                setIsConfirmText={setIsShownModalTitle}
              />
            )}
            {isShownModalContent && (
              <FormModal
                defaultValue={subtitlesContent[selectedLangContent]}
                isSwitchChecked={isSubtitleContent[selectedLangContent]}
                onSwitch={() =>
                  setIsSubtitleContent({
                    ...isSubtitleContent,
                    [selectedLangContent]:
                      !isSubtitleContent[selectedLangContent],
                  })
                }
                onSubmit={(txt) => addSubtitleContent(txt)}
                setIsConfirmText={setIsShownModalContent}
              />
            )}

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
                    onKeyUp={() => {
                      testTime = setTimeout(() => {
                        detectLang(form.values["content"], (res) => {
                          setCheckedLangsTitle({
                            ...checkedLangsTitle,
                            [res]: false,
                          });
                          setUserLang(res);
                        });
                      }, 3000);
                    }}
                    onKeyDown={() => {
                      clearTimeout(testTime);
                    }}
                  />
                  <FormLangs
                    onClick={(lang) => {
                      setSelectedLangTitle(lang);
                      setIsShownModalTitle(true);
                    }}
                    default_lang={userLang}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <FeaturedUploadingGalleries
                    setIsChanged={setIsFeaturedChanged}
                    setImage={setFeaturedImages}
                    full_path_thumbnail={featuredMedia || "/project.png"}
                    validationsErrors={
                      validationsErrors?.cover && validationsErrors.cover[0]
                    }
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
                    onkeyUp={() => {
                      testTime = setTimeout(() => {
                        detectLang(form.values["content"], (res) => {
                          setCheckedLangsContent({
                            ...checkedLangsContent,
                            [res]: false,
                          });
                          setUserLang(res);
                        });
                      }, 3000);
                    }}
                    onkeyDown={() => {
                      clearTimeout(testTime);
                    }}
                  />
                  <FormLangs
                    onClick={(lang) => {
                      setSelectedLangContent(lang);
                      setIsShownModalContent(true);
                    }}
                    default_lang={userLang}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <ImagesUploadingGalleries
                    title="You_must_choose_project"
                    callback={removeImage}
                    setIsChanged={setIsGalleryChanged}
                    setGalleryMedia={setGalleryMedia}
                    galaries={galleryMedia}
                    validationsErrors={validationsErrors?.images}
                  />
                </div>
                <div className="col-md-6   mb-3">
                  <FormSelect2
                    title={getAll("Choose_the_principal")}
                    name="category"
                    handleChange={form.handleChange}
                    value={form.values.category}
                    validationsErrors={
                      validationsErrors?.category &&
                      validationsErrors.category[0]
                    }
                    data={categories.all}
                  />
                </div>
                <div className="col-md-6   mb-3">
                  <FormSelect2
                    title={getAll("Choose_a_subcategory")}
                    name="subcategory"
                    handleChange={form.handleChange}
                    value={form.values.subcategory}
                    validationsErrors={
                      validationsErrors?.subcategory &&
                      validationsErrors.subcategory[0]
                    }
                    data = {categories.all?.find(category=>category.id==form.values.category)?.subcategories}
                  />
                </div>
                <div className="col-md-8">
                  <Tags
                    values={form.values.tags}
                    onChange={form.setFieldValue}
                    onBlur={form.setFieldTouched}
                    validationsErrors={
                      validationsErrors?.images && validationsErrors.images[0]
                    }
                  />
                </div>

                <div className="col-md-4  mb-3">
                  <FormInput
                    type="date"
                    title={getAll("Completion_date")}
                    name="completed_date"
                    handleChange={form.handleChange}
                    value={form.values.completed_date}
                    validationsErrors={
                      validationsErrors?.completed_date &&
                      validationsErrors.completed_date[0]
                    }
                  />
                </div>
                <div className="col-md-12   mb-3">
                  <FormInput
                    title={getAll("Project_link")}
                    name="url"
                    handleChange={form.handleChange}
                    value={form.values.url}
                    validationsErrors={
                      validationsErrors?.url && validationsErrors.url[0]
                    }
                  />
                </div>
              </div>
              <div className="py-4 d-flex">
                <NavigationButtons
                  nextTitle={getAll("Add")}
                  backClass="butt-red"
                  backTitle={getAll("Cancel")}
                  loading={loading}
                  onBackClick={() =>
                    router.push("/portfolios/user/" + user.username)
                  }
                  onNextClick={async () => {
                    if (isAdd) {
                      try {
                        const body = {
                          ...form.values,
                          cover: featuredMedia && featuredMedia[0].file,
                          images: galleryMedia.map((media) => media.file),
                        };
                        setLoading(true);
                        await dispatch(
                          PortfolioActions.addProject({
                            body,
                            username: user.username,
                          })
                        ).unwrap();
                        router.push("/portfolios/user/" + user.username);
                      } catch (error) {
                        setLoading(false);

                        setValidationsErrors(error?.errors);
                      }
                    } else {
                      try {
                        await dispatch(
                          PortfolioActions.updateProduct({
                            id,
                            username: user.username,
                            body: {
                              ...form.values,
                              cover: featuredMedia && featuredMedia[0].file,
                              images: galleryMedia.filter(media=>media.file).map((media) => media.file),
                            },
                          })
                        ).unwrap();
                        await deleteImages()
                        router.push("/portfolios/" + id);
                      } catch (error) {
                        setValidationsErrors(error.data);
                      }
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
