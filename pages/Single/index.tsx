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
import { ReactElement, useState } from "react";
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

const toppings = [
  {
    id: 1,
    name: "I will record an italian Capsicum",
    price: 11.2
  },
  {
    id: 2,
    name: "I will record an italia nPaneer",
    price: 22.0
  },
  {
    id: 3,
    name: "I will record an italia nRed Paprika",
    price: 2.5
  },
  {
    id: 4,
    name: "I will record an italian Onions",
    price: 33.0
  },
  {
    id: 5,
    name: "I will record an italian Extra Cheese",
    price: 23.5
  },
]

// 
const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

function Single() {
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );
  
  const [total, setTotal] = useState(0);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
  
    setCheckedState(updatedCheckedState);
  
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );
  
    setTotal(totalPrice);
  };
  return (
    <>
      <div className="timwoork-single">
        <div className="row">
          <div className="col-lg-8">
            <div className="timwoork-single-post">
              <div className="timwoork-single-header">
                <h1 className="title">I will record an italian professional voice over</h1>
                <div className="timwoork-single-header-meta d-flex">

                  <ul className="single-header-meta nav me-auto">
                    <li className="user-item">
                      <Link href="/users/Single">
                        <a className="user-link">
                          <img src="/avatar.png" className="circular-center tiny-size" alt="" />
                          Abdelhamid Boumegouass
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="/users/Single">
                        <a className="category-link">
                          <span className="material-icons material-icons-outlined">label</span>
                          Graphics & Designs
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <ul className="single-header-meta nav ml-auto">
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
                  <div className="timwoork-single-product-detailts">

                    <h1>Lorem adipisicing elit. Deleniti</h1>
                    <h2>Lorem adipisicing elit. Deleniti</h2>
                    <ul className="single-list">
                      <li>Lorem adipisicing elit. Deleniti</li>
                      <li>Lorem adipisicing elit. Deleniti
                        <ul>
                          <li>Lorem adipisicing elit</li>
                          <li>Lorem adipisicing elit</li>
                          <li>Lorem adipisicing elit</li>
                          <li>Lorem adipisicing elit</li>
                          <li>Lorem adipisicing elit</li>
                        </ul>
                      </li>
                      <li>Lorem adipisicing elit. Deleniti</li>
                      <li>Lorem adipisicing elit. Deleniti</li>
                      <li>Lorem adipisicing elit. Deleniti</li>
                    </ul>
                    <h3>Lorem adipisicing elit. Deleniti</h3>
                    <p className="text">
                      Lorem adipisicing elit. Deleniti nobis Tempora recusandae omnis  Lorem adipisicing elit. Deleniti nobis Tempora recusandae omnis Lorem adipisicing elit. Deleniti nobis Tempora recusandae omnis corrupti assumenda, laboriosam odio iusto veritatis illo consequatur molestiae quis molestias reiciendis.
                    </p>
                    <h4>Lorem adipisicing elit. Deleniti</h4>
                    <h5>Lorem adipisicing elit. Deleniti</h5>
                    <h6>Lorem adipisicing elit. Deleniti</h6>
                  </div>
                  <div className="timwoork-single-seller-info">
                    <div className="seller-info-container">
                      <div className="d-flex">
                        <div className="seller-info-avatar">
                          <img className="circular-img md-size" src="/avatar.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <div className="add-devloppers-header">
                    <h3 className="title">Available Developers</h3>
                  </div>
                  <ul className="add-devloppers-nav">
                  {toppings.map(({ id, name, price }, index) => {
                    return (
                      <li key={id} className="devloppers-item">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id={"flexCheckDefault-id" + id} 
                            value={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index)}
                            />
                          <label className="form-check-label" htmlFor={"flexCheckDefault-id" + id}>
                            {name}
                          </label>
                        </div>
                        <div className="devloppers-price">
                          <p className="price-number">{price}$</p>
                        </div>
                      </li>
                    )})}
                  </ul>
                </div>
                <div className="panel-aside-footer">
                  <div className="aside-footer-total-price">
                    <h1 className="price-total me-auto">
                      <strong>Total: </strong> {getFormattedPrice(total)}$
                    </h1>
                    <div className="bayers-count">
                      <p className="num">
                        <span className="count">5 </span>
                        <span className="text"> Bayers</span>
                      </p>
                    </div>
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