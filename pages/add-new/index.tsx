import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { logout, loadUser } from "./../../store/auth/authActions";
import Cookies from 'js-cookie'
import router from 'next/router';

import Welcome from './welcome'
import Medias from './medias'
import Overview from './overview'
import Prices from './prices'
import Description from './description'

function index(props: any) {
    props.loadUser()

    const token = Cookies.get('token')
    const currentStep = (props.userInfo && props.userInfo.profile) ? props.userInfo.profile.steps : 0
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [props.userInfo, currentStep])
    switch (currentStep) {
        case 0:
            return <Welcome />
        case 1:
            return <Overview />
        case 2:
            return <Prices />
        case 3:
            return <Description />
        case 4:
            return <Medias />
        default:
            return <Welcome />
    }
}
index.getLayout = function getLayout(page): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout, loadUser })(index);