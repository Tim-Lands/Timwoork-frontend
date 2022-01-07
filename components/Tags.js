import React from 'react';
import Select from 'react-select';
import useSWR from 'swr'
import { ReactElement, useEffect, useState } from "react";
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import router from 'next/router';
import Cookies from 'js-cookie'
import * as Yup from 'yup';
import PropTypes from "prop-types";

function Tags () {

    const [tagsState, setTagsState] = useState([])
    const { data: getTags } = useSWR('dashboard/tags');

    const values = getTags && getTags.data.map((e) => (e.id));
    const labels = getTags && getTags.data.map((e) => (e.name_ar));
    let newArrayofObjects = [];
    // [{value:1, label: "sss"}, {value:2, label: "dd"} ]

      for(let key = 0; key < values.length; key++) {
          newArrayofObjects.push({value : values[key], label : labels[key]});
      }
    const setTagsStateHandle = (e) => {
        
        setTagsState(e)
       }
   
    
  return (
   
        <div>
            <Select
                isMulti
                notFoundContent="لاتوجد بيانات"
                style={{ width: "100%" }}
                //className="timlands-inputs select"
                placeholder="اختر الوسوم"
               // value={tagsState}
                onChange={setTagsStateHandle}
                options={ newArrayofObjects}
                //components={makeAnimated()}
            >
            </Select>
       
        </div>
  );  
}
export default Tags;
