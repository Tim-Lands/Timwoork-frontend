import API from "../../../config";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Posts from '@/components/Dashboard/posts'
import cookies from "next-cookies";
function index({ pageNumber = 1, postsData }): ReactElement {
  const [postsList, setPostsList] = useState(postsData)
  useEffect(() => {
    setPostsList(postsData)
  }, [postsData])
  console.log(pageNumber)
  return (
    <>
      <div className="timlands-panel">
        <Posts status="archieved" postsList={postsList} onChangePostsList={setPostsList} />

      </div>
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(ctx) {
  const pageNumber = ctx.query.pageNumber
  const search = ctx.query.search
  if (!pageNumber)
    return {
      redirect: {
        permanent: false,
        destination: "archived?pageNumber=1"
      }
    }
  const token = cookies(ctx).token_dash || ""
  const params = { page: pageNumber, status: 1, like: search && `title,${search}` }
  try {
    console.log(token)
    const res = await API.get("dashboard/products", {
      params,
      headers: { Authorization: `Bearer ${token}` },
    })
    // Pass data to the page via props
    return {
      props: {
        postsData: {
          last_page: res.data.data.last_page,
          per_page: res.data.data.per_page,
          data: res.data.data.data
        },
        pageNumber: pageNumber, errorFetch: false
      }
    }

  } catch (error) {
    return { props: { postsData: null, pageNumber, errorFetch: true } }
  }
}

export default index;
