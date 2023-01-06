import React, { useEffect } from "react";
import PortfolioSlider from "@/components/Post/PortfolioSlider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";

function PortfolioSliders() {
  const { topSellers } = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(PortfolioActions.getTopSellers({}));
  }, []);

  return (
    <div className="portfolios-slider">
      <div className="row">
        {topSellers.data.map((seller) => (
          <div key={seller.id} className="col-sm-6 col-xl-3 p-0 slider-inner">
            <PortfolioSlider
              thumbnail={seller.portfolio_cover_url||'/avatar.png '}
              author={seller.full_name}
              level={seller.level_name}
              username={seller.user_id.toString()}
              avatar={seller.avatar_url}
            />
          </div>
        ))}
  
      </div>
    </div>
  );
}

export default PortfolioSliders;
