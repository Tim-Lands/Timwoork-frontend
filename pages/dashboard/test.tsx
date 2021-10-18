import Link from "next/link";
import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";

function TestPage(props: any): ReactElement {
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
              <div className="timlands-panel-header">
                  <h2 className="title"><span className="material-icons material-icons-outlined">dashboard</span>Dashboard</h2>
              </div>
              <Alert type="warning">
                  <p className="text"><span className="material-icons material-icons-outlined">report_problem</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, voluptas iure repellendus minima unde facere?</p>
              </Alert>
              <div className="row">
                  <div className="col-md-4">
                    <div className="timlands-panel-item">
                        <div className="panel-item-header">
                            <h4 className="title">Posts Count</h4>
                        </div>
                        <div className="panel-item-body">
                            <h1 className="count-num"><span className="num-val">1,786</span> Posts</h1>
                            <ul className="details-items">
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="panel-item-footer">
                            <Link href="/">
                                <a className="btn butt-primary butt-sm">Read more</a>
                            </Link>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="timlands-panel-item">
                        <div className="panel-item-header">
                            <h4 className="title">Posts Count</h4>
                        </div>
                        <div className="panel-item-body">
                            <h1 className="count-num"><span className="num-val">1,786</span> Posts</h1>
                            <ul className="details-items">
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="panel-item-footer">
                            <Link href="/">
                                <a className="btn butt-green butt-sm">Read more</a>
                            </Link>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="timlands-panel-item">
                        <div className="panel-item-header">
                            <h4 className="title">Posts Count</h4>
                        </div>
                        <div className="panel-item-body">
                            <h1 className="count-num"><span className="num-val">1,786</span> Posts</h1>
                            <ul className="details-items">
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="panel-item-footer">
                            <Link href="/">
                                <a className="btn butt-primary butt-sm">Read more</a>
                            </Link>
                        </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="timlands-panel-item">
                        <div className="panel-item-header">
                            <h4 className="title">Posts Count</h4>
                        </div>
                        <div className="panel-item-body">
                            <h1 className="count-num"><span className="num-val">1,786</span> Posts</h1>
                            <ul className="details-items">
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex">
                                        <div className="det-prop">
                                            <p className="text">Post delevry</p>
                                        </div>
                                        <div className="det-val">
                                            <p className="text">25.00$</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="panel-item-footer">
                            <Link href="/">
                                <a className="btn butt-primary butt-sm">Read more</a>
                            </Link>
                        </div>
                    </div>
                  </div>
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
export default TestPage;
