import { MetaTags } from "@/components/SEO/MetaTags";
import Layout from "@/components/Layout/HomeLayout";
import FormLangs from "@/components/Forms/FormLangs";
import FeaturedUploadingGalleries from "@/components/featuredUploadingGalleries";
import { useAppSelector } from "@/store/hooks";
import router, { useRouter } from "next/router";
import { NextPage } from "next";
import ImagesUploadingGalleries from "@/components/ImagesUploadingGalleries";
import { useState } from "react";
import { FormInput, FormTextarea } from "components/Forms/Forms";
import Tips from "@/components/Portfolio/Tips";
import Tags from "@/components/add-new/Tags";
import NavigationButtons from "components/NavigationButtons";
const Add: NextPage = () => {
  const [galleryMedia, setGalleryMedia]: any = useState([]);
  const [, setIsRemoveModal]: any = useState(false);
  const [, setRemovedImage]: any = useState({ id: -1, index: -1 });
  const [, setIsGalleryChanged] = useState(false);
  const [, setIsFeaturedChanged] = useState(false);
  const [featuredMedia, setFeaturedImages]: any = useState("");
  const removeImage = async (image, index) => {
    setIsRemoveModal(true);
    setRemovedImage({ id: image.id, index });
  };
  const id = useRouter().query.id;
  console.log(id);
  const {
    languages: { getAll },
    user,
  } = useAppSelector((state) => state);

  return (
    <Layout>
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
                  <FormInput title={getAll("Project_title")} />
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
                    full_path_thumbnail={featuredMedia || "/seo.png"}
                  />
                </div>
                <div className="col-md-12 mb-3 p-relative portfolio">
                  <FormTextarea
                    minHeight={400}
                    title={getAll("Project_details")}
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
                  <Tags validationsErrors={{}} />
                </div>
                <div className="col-md-8   mb-3">
                  <FormInput title={getAll("Project_link")} />
                </div>
                <div className="col-md-4   mb-3">
                  <FormInput type="date" title={getAll("Completion_date")} />
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
                  onNextClick={() => {
                    console.log("ahmed");
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
