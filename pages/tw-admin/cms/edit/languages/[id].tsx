import { ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LanguagestActions } from "@/store/tw-admin/languages/languagesActions";

export default function Id(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  const router = useRouter();
  const id:any = router.query.id;
  const {current_language} = useAppSelector(state=>state.dashboardLanguagesSlice)
  const dispatch = useAppDispatch()
 
  useEffect(() => {
    dispatch(LanguagestActions.getOne({id}))
  }, []);

  useEffect(()=>{
    if(current_language.data)
      setPerson(current_language.data)
  },[current_language.data])

  const [person, setPerson] = useState({
    name_ar: "",
    name_en: "",
    name_fr: "",
  });

  function handlename_arChange(e) {
    setPerson({
      ...person,
      name_ar: e.target.value,
    });
  }

  function handlename_enChange(e) {
    setPerson({
      ...person,
      name_en: e.target.value,
    });
  }

  function handlename_frChange(e) {
    setPerson({
      ...person,
      name_fr: e.target.value,
    });
  }
  const saveData = async (e) => {
    e.preventDefault();
    try {
      dispatch(LanguagestActions.updateOne({id, language:person}))
    } catch (error) {
      alert("Error Network");
    }
  };
  return (
    <>
      <div className="panel-modal-overlay"></div>
      <div className="panel-modal lg modal-add-new">
        <div className="panel-modal-header">
          <h2 className="title">
            <span className="material-icons material-icons-outlined">edit</span>
            {getAll("Edit")}
          </h2>
          <div className="panel-modal-left-tools">
            <button
              onClick={() => router.push("/tw-admin/cms/languages")}
              className="close-modal"
            >
              <span className="material-icons material-icons-outlined">
                close
              </span>
            </button>
          </div>
        </div>
        <form onSubmit={saveData}>
          {current_language.loading && getAll("Please_wait")}
          <div className={"panel-modal-body auto-height"}>
            <div className="row">
              <div className="col-sm-4">
                <div className="timlands-form">
                  <label className="label-block" htmlFor="name_ar">
                    اسم اللغة بالعربي
                  </label>
                  <input
                    type="text"
                    id="name_ar"
                    name="name_ar"
                    placeholder="اسم اللغة بالعربي..."
                    className="timlands-inputs"
                    autoComplete="off"
                    value={person.name_ar}
                    onChange={handlename_arChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="timlands-form">
                  <label className="label-block" htmlFor="name_en">
                    اسم اللغة بالانجليزي
                  </label>
                  <input
                    type="text"
                    id="name_en"
                    name="name_en"
                    placeholder="اسم اللغة بالانجليزي..."
                    className="timlands-inputs"
                    autoComplete="off"
                    value={person.name_en}
                    onChange={handlename_enChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="timlands-form">
                  <label className="label-block" htmlFor="name_fr">
                    اسم اللغة بالفرنسي
                  </label>
                  <input
                    type="text"
                    id="name_fr"
                    name="name_fr"
                    placeholder="اسم اللغة بالفرنسي..."
                    className="timlands-inputs"
                    autoComplete="off"
                    value={person.name_fr}
                    onChange={handlename_frChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="panel-modal-footer">
            <button
              onClick={() => router.push("/tw-admin/cms/languages")}
              type="button"
              className="btn butt-red butt-sm"
            >
              {getAll("Cancel_2")}
            </button>
            <button type="submit" className="btn butt-primary butt-sm">
              {getAll("Save_edits")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
Id.propTypes = {
  setIsModalHiddenHandle: PropTypes.func,
};
Id.getLayout = function getLayout(page): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
