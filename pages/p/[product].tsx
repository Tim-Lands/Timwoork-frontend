import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import useSWR from "swr";
// 
function Single({ query }) {
  const { data: ProductData }: any = useSWR(`api/product/${query.product}`)
  return (
    <>
        {ProductData && <p>dhgd</p>}
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