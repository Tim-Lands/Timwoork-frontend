import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import 'react-slideshow-image/dist/styles.css'
import useSWR from "swr";
import Loading from '@/components/Loading'
import { message } from 'antd'
import PropTypes from "prop-types";

// 
function Single({ query }) {

  const { data: ProductData }: any = useSWR(`api/product/${query.product}`)
  if (!ProductData) { message.loading('يرجى الإنتظار...') }

  return (
    <>
      {!ProductData && <Loading />}
      {ProductData &&
        <div className="timwoork-single">
          kjhshskjd {query.product}
        </div>
      }
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