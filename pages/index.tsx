import { Menu, Dropdown, Button } from "antd";
import { PRIMARY } from "../styles/variables";
import PostsAside from "@/components/PostsAside";
import Hero from "@/components/Header/Hero";
import VideoAside from "@/components/VideoSection/VideoAside";
import { ReactElement, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import router from "next/router";
import Categories from "@/components/Categories";
import LayoutHome from "@/components/Layout/indexLayout";
import getTranslatedMeta from "utils/translatedMeta";
import { ProductsActions } from "@/store/products/productActions";
function index() {
  const dispatch = useAppDispatch();
  const {
    products: { popular, best_seller, latest },
    categories: { all: categories },
    languages: { getAll },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!latest.loaded) dispatch(ProductsActions.getLatestProducts());
    if (!best_seller.loaded) dispatch(ProductsActions.getSellingProducts());
  }, [latest, best_seller]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/+905519951407"
        >
          <i className="fab fa-whatsapp fa-fw"></i>
          {getAll("WhatsApp")}
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/timwoorkDotCom"
        >
          <i className="fab fa-telegram fa-fw"></i>
          {getAll("Telegram")}
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Hero />
      <VideoAside />

      <Categories
        onClickCategory={(id) => router.push(`/products?categoryID=${id}`)}
        href={`/products?categoryID=`}
        categories={categories}
      />
      {best_seller.data.length !== 0 && (
        <PostsAside
          PostData={best_seller.data}
          title={getAll("Top_selling_services")}
          linkURL="/products/best-seller"
          more={getAll("More")}
        />
      )}
      {popular.data.length !== 0 && (
        <PostsAside
          PostData={popular.data}
          title={getAll("Most_popular_services")}
          linkURL="/products/popular"
          more={getAll("More")}
        />
      )}
      {latest.data.length !== 0 && (
        <PostsAside
          PostData={latest.data}
          title={getAll("Newly_added_services")}
          linkURL="/products/latest"
          more={getAll("More")}
        />
      )}
      <div
        className="shadow"
        style={{
          position: "fixed",
          bottom: "2rem",
          borderRadius: "50%",
          zIndex: 999,
        }}
      >
        <Dropdown overlay={menu} placement="topCenter" arrow>
          <Button
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              padding: "0",
              color: PRIMARY,
              borderColor: PRIMARY,
            }}
          >
            <i className="fa fa-comments fa-3x"></i>
          </Button>
        </Dropdown>
      </div>
    </>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <LayoutHome dark={true}>{page}</LayoutHome>;
};

export default index;
export async function getServerSideProps(ctx: any) {
  return { props: { meta: getTranslatedMeta({ ctx }) } };
}
