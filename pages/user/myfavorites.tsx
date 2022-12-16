import React, { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import Navbar from "components/Portfolio/navbar";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Empty } from "antd";
import { FavoritesActions } from "@/store/favorites/favoritesAction";
import Loading from "@/components/Loading";

function Index() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    favorites,
  } = useAppSelector((state) => state);
  useEffect(() => {
    if (favorites.loaded) return;
    dispatch(FavoritesActions.getFavorites());
  }, [favorites.loaded]);
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Favorite")}
        metaDescription={getAll("Favorite")}
        ogDescription={getAll("Favorite")}
      />
      <div className="portfolios-container">
        <PortfolioProfileHeader showAddBtn={false} />
        <Navbar active="favorite" />

        <div className="portfolios-content">
          <div className="row">
            {!favorites.loading &&
              favorites.data.map((item) => (
                <div key={item.id} className="col-sm-6 col-lg-3">
                  <Portfolio
                    title={item.title}
                    thumbnail={item.cover_url}
                    slug={item.id}
                    fans_count={item.fans_count}
                    likes={false}
                    author={"Abdelhamid Boumegouas"}
                    level={`New Seller`}
                    avatar={`/avatar.png`}
                    views={72868}
                    username={`aboumegouass`}
                    user={false}
                  />
                </div>
              ))}
            {favorites.loading && <Loading />}
            {!favorites.loading && favorites.data.length === 0 && (
              <div className="bg-white py-3 rounded mb-3">
                <Empty
                  image="/hero.png"
                  imageStyle={{
                    height: 100,
                  }}
                  description={<span>{getAll("Favorites_projects")}</span>}
                ></Empty>
              </div>
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
