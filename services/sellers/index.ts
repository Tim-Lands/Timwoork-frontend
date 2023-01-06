import API from "../../config";
const getTopSellers = async()=>{
    const res = await API.get('api/profile_sellers/topPortfolioViews');
    return res?.data
}

export const SellersService={
    getTopSellers
}