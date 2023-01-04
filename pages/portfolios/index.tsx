import React, { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Pagination from "react-js-pagination";
import Portfolio from "@/components/Post/Portfolio";
import PortfolioNav from "@/components/Portfolio/PortfolioNav";
import PortfolioSliders from "@/components/Portfolio/PortfolioSlider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";
import router from "next/router";
import Loading from "@/components/Loading";
import { Result } from "antd";

function Index() {
  const dispatch = useAppDispatch();
  const {
    user,

    user: { id: meId },
    languages: { getAll },
    portfolio: { all, project },
  } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(
      PortfolioActions.getUsersProjects({
        current_page: all.current_page,
        category_id: all.category_id,
      })
    );
  }, [all.current_page, all.category_id]);

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
      />
      <PortfolioSliders />
      <div className="portfolios-container">
        <PortfolioNav />
        <div className="portfolios-content">
          <div className="row">
            {!all.loading &&
              all.data.map((portfolio) => {
                return (
                  <div className="col-sm-6 col-lg-3" key={portfolio.id}>
                    <Portfolio
                      title={portfolio.title}
                      thumbnail={portfolio.cover_url}
                      slug={portfolio.id}
                      author={portfolio.seller.profile.full_name}
                      level={portfolio.seller.profile.level.name}
                      avatar={portfolio.seller.profile.avatar_url}
                      views={portfolio.views}
                      isLiked={portfolio.is_liked}
                      fans_count={portfolio.fans_count}
                      likes={portfolio.seller.profile_id === meId}
                      username={
                        portfolio.seller.profile_id === meId
                          ? "me"
                          : portfolio.seller.profile_id
                      }
                      onLike={async () => {
                        if (!user.isLogged) router.push("/login");
                        dispatch(PortfolioActions.toggleLikeAll(portfolio.id));
                        await dispatch(
                          PortfolioActions.toggleLikeBack({ id: portfolio.id })
                        );

                        if (project.id == portfolio.id) {
                          dispatch(
                            PortfolioActions.getUserProject({ id: project.id })
                          );
                        }
                      }}
                      user={false}
                    />
                  </div>
                );
              })}
            {all.loading && <Loading />}
            {all.data.length === 0 && !all.loading && (
              <Result
                status="404"
                title={getAll("No_data")}
                subTitle={getAll("There_are_no_more")}
              />
            )}
            {all.last_page > 1 && (
              <Pagination
                activePage={all.current_page}
                itemsCountPerPage={all.per_page}
                totalItemsCount={all.total}
                onChange={(page) => {
                  dispatch(PortfolioActions.setPage(page));
                }}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                className="productPagination"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
Index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Index;
