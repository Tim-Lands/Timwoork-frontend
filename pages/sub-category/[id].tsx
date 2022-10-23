import React, { ReactElement, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "@/components/Layout/HomeLayout";
import { CategoriesService } from "@/services/categoriesServices";
import Categories from "@/components/Categories";
import router from "next/router";
function SubCategory({ subCategories }): ReactElement {
  const [subCategoriesState, setSubCategoriesState] = useState([]);
  useEffect(() => {
    if (subCategories) {
      setSubCategoriesState(subCategories.sub_categories);
    }
  }, [subCategories]);

  return (
    <>
      <Categories
        onClickCategory={(id) => router.push(`/category/${id}`)}
        categories={subCategoriesState}
      />
    </>
  );
}
SubCategory.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps({ query }) {
  try {
    const subCategories = await CategoriesService.getOne(query.id);
    return { props: { subCategories } };
  } catch (error) {
    return { props: { subCategories: null } };
  }
}
export default SubCategory;

SubCategory.propTypes = {
  subCategories: PropTypes.any,
};
