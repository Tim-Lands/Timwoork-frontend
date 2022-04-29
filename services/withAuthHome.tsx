import { useRouter } from "next/router";
import Cookies from 'js-cookie'

const withAuth = (WrappedComponent: any) => {
    let token = Cookies.get('token')
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem('token');
    return (props: any) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();
            // If there is no access token we redirect to "/" page.
            if (!token) {
                Router.replace("/login");
                return null;
            }
            // If this is an accessToken we just render the component that was passed with all its props
            return <WrappedComponent {...props} />;
        }
        // If we are on server, return null
        return null;
    };
};

export default withAuth;