import React from "react";
import PortfolioSlider from "@/components/Post/PortfolioSlider";

function PortfolioSliders() {
  return (
    <div className="portfolios-slider">
      <div className="row">
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://i.pinimg.com/736x/7e/90/4b/7e904beaf84643862390894801aa2895.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://lopamudracreative.com/wp-content/uploads/2018/08/black-birdie-thumb-image-1_o.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://plana.ae/uploads/1/2020-09/7_graphic_design.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://pbs.twimg.com/media/FWhCIAHXEAAEYzB?format=jpg&name=large`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
      </div>
    </div>
  );
}

export default PortfolioSliders;
