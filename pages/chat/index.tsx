import React, { ReactElement } from 'react'
import Layout from '@/components/Layout/HomeLayout'

function index() {
    return (
        <div>
            
        </div>
    )
}
index.getLayout = function getLayout(page: any): ReactElement {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }
export default index
