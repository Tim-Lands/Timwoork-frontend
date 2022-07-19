import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import DeleteConfirm from "@/components/NewIndex/Portfolio/DeleteConfirm";
import { BsLightbulb, BsPlus } from "react-icons/bs";
import Link from "next/link";
import { MdSecurity } from "react-icons/md";
import { Alert } from "@/components/Alert/Alert";
import Image from "next/image";
import { motion } from "framer-motion";
import CreatableSelect from "react-select/creatable";
import API from "../../config";
import { useFormik } from "formik";
import { Space } from "antd";

const MySelect = (props: any) => {
  const [dataTags, setDataTags] = useState([]);

  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const getdataTags = async (tag: string) => {
    setIsLoadingTags(true);
    try {
      const res: any = await API.get(`api/tags/filter?tag=${tag}`);
      if (res.status === 200) {
        setIsLoadingTags(false);
        setDataTags(res.data.data.data);
      }
    } catch (error) {
      setIsLoadingTags(false);
    }
  };
  const handleChange = (value) => {
    props.onChange("tags", value);
  };
  const handleBlur = () => {
    props.onBlur("tags", true);
  };
  return (
    <div
      className="select-tags-form"
      style={{ margin: "1rem 0", position: "relative", maxWidth: 1300 }}
    >
      {isLoadingTags && (
        <span className="spinner-border spinner-border-sm" role="status"></span>
      )}
      <CreatableSelect
        id="color"
        options={dataTags}
        onKeyDown={(e: any) => {
          if (e.target.value) {
            getdataTags(e.target.value);
          }
        }}
        isMulti={true}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
      />
    </div>
  );
};

