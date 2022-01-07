import React from 'react';
import Select from 'react-select';
import useSWR from 'swr'
import Loading from './Loading';
function Tags() {
    const { data: getTags } = useSWR('dashboard/tags');
    if (!getTags) return <Loading />
    const values = getTags && getTags.data.map((e) => (e.id));
    const labels = getTags && getTags.data.map((e) => (e.name_ar));
    let newArrayofObjects = [];
    for (let key = 0; key < values.length; key++) {
        newArrayofObjects.push({ value: values[key], label: labels[key] });
    }
    const setTagsStateHandle = (e) => {
        console.log(e)
    }
    return (
        <div>
            {getTags && getTags.data !== null && getTags.data.length !== 0 &&
                <Select
                    isMulti
                    notFoundContent="لاتوجد بيانات"
                    style={{ width: "100%" }}
                    //className="timlands-inputs select"
                    placeholder="اختر الوسوم"
                    //value={tagsState}
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
