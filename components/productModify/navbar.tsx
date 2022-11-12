import { ReactElement } from "react";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import router from "next/router";
function Navbar({
  active,
  navigate,
  id,
  url,
  descriptionClass,
  galleryClass,
  priceClass,
}: {
  active: string;
  navigate: boolean;
  id?: string;
  url: string;
  descriptionClass?: string;
  galleryClass?: string;
  priceClass?: string;
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const general = useRef(null);
  const price = useRef(null);
  const description = useRef(null);
  const gallery = useRef(null);
  const publish = useRef(null);
  useEffect(() => {
    switch (active) {
      case "general":
        general.current.scrollIntoView();
        return;
      case "price":
        price.current.scrollIntoView();
        return;
      case "description":
        description.current.scrollIntoView();
        return;
      case "gallery":
        gallery.current.scrollIntoView();
        return;
      case "publish":
        publish.current.scrollIntoView();
        return;
    }
  }, [active]);
  return (
    <div className="timlands-steps-cont">
      <div className="timlands-steps">
        <div
          className={`timlands-step-item ${
            active === "general" ? "active" : ""
          } `}
          ref={general}
          onClick={() => {
            if (navigate) router.push(`/${url}/overview?id=${id}`);
          }}
        >
          <h4 className="text">
            <span className="icon-circular">
              <span className="material-icons material-icons-outlined">
                collections_bookmark
              </span>
            </span>
            {getAll("General_information")}
          </h4>
        </div>
        <div
          className={`timlands-step-item ${
            active === "price" ? "active" : ""
          } ${priceClass || ""}`}
          onClick={() => {
            if (navigate) router.push(`/${url}/prices?id=${id}`);
          }}
          ref={price}
        >
          <h4 className="text">
            <span className="icon-circular">
              <span className="material-icons material-icons-outlined">
                payments
              </span>
            </span>
            {getAll("Upgrades_price")}
          </h4>
        </div>
        <div
          className={`timlands-step-item ${
            active === "description" ? "active" : ""
          } ${descriptionClass || ""}`}
          ref={description}
          onClick={() => {
            if (navigate) router.push(`/${url}/description?id=${id}`);
          }}
        >
          <h4 className="text">
            <span className="icon-circular">
              <span className="material-icons material-icons-outlined">
                description
              </span>
            </span>
            {getAll("Description_and_instructions")}
          </h4>
        </div>
        <div
          className={`timlands-step-item ${
            active === "gallery" ? "active" : ""
          } ${galleryClass || ""}`}
          ref={gallery}
          onClick={() => {
            if (navigate) router.push(`/${url}/medias?id=${id}`);
          }}
        >
          <h3 className="text">
            <span className="icon-circular">
              <span className="material-icons material-icons-outlined">
                mms
              </span>
            </span>
            {getAll("Gallery_and_folders")}
          </h3>
        </div>
        <div
          className={`timlands-step-item ${
            active === "publish" ? "active" : ""
          } `}
          ref={publish}
          onClick={() => {
            if (navigate) router.push(`/${url}/complete?id=${id}`);
          }}
        >
          <h3 className="text">
            <span className="icon-circular">
              <span className="material-icons material-icons-outlined">
                publish
              </span>
            </span>
            {getAll("Publish_service")}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
