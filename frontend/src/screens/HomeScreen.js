import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DealWeek from '../components/DealWeek/DealWeek';
import ProductLeft from '../components/ProductLeft/ProductLeft';
import ProductRight from '../components/ProductRight/ProductRight';
import Banner from '../layouts/Banner/Banner';
import Blogs from '../layouts/Blogs/Blogs';
import Insta from '../layouts/Insta/Insta';
import { getCategories } from '../redux/actions/categoryActions';
import { getImages } from '../redux/actions/imageActions';
import { getPosts } from '../redux/actions/postActions';
import { getProducts } from '../redux/actions/productActions';
import { getTopics } from '../redux/actions/topicActions';
// import Partners from "../layouts/Partners/Partners"
import { getRole } from '../redux/actions/userActions';
// import Products from "../components/Products/Products";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector((state) => state.category.categories);
    const lstPro = useSelector((state) => state.product.products_list);
    const id =
        localStorage.getItem('userInfo') !== null
            ? JSON.parse(localStorage.getItem('userInfo'))._id
            : null;
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(getPosts());
        dispatch(getTopics());
        dispatch(getImages());
        if (!window.location.hash) {
            window.location = window.location + '#trang-chu';
            window.location.reload();
        }
        if (id) dispatch(getRole(id));
    }, [id, dispatch]);
    return (
        <div>
            {/* <Hero /> */}
            <Banner listCate={lstCate.Categories} />
            {/* <Products list={lstCate} listPro={lstPro}/> */}
            <ProductLeft
                listFeMale={lstCate.Categories}
                listProFeMale={lstPro.Products}
            />
            <DealWeek />
            <ProductRight
                listMale={lstCate.Categories}
                listProMale={lstPro.Products}
            />
            <Insta />
            <Blogs />
        </div>
    );
};

export default HomeScreen;