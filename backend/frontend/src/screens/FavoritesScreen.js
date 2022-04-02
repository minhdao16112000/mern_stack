import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../redux/actions/categoryActions';
import { getProducts } from '../redux/actions/productActions';
import './styles/favorites.scss';

const FavoritesScreen = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector((state) => state.category.categories);
    const lstPro = useSelector((state) => state.product.products_list);
    const user = useSelector((state) => state.user.user);
    var showPro = [];
    if (lstPro && lstPro.Products && user) {
        user.favorites.forEach((value) => {
            var temp = lstPro.Products.filter(
                (item) => item._id === value._id
            )[0];
            showPro.push(temp);
        });
    }

    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 6;

    const indexOfFirstTodo = indexOfLastTodo - 6;

    const currentTodos = showPro.slice(indexOfFirstTodo, indexOfLastTodo);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        lstCate.Categories.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        if (catArr.length === 3) {
            return catArr[2].toString();
        } else if (catArr.length === 2) {
            return catArr[1].toString();
        }
    };

    const checkImage = (key) => {
        let Arr = [];
        currentTodos.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            {/* -- Breadcrumb Section Begin -- */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <a href="/#">
                                    <i className="fa fa-home"></i> Home
                                </a>
                                <span>Danh mục ưa thích</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- Breadcrumb Section End -- */}
            {/* -- Product Shop Section Begin -- */}
            <section className="product-shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 order-1 order-lg-2">
                            <div className="product-list">
                                <div className="row">
                                    {currentTodos.length !== 0 ? (
                                        currentTodos.map((value, key) => {
                                            return (
                                                <div
                                                    key={key}
                                                    className="col-lg-4 col-sm-6"
                                                >
                                                    <Link
                                                        to={`/product/${value.slug}`}
                                                    >
                                                        <div className="product-item">
                                                            <div className="pi-pic favorite-image">
                                                                <img
                                                                    src={`http://localhost:5000/products/${checkImage(
                                                                        key
                                                                    )}`}
                                                                    alt=""
                                                                />
                                                                {value.priceDiscount !==
                                                                0 ? (
                                                                    <div className="sale pp-sale">
                                                                        Sale
                                                                    </div>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                                <div className="icon">
                                                                    <i className="icon_heart"></i>
                                                                </div>
                                                            </div>
                                                            <div className="pi-text">
                                                                <div className="catagory-name">
                                                                    {checkCate(
                                                                        value.categoryId
                                                                    )}
                                                                </div>

                                                                <h5>
                                                                    {value.name}
                                                                </h5>
                                                                {value.priceDiscount !==
                                                                0 ? (
                                                                    <div className="product-price">
                                                                        {formatVND(
                                                                            value.priceDiscount
                                                                        )}
                                                                        <span>
                                                                            {' '}
                                                                            {formatVND(
                                                                                value.price
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="product-price">
                                                                        {formatVND(
                                                                            value.price
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>
                                            <h1>
                                                Không Tìm Thấy Sản Phẩm Bạn Cần
                                            </h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="loading-more">
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={12}
                                    totalItemsCount={showPro.length}
                                    pageRangeDisplayed={5}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* -- Product Shop Section End -- */}
        </div>
    );
};

export default FavoritesScreen;
