import React from "react";
import Select from "react-select";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { useAppSelector } from "@/store/hooks";
const Tags = ({ placeholder, values, labels, selected }) => {
  let checked = [""];
  const { getAll } = useAppSelector((state) => state.languages);
  if (!values) return <Loading />;

  let newArrayofObjects = [];
  for (let key = 0; key < values.length; key++) {
    newArrayofObjects.push({ value: values[key], label: labels[key] });
  }
  const setTagsStateHandle = (e) => {
    checked = Array.isArray(e) ? e.map((x) => x.value) : []; //selected array of value
    selected(checked);
  };
  return (
    <div>
      {values !== null && values.length !== 0 && (
        <Select
          isMulti
          notFoundContent={getAll("No_data")}
          style={{ width: "100%" }}
          //className="timlands-inputs select"
          placeholder={placeholder}
          onChange={setTagsStateHandle}
          options={newArrayofObjects}
          //components={makeAnimated()}
        ></Select>
      )}
    </div>
  );
};
export default Tags;
Tags.propTypes = {
  placeholder: PropTypes.any,
  values: PropTypes.any,
  labels: PropTypes.any,
  selected: PropTypes.any,
};
