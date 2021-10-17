/*
|--------------------------------------------------------------------------
| The home page.
|--------------------------------------------------------------------------
|
| The home page of your application.
|
*/
import Link from "next/link";
import Layout from '../components/Layout/HomeLayout'
import { ReactElement } from "react";
//import { Alert } from "@/components/Alert/Alert";
//import { Navbar } from "@/components/Navigation/Navbar";
import Hero from "@/components/Hero";
import PostsAside from "@/components/PostsAside";
import { connect } from "react-redux";
import { logout } from "./../store/auth/authActions";

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
  {
      id: 2,
      title: 'Voluptate aliquam temporibus necessitatibus sit accusamus',
      author: 'Tarek Aroui',
      rate: 5,
      price: 36,
      postUrl: '/Single',
      thumbnail: '/photographer.jpg',
      period: 5,
      buyers: 0,
      userUrl: '/user'
  },
  {
      id: 3,
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
  {
      id: 4,
      title: 'Voluptate aliquam temporibus necessitatibus sit accusamus',
      author: 'Tarek Aroui',
      rate: 5,
      price: 36,
      postUrl: '/Single',
      thumbnail: '/photographer.jpg',
      period: 5,
      buyers: 0,
      userUrl: '/user'
  },
]

function Home() {
  return (
    <>
      {/*<Alert type="primary">What do you want to do?</Alert>*/}
      <Hero />
      <div className="timwoork-nanny-home">
        <div className="d-flex">
          <div className="nanny-home-image">
            <img src="/undraw_winter_designer_a2m7.svg" alt="" />
          </div>
          <div className="nanny-home-content">
            <h2 className="title">Lorem ipsum dolor sit amet, consectetur</h2>
            <p className="text">Excepteur sint occaecat voluptate velit esse cillum dolore eu fugiat nulla cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            <div className="py-3">
              <Link href="/">
                <a className="btn butt-primary butt-md">Create Account</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <PostsAside title="Lorem ipsum dolor sit amet" PostData={testServices} />
      <PostsAside title="Lorem ipsum dolor sit amet" PostData={testServices} />
      <PostsAside title="Lorem ipsum dolor sit amet" PostData={testServices} />
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo amet a cupiditate quasi impedit corporis incidunt et vitae fugiat, repudiandae quos, in voluptate aliquam temporibus necessitatibus sit accusamus ad mollitia.</h1>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo amet a cupiditate quasi impedit corporis incidunt et vitae fugiat, repudiandae quos, in voluptate aliquam temporibus necessitatibus sit accusamus ad mollitia.</h1>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo amet a cupiditate quasi impedit corporis incidunt et vitae fugiat, repudiandae quos, in voluptate aliquam temporibus necessitatibus sit accusamus ad mollitia.</h1>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo amet a cupiditate quasi impedit corporis incidunt et vitae fugiat, repudiandae quos, in voluptate aliquam temporibus necessitatibus sit accusamus ad mollitia.</h1>
    </>
  );
}
Home.getLayout = function getLayout(page): ReactElement {
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
export default connect(mapStateToProps, { logout })(Home);