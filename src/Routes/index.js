import Home from "../pages/Home";
import ProductItem from "../pages/ProductItem";
import Cart from "../pages/Cart";
import Search from "../pages/Search";
import Category from "../pages/Category/Category";
import config from "../config";
import LayoutNotSlider from '../layouts/LayoutNotSlider'

export const routes = [
    { path: config.home, component: Home },
    { path: config.search, component: Search, layout: LayoutNotSlider },
    { path: config.productItem, component: ProductItem, layout: LayoutNotSlider },
    { path: config.categProductItem, component: ProductItem, layout: LayoutNotSlider },
    { path: config.cart, component: Cart, layout: LayoutNotSlider },
    { path: config.category, component: Category, layout: LayoutNotSlider },
]