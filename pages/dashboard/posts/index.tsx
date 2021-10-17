//import Link from "next/link";
import { logout } from "./../../../store/auth/authActions";
import { connect } from "react-redux";
import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";

const postsList = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 2,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 3,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 4,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 5,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 6,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
    {
        id: 7,
        title: 'Lorem ipsum dolor sit amet consectetur, adipisicing',
        status: true,
        user: {
            id: 5,
            first_name: 'Abdelhamid',
            lastname: 'Boumegouass'
        },
        time: '7 days ago'
    },
]

function TestPage(props: any): ReactElement {

    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>Posts & Categories</h2>
                </div>
                <Alert type="warning">
                    <p className="text"><span className="material-icons material-icons-outlined">report_problem</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, voluptas iure repellendus minima unde facere?</p>
                </Alert>
                <div className="timlands-table-filter">
                    <div className="row">
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <select className="timlands-inputs" name="filterUser">
                                    <option value="">Filter by Users</option>
                                    <option value="">Abdelhamid</option>
                                    <option value="">Tarek Aroui</option>
                                    <option value="">Diaa Abdellah</option>
                                    <option value="">Ehadi Abdellah</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
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
                                <th>Title</th>
                                <th>Status</th>
                                <th>Author</th>
                                <th>Created at</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList.map(e => (
                                <tr key={e.id}>
                                    <td>{e.title}</td>
                                    <td>{e.status ? 'eee' : 'dd'}</td>
                                    <td>{e.user.first_name + " " + e.user.lastname}</td>
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
TestPage.getLayout = function getLayout(page): ReactElement {
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

export default connect(mapStateToProps, { logout })(TestPage);
