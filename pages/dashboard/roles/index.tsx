import { logout } from "../../../store/auth/authActions";
import { connect } from "react-redux";
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewCategory from "./Modals/AddNewRole";

const postsList = [
    {
        id: 1,
        title: 'Recording & Audio',
        icon: 'headphones',
        subCategories: [],
        time: '7 days ago'
    },
]

function Categories(): ReactElement {
    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
    }
    // Return statement.
    return (
        <>
            {isModalShowen && <AddNewCategory setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title">
                        <span className="material-icons material-icons-outlined">rule</span>Roles
                    </h2>
                    <div className="header-butt">
                        <button onClick={setIsModalShowenHandle} className="btn butt-sm butt-green d-flex align-items-center"><span className="material-icons material-icons-outlined">add_box</span> Add New</button>
                    </div>
                </div>
                <Alert type="success">
                    <p className="text"><span className="material-icons material-icons-outlined">check_circle</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, voluptas iure repellendus minima unde facere?</p>
                </Alert>
                <div className="timlands-table-filter">
                    <div className="row">
                        <div className="col-sm-6 filter-form">
                            <div className="form-container">
                                <input className="timlands-inputs" placeholder="Search in Table List...." name="filterStatus" />
                            </div>
                        </div>
                        <div className="col-sm-4 filter-form">
                            <div className="form-container">
                                <select className="timlands-inputs" name="filterStatus">
                                    <option value="">Status</option>
                                    <option value="">All</option>
                                    <option value="">Active</option>
                                    <option value="">Disactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Created at</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList.map((e, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="material-icons material-icons-outlined">{e.icon}</span>
                                            {e.title}
                                        </div>
                                    </td>
                                    <td>{e.time}</td>
                                    <td className="tools-col">
                                        <button className="table-del warning">
                                            <span className="material-icons material-icons-outlined">
                                                edit
                                            </span>
                                        </button>
                                        <button className="table-del error">
                                            <span className="material-icons material-icons-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Categories.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});

export default connect(mapStateToProps, { logout })(Categories);
