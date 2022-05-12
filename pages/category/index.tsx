import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MetaTags } from "@/components/SEO/MetaTags";

function index() {
  const { data: categories }: any = useSWR(`api/categories`);

  categories &&
    categories.data.sort((a, b) => {
      if (a.subcategories.length < b.subcategories.length) {
        return -1;
      }
    });
  return (
    <div className="row py-4 d-flex justify-content-center align-items-center">
      <MetaTags
        title="التصنيفات"
        metaDescription="التصنيفات"
        ogDescription="التصنيفات"
      />
      <div className="col-md-9" style={{ maxWidth: 1300 }}>
        <div className="app-bill">
          <div className="app-bill-header">
            <h3 className="title">صفحة التصنيفات</h3>
          </div>
          <div className="app-bill-content">
            {!categories && <Loading />}
            <div className="row">
              {categories &&
                categories.data.map((e: any) => (
                  <div className="col-md-3" key={e.id}>
                    <div className="category-item">
                      <div className="category-item-title">
                        <h3 className="title">
                          <span
                            className={"material-icons material-icons-outlined"}
                          >
                            {e.icon}
                          </span>{" "}
                          {e.name_ar}
                        </h3>
                      </div>
                      <ul className="category-item-content">
                        {e.subcategories &&
                          e.subcategories.map((item: any) => (
                            <li key={item.id}>
                              <Link href={`/category/${item.id}`}>
                                {item.name_ar}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
