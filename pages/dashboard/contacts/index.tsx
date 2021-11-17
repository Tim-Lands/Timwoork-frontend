import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";

const postsList = [
    {
        id: 1,
        fullName: 'Tarek Aroui',
        email: 'tarekaroui@gmail.com',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
        time: '7 days ago'
    },
    {
        id: 2,
        fullName: 'Tarek Aroui',
        email: 'tarekaroui@gmail.com',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
        time: '7 days ago'
    },
    {
        id: 3,
        fullName: 'Tarek Aroui',
        email: 'tarekaroui@gmail.com',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
        time: '7 days ago'
    },
]

function index(props: any): ReactElement {

    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">email</span>Contacts</h2>
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
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Created at</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList.map(e => (
                                <tr key={e.id}>
                                    <td>{e.fullName}</td>
                                    <td>{e.email}</td>
                                    <td>{e.title}</td>
                                    <td>{e.time}</td>
                                    <td className="tools-col">
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
index.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
export default index;
