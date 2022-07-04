import React from "react";
import PortfolioSlider from "@/components/Post/PortfolioSlider";

function PortfolioSliders() {
  return (
    <div className="portfolios-slider">
      <div className="row">
        <div className="col-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
            author={`Ahmed Yahya`}
            level={`VIP Seller`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
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