function AddNew() {
  const [isDeleteShowen, setIsDeleteShowen] = useState(false);
  const [validationsErrors, setValidationsErrors]: any = useState({});
  const clearValidationHandle = () => {
    setValidationsErrors({});
  };
  const formik = useFormik({
    initialValues: {
      content: "ejrferjgh erfkerh whgferg",
      tags: "",
    },
    isInitialValid: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setValidationsErrors({});
        const res = await API.post(`api/product/product-step-one`, values);
        if (res.status === 200) {
          console.log("result");
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setValidationsErrors(error.response.data.errors);
        }
      }
    },
  });
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"إضافة مسابقة جديدة"}
        metaDescription={"إضافة مسابقة جديدة"}
        ogDescription={"إضافة مسابقة جديدة"}
      />
      {isDeleteShowen && <DeleteConfirm setIsDeleteModal={setIsDeleteShowen} />}
      <div className="portfolios-container">
        <nav className="portfolios-nav d-flex">
          <ul className="portfolios-nav-list me-auto">
            <li>
              <Link href={`/`}>
                <a className="portfolio-item">الرئيسية</a>
              </Link>
            </li>
            <li>
              <Link href={`/contests`}>
                <a className="portfolio-item">تصفح المسابقات</a>
              </Link>
            </li>
          </ul>
          <ul className="portfolios-nav-list ml-auto">
            <li className="active">
              <Link href={`/contests/add-new`}>
                <a className="portfolio-item">
                  <BsPlus /> إضافة مسابقة جديدة
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="py-2 mb-2">
          <Alert type="warning">
            <p className="text">
              <span className="material-icons material-icons-outlined">
                warning
              </span>
              رصيد الحالى غير كافي لإنشاء مسابقة جديدة, برجاء الشحن اولاً شحن
              الرصيد
              <Link href={`/charge/acount`}>
                <a className="btn butt-xs butt-green mx-2 flex-center">
                  شحن رصيدك
                </a>
              </Link>
            </p>
          </Alert>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">نشر مسابقتك على تيم وورك</h3>
              <div className="py-2 info-sidebar">
                <p className="text" style={{ fontSize: 14, margin: 0 }}>
                  توفر منصة كفيل القسم الأول من نوعة فى الوطن العربي (المسابقات)
                  الذي يسمح لك بإنشاء مسابقة بين أمهر المستقلين وتلقي مئات
                  المشاركات للمقارنة بينهم وإختيار الأفضل. تريد شعار جديد
                  لشركتك؟ تبحث عن إسم نطاق جديد مميز لموقعك غير محجوز من قبل ؟
                  هل لديك إحتياجات وأفكار اخري يمكن وضعها فى مسابقه ؟ إذاً من
                  هنا تكون نقطة البداية
                </p>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">
                <BsLightbulb /> نصائح لإضافة مسابقتك
              </h3>
              <div className="py-2 info-sidebar">
                <ul className="advertis-items">
                  <li>أضف عنوان واضح ومعبر لمسابقتك</li>
                  <li>
                    أضف قسم ومهارات مناسبه لمسابقتك حتى يسهل على المستقلين
                    الوصول لها
                  </li>
                  <li>
                    اشرح متطلباتك بشكل واضح باللغة العربية حتى يسهل على
                    المستقلين فهمها وتنفيذها
                  </li>
                  <li>
                    حدد نوع المسابقة جيداً, فنوع المسابقة يفرض على المستقل نوع
                    مشاركته فى المسابقه إذا كانت (صور / فيديو / نصوص ومقالات /
                    أو نطاقات مواقع)
                  </li>
                  <li>
                    يمكنك إضافه بعض الشروط إلى المسابقة مثل ضرورة إستخدام أدوات
                    معينة للتنفيذ أو إستخدام ألوان بعينها أو أن تكون المشاركة
                    غير منقوله
                  </li>
                  <li>إختر مدة وميزانية للمسابقة منطقيه وتتناسب مع متطلباتك</li>
                  <li>
                    فى الغالب نختار فائز واحد للمسابقة لكن إذا أردت أختيار أكتر
                    من مشاركة , يمكنك أختيار أتنين أو ثلاثة
                  </li>
                  <li>
                    يمكنك عمل استفتاء بين أفضل الأعمال حتى يقوم زوار الموقع
                    باختيار العمل الأفضل من وجهة نظرهم كتوصية غير ملزمة لك
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">
                <MdSecurity /> كفيل يضمن حقوقك
              </h3>
              <div className="py-2 info-sidebar">
                <p className="text" style={{ fontSize: 14, margin: 0 }}>
                  يضمن لك كفيل حقوقك بمراجعة جميع المشاركات المقدمة فى المسابقة
                  والتأكد من جودتها و تميزها. فى حالة لم تستلم العدد الكافى
                  (المحدد من الموقع) من المشاركات على مسابقتك, فسيتم إلغاء
                  المسابقه وإرجاع رصيدك مره أخري إلى حسابك.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="portfolio-single bg-white p-3 mb-3">
              <div className="page-header">
                <h3 className="title">إضافة مسابقة جديدة</h3>
              </div>
              <div className="contest-form">
                <div className="contest-form-item">
                  <label htmlFor="">نوع المسابقة</label>
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="radio-img-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="images-radio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="images-radio"
                          >
                            <Image
                              src={`/img/img (1).png`}
                              width={25}
                              height={25}
                            />
                            صور
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="radio-img-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="texts-radio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="texts-radio"
                          >
                            <Image
                              src={`/img/img (2).png`}
                              width={25}
                              height={25}
                            />
                            صور
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="radio-img-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="videos-radio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="videos-radio"
                          >
                            <Image
                              src={`/img/img (3).png`}
                              width={25}
                              height={25}
                            />
                            صور
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="radio-img-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="domains-radio"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="domains-radio"
                          >
                            <Image
                              src={`/img/img (4).png`}
                              width={25}
                              height={25}
                            />
                            صور
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="timlands-form">
                    <label className="label-block" htmlFor="input-title">
                      العنوان
                    </label>
                    <input
                      id="input-title"
                      name="title"
                      placeholder="العنوان..."
                      className={
                        "timlands-inputs " +
                        (validationsErrors &&
                          validationsErrors.title &&
                          " has-error")
                      }
                      onKeyUp={clearValidationHandle}
                    />
                    {/* <FormLangs /> */}
                    <div className="note-form-text-sh">
                      <p className="text">أضف عنوان مختصر معبر يوصف المطلوب</p>
                    </div>
                    {validationsErrors && validationsErrors.title && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">{validationsErrors.title[0]}</p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="timlands-form">
                    <label
                      className="label-block"
                      htmlFor="input-contestDescription"
                    >
                      الوصف
                    </label>
                    <div className="app-content-editor">
                      <textarea
                        name="contestDescription"
                        className="descriptionInputHold"
                        id="contestDescription"
                      ></textarea>
                    </div>
                    {validationsErrors && validationsErrors.buyer_instruct && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">
                            {validationsErrors.buyer_instruct[0]}
                          </p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="timlands-form">
                    <label
                      className="label-block"
                      htmlFor="input-contestConditions"
                    >
                      الشروط
                    </label>
                    <div className="app-content-editor">
                      <textarea
                        name="contestConditions"
                        className="descriptionInputHold"
                        id="contestConditions"
                      ></textarea>
                    </div>
                    {validationsErrors && validationsErrors.buyer_instruct && (
                      <div style={{ overflow: "hidden" }}>
                        <motion.div
                          initial={{ y: -70, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="timlands-form-note form-note-error"
                        >
                          <p className="text">
                            {validationsErrors.buyer_instruct[0]}
                          </p>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-xl-5">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="input-winners">
                          عدد الفائزين
                        </label>
                        <select
                          id="input-winners"
                          name="winners"
                          className="timlands-inputs select"
                        >
                          <option value="1">1 فائز</option>
                          <option value="2">2 فائزين</option>
                          <option value="3">3 فائزين</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="timlands-form">
                            <label
                              className="label-block"
                              htmlFor="input-title"
                            >
                              الفائز الأول
                            </label>
                            <input
                              id="input-title"
                              name="title"
                              placeholder="قيمة الجائزة..."
                              className={
                                "timlands-inputs " +
                                (validationsErrors &&
                                  validationsErrors.title &&
                                  " has-error")
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="timlands-form">
                            <label
                              className="label-block"
                              htmlFor="input-title"
                            >
                              الفائز الثاني
                            </label>
                            <input
                              id="input-title"
                              name="title"
                              placeholder="قيمة الجائزة..."
                              className={
                                "timlands-inputs " +
                                (validationsErrors &&
                                  validationsErrors.title &&
                                  " has-error")
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="timlands-form">
                            <label
                              className="label-block"
                              htmlFor="input-title"
                            >
                              الفائز الثالث
                            </label>
                            <input
                              id="input-title"
                              name="title"
                              placeholder="قيمة الجائزة..."
                              className={
                                "timlands-inputs " +
                                (validationsErrors &&
                                  validationsErrors.title &&
                                  " has-error")
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="input-winners">
                          مدة المسابقة
                        </label>
                        <select
                          id="input-winners"
                          name="winners"
                          className="timlands-inputs select"
                        >
                          <option value="1">5 أيام</option>
                          <option value="2">6 أيام</option>
                          <option value="3">7 أيام</option>
                          <option value="3">8 أيام</option>
                          <option value="3">9 أيام</option>
                          <option value="3">10 أيام</option>
                          <option value="3">11 اليوم</option>
                          <option value="3">12 اليوم</option>
                          <option value="3">13 اليوم</option>
                          <option value="3">14 اليوم</option>
                          <option value="3">15 اليوم</option>
                          <option value="3">16 اليوم</option>
                          <option value="3">17 اليوم</option>
                          <option value="3">18 اليوم</option>
                          <option value="3">19 اليوم</option>
                          <option value="3">20 اليوم</option>
                          <option value="3">21 اليوم</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="input-winners">
                          مدة التسليم
                        </label>
                        <select
                          id="input-winners"
                          name="winners"
                          className="timlands-inputs select"
                        >
                          <option value="1">5 أيام</option>
                          <option value="2">6 أيام</option>
                          <option value="3">7 أيام</option>
                          <option value="3">8 أيام</option>
                          <option value="3">9 أيام</option>
                          <option value="3">10 أيام</option>
                          <option value="3">11 اليوم</option>
                          <option value="3">12 اليوم</option>
                          <option value="3">13 اليوم</option>
                          <option value="3">14 اليوم</option>
                          <option value="3">15 اليوم</option>
                          <option value="3">16 اليوم</option>
                          <option value="3">17 اليوم</option>
                          <option value="3">18 اليوم</option>
                          <option value="3">19 اليوم</option>
                          <option value="3">20 اليوم</option>
                          <option value="3">21 اليوم</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timlands-form">
                        <label className="label-block" htmlFor="input-winners">
                          القسم
                        </label>
                        <select
                          id="input-winners"
                          name="winners"
                          className="timlands-inputs select"
                        >
                          <option value="1">5 أيام</option>
                          <option value="2">6 أيام</option>
                          <option value="3">7 أيام</option>
                          <option value="3">8 أيام</option>
                          <option value="3">9 أيام</option>
                          <option value="3">10 أيام</option>
                          <option value="3">11 اليوم</option>
                          <option value="3">12 اليوم</option>
                          <option value="3">13 اليوم</option>
                          <option value="3">14 اليوم</option>
                          <option value="3">15 اليوم</option>
                          <option value="3">16 اليوم</option>
                          <option value="3">17 اليوم</option>
                          <option value="3">18 اليوم</option>
                          <option value="3">19 اليوم</option>
                          <option value="3">20 اليوم</option>
                          <option value="3">21 اليوم</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <p
                        className="label-text"
                        style={{
                          fontWeight: "bold",
                          marginTop: 10,
                          marginBottom: -9,
                        }}
                      >
                        المهارات
                      </p>
                      <MySelect
                        value={formik.values.tags}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                      />
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        <ol className="terms-list">
                          <li>
                            أوافق على دفع رسوم وقدرها 15% من قيمة الجائزة التي
                            أخصصها للفائز في المسابقة وذلك في حال: كان هناك 5
                            مشاركين على الأقل و قررت أن يتم إلغاء المسابقة
                          </li>
                          <li>
                            عدم المطالبة بإلغاء المسابقة حتى لو كانت المشاركات
                            ليست على المستوي المطلوب وذلك تقديراً لجهود
                            المتسابقين
                          </li>
                          <li>
                            عدم التأخر أو تجاهل إختيار الفائز بعد إنتهاء
                            المسابقة وإلا ستضطر إدارة المنصة لإختيار الفائز بناء
                            على أعلي المشاركات تقييماً
                          </li>
                        </ol>
                      </label>
                    </div>
                  </div>
                  <div className="contest-form-footer">
                    <Space>
                      <button
                        type="submit"
                        className="btn butt-primary butt-md flex-center"
                      >
                        <span className="material-icons material-icons-outlined">
                          publish
                        </span>
                        نشر المسابقة
                      </button>
                      <button
                        type="submit"
                        className="btn butt-light butt-md flex-center"
                      >
                        <span className="material-icons material-icons-outlined">
                          save
                        </span>
                        حفظ كمسودة
                      </button>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AddNew.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default AddNew;
