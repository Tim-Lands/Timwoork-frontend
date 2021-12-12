import Layout from '@/components/Layout/HomeLayout'
import { ReactElement } from "react";
import 'react-slideshow-image/dist/styles.css'
// 
function Single() {

  //const { data: ProductData }: any = useSWR(`api/product/${query.product}`)
  //if (!ProductData) { message.loading('يرجى الإنتظار...') }

  return (
    <>
        <div className="timwoork-single">
          kjhshskjd
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