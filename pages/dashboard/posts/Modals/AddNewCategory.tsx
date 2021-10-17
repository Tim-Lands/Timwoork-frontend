import { Alert } from "@/components/Alert/Alert"
import axios from "axios"
import { motion } from "framer-motion"
import { ReactElement, useState } from "react"
import PropTypes from "prop-types";

export default function AddNewCategory({ setIsModalHiddenHandle }): ReactElement {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const saveInformations = async event => {
        event.preventDefault()
        // Enable Loading Spinner
        setIsLoading(true)
        
        const name = event.target.name.value
        const categoriesIcons = event.target.categoriesIcons.value
        try {
            const res = await axios.post("/login", {
                name,
                categoriesIcons,
            });
            // If Activate Network 
            setIsError(false)
            // Authentication was successful.
            if (res.status) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            // If Disactivate Network 
            setIsError(true)
        }
    }
    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>Add New Category</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={setIsModalHiddenHandle} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>
                <form onSubmit={saveInformations}>
                    <div className={"panel-modal-body"}>
                        {isLoading &&
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </motion.div>
                        }
                        {isError &&
                            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
                                <Alert type="error">
                                    <p className="text"><span className="material-icons material-icons-outlined">cancel</span> Error Network. Please try again</p>
                                </Alert>
                            </motion.div>
                        }
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="category-name">Category Name</label>
                                    <input
                                        id="category-name"
                                        name="name"
                                        placeholder="Enter Category Name..."
                                        className="timlands-input"
                                    />
                                    {/* Shor error message if given. */}
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note">
                                            <p className="text">Lorem ipsum dolor sit amet consectetur elite!</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="categories-icons">Icons</label>
                                    <select
                                        id="categories-icons"
                                        name="categoriesIcons"
                                        className="timlands-input"
                                    >
                                        <option value="">Audio</option>
                                        <option value="">Audio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-modal-footer">
                        <button onClick={setIsModalHiddenHandle} type="button" className="btn butt-red butt-sm me-auto">Cancel</button>
                        <button type="submit" className="btn butt-primary butt-sm">Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    )
}
AddNewCategory.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};