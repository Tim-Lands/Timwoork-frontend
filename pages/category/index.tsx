import React, { ReactElement, useEffect, useState } from "react";
import { CategoriesService } from "@/services/categoriesServices";
import { useAppSelector } from "@/store/hooks";

import Layout from "@/components/Layout/HomeLayout";
import Loading from "@/components/Loading";
import Link from "next/link";
import { MetaTags } from "@/components/SEO/MetaTags";

function index() {
  const { getAll, language } = useAppSelector((state) => state.languages);
  const [categories, setCategories]: any = useState([]);

  useEffect(() => {
    CategoriesService.getAllWithSub()
      .then((res) =>
        setCategories(
          res?.sort((a, b) => {
            if (a.subcategories.length < b.subcategories.length) {
              return -1;
            }
          })
        )
      )
      .catch(() => {});
  }, []);

  return (
    <div className="row py-4 d-flex justify-content-center align-items-center">
      <MetaTags
        title={getAll("Categories")}
        metaDescription={getAll("Categories")}
        ogDescription={getAll("Categories")}
      />
      <div className="col-md-9" style={{ maxWidth: 1300 }}>
        <div className="app-bill">
          <div className="app-bill-header">
            <h3 className="title">{getAll("Categories")}</h3>
          </div>
          <div className="app-bill-content">
            {!categories && <Loading />}
            <div className="row">
              {categories?.map((e: any) => (
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
                        e.subcategories.map((item: any) => {
                          return (
                            <li key={item.id} className="item">
                              <Link
                                href={`products?categoryID=${item.parent_id}&subcategoryID=${item.id}`}
                              >
                                {item[which(language)]}
                              </Link>
                            </li>
                          );
                        })}
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
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
