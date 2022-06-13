import React, { useState, useEffect } from "react";
import Link from "next/link";
import API from '../../../config';
import HeroSearchContent from "./HeroSearchContent";

function HeroContainer() {
  const [topCategories, setTopCaegories] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await API.get('api/top_categories')
    setTopCaegories(res?.data);
  }
  return (
    <div className="hero-container">
      <div className="inner">
        <h1 className="main-title">اشتري. دردش .بيع</h1>
        <h1 className="sub-title">
          اكتشف سوق تيم ورك للخدمات الالكترونية الأكثر تطورا وراحة
        </h1>
        <div className="hero-container-search">
          <HeroSearchContent />
          <ul className="popular-search">
            {topCategories.slice(0, 4).map(category => (
              <li key={category} className="pop-item ">
                <Link  href={`/products?categoryID=${category.parent_id}&subcategoryID=${category.id}`}>
                  <a className="">
                    {category.name_ar}
                  </a>
                </Link>
              </li>

            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroContainer;
