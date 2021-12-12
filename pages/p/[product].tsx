import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";

// 
function Single({ query }) {
  return (
    <>
        <div className="timwoork-single">
          kjhshskjd {query.product}
        </div>
      
    </>
  );
}
Single.getLayout = function getLayout(page: any): ReactElement {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default Single;

Single.getInitialProps = ({ query }) => {
    return { query }
}
Single.propTypes = {
  query: PropTypes.any,
};