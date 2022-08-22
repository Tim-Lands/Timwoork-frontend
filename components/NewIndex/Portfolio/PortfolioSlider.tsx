import React from "react";
import PortfolioSlider from "@/components/Post/PortfolioSlider";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function PortfolioSliders() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div className="portfolios-slider">
      <div className="row">
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://i.pinimg.com/736x/7e/90/4b/7e904beaf84643862390894801aa2895.jpg`}
            author={`قويدر جلال`}
            level={getAll("New_seller")}
            username={`wjw`}
            avatar={`/avatar3.jpg`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://lopamudracreative.com/wp-content/uploads/2018/08/black-birdie-thumb-image-1_o.jpg`}
            author={`حياء الأمل`}
            level={`بائع ممتاز`}
            username={`wjw`}
            avatar={`/avatar.png`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://plana.ae/uploads/1/2020-09/7_graphic_design.jpg`}
            author={`أحمد يحيى`}
            level={`بائع ممتاز`}
            username={`wjw`}
            avatar={`/avatar2.jpg`}
          />
        </div>
        <div className="col-sm-6 col-xl-3 p-0 slider-inner">
          <PortfolioSlider
            thumbnail={`https://pbs.twimg.com/media/FWhCIAHXEAAEYzB?format=jpg&name=large`}
            author={`عبد الحميد بومقواس`}
            level={getAll("Professional_seller")}
            username={`wjw`}
            avatar={`/avatar3.jpg`}
          />
        </div>
      </div>
    </div>
  );
}

export default PortfolioSliders;
