/*
|--------------------------------------------------------------------------
| The home page.
|--------------------------------------------------------------------------
|
| The home page of your application.
|
*/
import Link from "next/link";
import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
//import { Alert } from "@/components/Alert/Alert";
//import { Navbar } from "@/components/Navigation/Navbar";
import PostsAside from "@/components/PostsAside";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const testServices = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur',
    author: 'Abdelhamid Boumegouas',
    rate: 4,
    price: 40,
    postUrl: '/Single',
    thumbnail: '/homepage.jpg',
    period: 9,
    buyers: 5,
    userUrl: '/user'
  },
]
const slideImages = [
  "/slide_2.png",
  "/slide_3.jpg",
  "/homepage.jpg"
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: <div className="arrow-navigations" style={{ width: "30px", marginRight: "-30px" }}><span className="material-icons-outlined">chevron_left</span></div>,
  nextArrow: <div className="arrow-navigations" style={{ width: "30px", marginLeft: "-30px" }}><span className="material-icons-outlined">chevron_right</span></div>
}
function Single() {
  return (
    <>
      <div className="timwoork-single">
        <div className="row">
          <div className="col-lg-8">
            <div className="timwoork-single-post">
              <div className="timwoork-single-header">
                <h1 className="title">I will record an italian professional voice over</h1>
                <ul className="single-header-meta nav">
                  <li className="rate-stars">
                    <span className="stars-icons">
                      <span className="material-icons-outlined">star</span>
                      <span className="material-icons-outlined">star</span>
                      <span className="material-icons-outlined">star</span>
                      <span className="material-icons-outlined">star</span>
                      <span className="material-icons-outlined outline-star">star_border</span>
                    </span>
                    <span className="stars-count">
                      (90)
                    </span>
                  </li>
                  <li className="level-item">
                    <span className="text-level">
                      Level
                    </span>
                    <span className="value-level">
                      Level Name
                    </span>
                  </li>
                </ul>
              </div>
              <div className="timwoork-single-content">
                <div className="timwoork-single-content-body">
                  <br />
                  <div>
                    <Slide {...properties}>
                      {slideImages.map((each, index) => (
                        <div key={index} className="each-slide">
                          <div className="images-slider" style={{ backgroundImage: `url(${each})` }}>
                            <div className="caption-descriptions">
                              <p className="text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, reiciendis.</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slide>
                  </div>

                  <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quas, beatae doloremque tenetur repellat, eveniet aliquid repudiandae voluptates fugit odit et ullam corrupti eius! Veniam culpa aliquid illum deserunt ipsa.</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-sidebar">
              <div className="single-panel-aside">
                <div className="panel-aside-header">
                  <ul className="nav top-aside-nav">
                    <li className="cat-post">
                      <Link href="">
                        <a>
                          <span className="material-icons material-icons-outlined">label</span>Graphics & Designs
                        </a>
                      </Link>
                    </li>
                    <li className="delevr-time">
                      <span className="material-icons material-icons-outlined">timer</span>2 Days Delivery
                    </li>
                  </ul>
                </div>
                <div className="panel-aside-body">
                  <div className="bayers-count">
                    <p className="num">
                      <span className="count">5 </span>
                      <span className="text"> Bayers</span>
                    </p>
                  </div>
                  <ul className="add-devloppers-nav">
                    <li className="devloppers-item">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Default checkbox
                        </label>
                      </div>
                      <div className="devloppers-price">
                        <p className="price-number">19.00$</p>
                      </div>
                    </li>
                    <li className="devloppers-item">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Default checkbox
                        </label>
                      </div>
                      <div className="devloppers-price">
                        <p className="price-number">19.00$</p>
                      </div>
                    </li>
                    <li className="devloppers-item">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Default checkbox
                        </label>
                      </div>
                      <div className="devloppers-price">
                        <p className="price-number">19.00$</p>
                      </div>
                    </li>
                    <li className="devloppers-item">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Default checkbox
                        </label>
                      </div>
                      <div className="devloppers-price">
                        <p className="price-number">19.00$</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="panel-aside-footer">
                  <div className="aside-footer-total-price">
                    <h1 className="price-total">
                      945.00$
                    </h1>
                  </div>
                  <div className="aside-footer-note">
                    <p className="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, unde? Numquam, autem?</p>
                  </div>
                  <div className="aside-footer-addtocart">
                    <button className="btn butt-primary butt-lg">
                      <span className="material-icons material-icons-outlined">add_shopping_cart</span>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostsAside title="Graphics & Designs" PostData={testServices} />
    </>
  );
}
Single.getLayout = function getLayout(page): ReactElement {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.registerLoading,
});
export default connect(mapStateToProps, { logout })(Single);