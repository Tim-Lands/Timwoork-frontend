import React from 'react';
import Select from 'react-select';
import Loading from './Loading';
import PropTypes from "prop-types";

const Tags = ({ placeholder, values, labels, selected }) => {

    let checked =[''];

    if (!values) return <Loading />
   
    let newArrayofObjects = [];
    for (let key = 0; key < values.length; key++) {
        newArrayofObjects.push({ value: values[key], label: labels[key] });
    }
    const setTagsStateHandle = (e) => {
       checked= Array.isArray(e)?e.map(x=>x.value):[]; //selected array of value
        console.log(values)
        console.log("newArrayofObjects")
        selected(checked) 
    }
    return (
        <div>
            {values !== null && values.length !== 0 &&
                <Select
                    isMulti
                    notFoundContent="لاتوجد بيانات"
                    style={{ width: "100%" }}
                    //className="timlands-inputs select"
                    placeholder={placeholder}
                    onChange={setTagsStateHandle}  
                    options={newArrayofObjects}
                //components={makeAnimated()}
                >
                </Select>
            }

        </div>
    );
}
export default Tags;
Tags.propTypes = {
    placeholder: PropTypes.any,
    values: PropTypes.any,
    labels: PropTypes.any,
    selected: PropTypes.any,
}