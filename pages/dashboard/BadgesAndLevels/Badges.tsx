//import Link from "next/link";
import { logout } from "./../../../store/auth/authActions";
import { connect } from "react-redux";
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewBadge from "./Modal/AddNewBadge";

const postsList = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
    {
        id: 4,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
    {
        id: 5,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
    {
        id: 6,
        title: 'Lorem dolor sit amet',
        time: '7 days ago'
    },
    {
        id: 7,
        title: 'Lorem ipsum dolor sit',
        time: '7 days ago'
    },
]

function Badges(props: any): ReactElement {
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
            {isModalShowen && <AddNewBadge setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">badge</span>Badges</h2>
                    <div className="header-butt">
                        <button onClick={setIsModalShowenHandle} className="btn butt-sm butt-green d-flex align-items-center"><span className="material-icons material-icons-outlined">add_box</span> Add New</button>
                    </div>
                </div>
                <Alert type="warning">
                    <p className="text"><span className="material-icons material-icons-outlined">report_problem</span> Lorem ipsum dolor sit amet adipisicing elit. Repellat, voluptas iure repellendus minima unde facere?</p>
                </Alert>
                <div className="timlands-table-filter">
                    <div className="row">
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
                                <select className="timlands-inputs" name="filterStatus">
                                    <option value="">Select Date</option>
                                    <option value="">Today</option>
                                    <option value="">Yesterday</option>
                                    <option value="">This Week</option>
                                    <option value="">This Mounth</option>
                                    <option value="">This Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4 filter-form">
                            <div className="form-container">
                                <input className="timlands-inputs" placeholder="Search in Table List...." name="filterStatus" />
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
                                <th>Badge Name</th>
                                <th>Created at</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList.map(e => (
                                <tr key={e.id}>
                                    <td>{e.title}</td>
                                    <td>{e.time}</td>
                                    <td className="tools-col">
                                        <button className="table-del warning">
                                            <span className="material-icons material-icons-outlined">
                                                cancel
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
            <button onClick={() => { props.logout(); }}>
                Logout
            </button>
        </>
    );
}
Badges.getLayout = function getLayout(page): ReactElement {
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

export default connect(mapStateToProps, { logout })(Badges);
