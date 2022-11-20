import { ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BadgesActions } from "@/store/tw-admin/badges/badgesActions";

export default function Id(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const router = useRouter();
  const id:any = router.query.id;
  const {current_badge} = useAppSelector(state=> state.dashboardBadgesSlice)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (id)
      dispatch(BadgesActions.getOne({id}))
  }, [id]);

  useEffect(()=>{
    if (!current_badge.loading)
      setPerson({...current_badge.data, precent_deducation:0})
  },[current_badge.data])

  const [person, setPerson] = useState({
    name_ar: "",
    name_en: "",
    name_fr: "",
    precent_deducation: 0,
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

  function handleprecent_deducationChange(e) {
    setPerson({
      ...person,
      precent_deducation: e.target.value,
    });
  }
  const saveData = async (e) => {
    e.preventDefault();
    try {
      await dispatch(BadgesActions.updateOne({id, badge:person}))
      router.push("/tw-admin/cms/Badges");

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
              onClick={() => router.push("/tw-admin/cms/Badges")}
              className="close-modal"
            >
              <span className="material-icons material-icons-outlined">
                close
              </span>
            </button>
          </div>
        </div>
        <form onSubmit={saveData}>
          {current_badge.loading && getAll("Please_wait")}
          <div className={"panel-modal-body auto-height"}>
            <div className="row">
              <div className="col-sm-4">
                <div className="timlands-form">
                  <label className="label-block" htmlFor="name_ar">
                    اسم الشارة بالعربي
                  </label>
                  <input
                    type="text"
                    id="name_ar"
                    name="name_ar"
                    placeholder="اسم الشارة بالعربي..."
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
                    اسم الشارة بالانجليزي
                  </label>
                  <input
                    type="text"
                    id="name_en"
                    name="name_en"
                    placeholder="اسم الشارة بالانجليزي..."
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
                    اسم الشارة بالفرنسي
                  </label>
                  <input
                    type="text"
                    id="name_fr"
                    name="name_fr"
                    placeholder="اسم الشارة بالفرنسي..."
                    className="timlands-inputs"
                    autoComplete="off"
                    value={person.name_fr}
                    onChange={handlename_frChange}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="timlands-form">
                  <label className="label-block" htmlFor="precent_deducation">
                    نسبة العمولة
                  </label>
                  <input
                    type="number"
                    id="precent_deducation"
                    name="precent_deducation"
                    placeholder="نسبة العمولة..."
                    className="timlands-inputs"
                    autoComplete="off"
                    value={person.precent_deducation}
                    onChange={handleprecent_deducationChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="panel-modal-footer">
            <button
              onClick={() => router.push("/tw-admin/cms/Badges")}
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
