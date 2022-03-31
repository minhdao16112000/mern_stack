import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MenuLeft from '../components/MenuLeft/MenuLeft';
import { getCategories } from '../redux/actions/categoryActions';
import {
    getColors,
    getProducts,
    getSizes,
} from '../redux/actions/productActions';

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const lstCate = useSelector((state) => state.category.categories);
    const lstColor = useSelector((state) => state.product.colors_list);
    const lstSize = useSelector((state) => state.product.sizes_list);
    const lstPro = useSelector((state) => state.product.products_list);
    let match1 = useRouteMatch('/category/:slug');
    let match2 = useRouteMatch('/category/:slug/:slug');
    let match3 = useRouteMatch('/category/:slug/:slug/:slug');
    let match4 = useRouteMatch('/tim-kiem');

    var showPro = [];

    if (lstPro.Products) {
        if (match2 && !match3) {
            const catSlug = lstCate.Categories.filter(
                (value) => value.slug === match1.params.slug
            );
            const catSlug2 = lstCate.Categories.filter(
                (value) => value.slug === match2.params.slug
            );
            let proSlug1 = [];
            if (catSlug && catSlug2) {
                catSlug.forEach((value) => {
                    lstPro.Products.forEach((index) => {
                        if (
                            index.categoryId.includes(value._id) &&
                            index.status === '1'
                        ) {
                            proSlug1.push(index);
                        }
                    });
                });
                catSlug2.forEach((value) => {
                    proSlug1.forEach((index) => {
                        if (index.categoryId.includes(value._id)) {
                            showPro.push(index);
                        }
                    });
                });
            }
        } else if (match3) {
            if (match2.params.slug === 'size') {
                const catSlug = lstCate.Categories.filter(
                    (value) => value.slug === match1.params.slug
                );
                const sizeSlug3 = lstSize.Sizes.filter(
                    (value) => value.slug === match3.params.slug
                );
                let proSlug1 = [];

                if (catSlug && sizeSlug3) {
                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === '1'
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });

                    sizeSlug3.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.size.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            } else if (match2.params.slug === 'color') {
                const catSlug = lstCate.Categories.filter(
                    (value) => value.slug === match1.params.slug
                );
                const colorSlug3 = lstColor.Colors.filter(
                    (index) => index.slug === match3.params.slug
                );
                let proSlug1 = [];

                if (catSlug && colorSlug3) {
                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === '1'
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });

                    colorSlug3.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.color.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            } else {
                if (lstCate.Categories) {
                    const catSlug = lstCate.Categories.filter(
                        (value) => value.slug === match1.params.slug
                    );
                    const catSlug2 = lstCate.Categories.filter(
                        (value) => value.slug === match2.params.slug
                    );
                    const catSlug3 = lstCate.Categories.filter(
                        (value) => value.slug === match3.params.slug
                    );
                    let proSlug1 = [];
                    let proSlug2 = [];

                    catSlug.forEach((value) => {
                        lstPro.Products.forEach((index) => {
                            if (
                                index.categoryId.includes(value._id) &&
                                index.status === '1'
                            ) {
                                proSlug1.push(index);
                            }
                        });
                    });
                    catSlug2.forEach((value) => {
                        proSlug1.forEach((index) => {
                            if (index.categoryId.includes(value._id)) {
                                proSlug2.push(index);
                            }
                        });
                    });
                    catSlug3.forEach((value) => {
                        proSlug2.forEach((index) => {
                            if (index.categoryId.includes(value._id)) {
                                showPro.push(index);
                            }
                        });
                    });
                }
            }
        } else if (match1) {
            const catSlug = lstCate.Categories.filter(
                (value) => value.slug === match1.params.slug
            );

            catSlug.forEach((value) => {
                lstPro.Products.forEach((index) => {
                    if (index.categoryId.includes(value._id)) {
                        showPro.push(index);
                    }
                });
            });
        } else if (match4) {
            console.log(true);
        }
    }

    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 12;

    const indexOfFirstTodo = indexOfLastTodo - 12;

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
        dispatch(getColors());
        dispatch(getSizes());
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
                                    <i className="fa fa-home"></i> Trang Chủ
                                </a>
                                <span>Cửa Hàng</span>
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
                        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                            <MenuLeft
                                listCate={lstCate.Categories}
                                listColor={lstColor.Colors}
                                listSize={lstSize.Sizes}
                            />
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2">
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
                                                            <div className="pi-pic">
                                                                <img
                                                                    src={`https://shopfashi.herokuapp.com/products/${checkImage(
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
                                                                    <i className="icon_heart_alt"></i>
                                                                </div>
                                                                {/* <ul>
                                                                <li className="w-icon active">
                                                                    <Link to={location.pathname}>
                                                                        <i onClick={() => handleAddCart({ ...value, getQty: 1 })} className="icon_bag_alt"></i>
                                                                    </Link>
                                                                </li>
                                                                <li className="quick-view"><Link to={`/category/${checkSlug(value.categoryId)}/product/${value._id}`}>+ Quick View</Link></li>
                                                            </ul> */}
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
                                            <h1>Không Có Sản Phẩm Nào Cả</h1>
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

export default ProductsScreen;
