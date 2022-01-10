import React from 'react';
import Select from 'react-select';
import useSWR from 'swr'
import Loading from './Loading';

const Tags = (props) => {
    
    let checked =[''];
    const placeholder = props.placeholder;
    const values = props.values;
    const labels = props.labels;

    if (!values) return <Loading />
   
    let newArrayofObjects = [];
    for (let key = 0; key < values.length; key++) {
        newArrayofObjects.push({ value: values[key], label: labels[key] });
    }
    const setTagsStateHandle = (e) => {
       checked= Array.isArray(e)?e.map(x=>x.value):[]; //selected array of value
        console.log(checked)
       
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
