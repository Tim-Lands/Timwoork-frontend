import { useAppSelector } from "@/store/hooks";
import { ReactElement } from "react";

function Tips(): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="add-product-advices pt-0 ">
      <img className="advice-img" src="/1999310.png" alt="" />
      <h3 className="advice-title">{getAll("Add_New_project_advices")}</h3>
      <ul className="advice-list">
        <li>{getAll("Add_a_brief")}</li>
        <li>{getAll("Choose_the_suitable")}</li>
        <li>{getAll("Write_an_attractive")}</li>
        <li>{getAll("Add_an_expressive")}</li>
        <li>{getAll("Set_an_appropriate")}</li>
        <li>{getAll("Set_the_delivery")}</li>
        <li> {getAll("Add_development_that")}</li>
      </ul>
    </div>
  );
}
export default Tips;
