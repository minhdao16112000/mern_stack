import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../layouts/Banner/Banner';
import ProductLeft from '../components/ProductLeft/ProductLeft';
import ProductRight from '../components/ProductRight/ProductRight';
import Insta from '../layouts/Insta/Insta';
import Blogs from '../layouts/Blogs/Blogs';
import {
    getRole,
    getUserGoogle,
    getUserFacebook,
} from '../redux/actions/userActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActions';
import { getPosts } from '../redux/actions/postActions';
import { getTopics } from '../redux/actions/topicActions';
import { getImages } from '../redux/actions/imageActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector((state) => state.category.categories);
    const lstPro = useSelector((state) => state.product.products_list);

    const id =
        localStorage.getItem('userInfo') !== null
            ? JSON.parse(localStorage.getItem('userInfo'))._id
            : null;

    const authGoogle = localStorage.getItem('authGoogle')
        ? JSON.parse(localStorage.getItem('authGoogle')).isGoogle
        : false;

    const authFacebook = localStorage.getItem('authFacebook')
        ? JSON.parse(localStorage.getItem('authFacebook')).isFacebook
        : false;

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

        if (authGoogle === true) {
            dispatch(getUserGoogle());
        }

        if (authFacebook === true) {
            dispatch(getUserFacebook());
        }
    }, [id, dispatch, authGoogle, authFacebook]);
    return (
        <div>
            <Banner listCate={lstCate.Categories} />
            <ProductLeft
                listFeMale={lstCate.Categories}
                listProFeMale={lstPro.Products}
            />
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
