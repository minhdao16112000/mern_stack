import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessageBox from '../components/Box/MessageBox';
import MenuLeft from '../components/MenuLeft/MenuLeft';
import Rate from '../components/Rate/Rate';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstant';
import { addCart } from '../redux/actions/cartActions';
import { getCategories } from '../redux/actions/categoryActions';
import {
    createReview,
    getColors,
    getProductBySlug,
    getSizes,
} from '../redux/actions/productActions';
import { favoritesAdd, getUser } from '../redux/actions/userActions';
import './styles/porductDetail.scss';

const ProductDetailScreen = () => {
    const dispatch = useDispatch();
    let match = useRouteMatch('/product/:slug');
    let { url } = useRouteMatch();
    let location = useLocation();
    const slug = match.params.slug;
    const product = useSelector((state) => state.product.product);
    const lstCate = useSelector((state) => state.category.categories);
    const lstColor = useSelector((state) => state.product.colors_list);
    const lstSize = useSelector((state) => state.product.sizes_list);
    const proReview = useSelector((state) => state.product);
    const user = useSelector((state) => state.user.user);
    var [count, setCount] = useState(0);
    const [sizeAct, setSizeAct] = useState('');
    const [sizes, setSizes] = useState('');
    const [colorAct, setColorAct] = useState('');
    const [colors, setColors] = useState('');
    const [quantityPro, setQuantityPro] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {
        // loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = proReview;

    const pro = product ? product : [];

    var cate = pro.categoryId;

    var userName = '';

    const userId = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))._id
        : '';

    var check = false;
    var noComment = false;

    if (user && pro) {
        user.favorites.forEach((values) => {
            if (values._id === pro._id) {
                return (check = true);
            }
        });
        if (pro.reviews) {
            pro.reviews.forEach((values) => {
                if (values.idUser === user._id) {
                    return (noComment = true);
                }
            });
        }
    }

    const [checkAdd, setCheckAdd] = useState(check);

    if (user) {
        userName = user.firstName + ' ' + user.lastName;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Bạn đừng quên đánh giá nhé !.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (comment === '') {
            toast.error('Opps! Bạn quên bình luận rồi.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (rating && comment) {
            if (pro) {
                dispatch(
                    createReview(pro._id, {
                        id: user._id,
                        sex: user.sex,
                        rate: rating,
                        cmt: comment,
                        name: userName,
                    })
                );
            }
        }
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    const getStar = () => {
        if (pro) {
            return (
                <div className="pd-rating star-pro">
                    <i
                        className={
                            pro.rating >= 1
                                ? 'fa fa-star'
                                : pro.rating >= 0.5
                                ? 'fa fa-star-half-o'
                                : 'fa fa-star-o'
                        }
                    />
                    <i
                        className={
                            pro.rating >= 2
                                ? 'fa fa-star'
                                : pro.rating >= 1.5
                                ? 'fa fa-star-half-o'
                                : 'fa fa-star-o'
                        }
                    />
                    <i
                        className={
                            pro.rating >= 3
                                ? 'fa fa-star'
                                : pro.rating >= 2.5
                                ? 'fa fa-star-half-o'
                                : 'fa fa-star-o'
                        }
                    />
                    <i
                        className={
                            pro.rating >= 4
                                ? 'fa fa-star'
                                : pro.rating >= 3.5
                                ? 'fa fa-star-half-o'
                                : 'fa fa-star-o'
                        }
                    />
                    <i
                        className={
                            pro.rating >= 5
                                ? 'fa fa-star'
                                : pro.rating >= 4.5
                                ? 'fa fa-star-half-o'
                                : 'fa fa-star-o'
                        }
                    />
                    <span>({pro.numReviews})</span>
                </div>
            );
        }
    };

    const notifySuccess = () => {
        toast.success('Đã thêm sản phẩm vào giỏ hàng.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyErrorSize = () => {
        toast.error('Bạn cần chọn size trước khi thêm sản phẩm vào giỏ hàng.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyErrorColor = () => {
        toast.error('Bạn cần chọn màu trước khi thêm sản phẩm vào giỏ hàng.', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleAddFavorite = (id) => {
        dispatch(favoritesAdd(id));
        if (checkAdd === false) {
            setCheckAdd(true);
            toast.success('Đã thêm sản phẩm vào mục ưa thích.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setCheckAdd(false);
            toast.warn('Đã xóa sản phẩm khỏi mục ưa thích.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleClickSize = (key, value) => {
        setSizeAct(key);
        setSizes(value);
    };

    const handleClickColor = (key, value) => {
        setColorAct(key);
        setColors(value);
    };

    const handleAddCart = (data) => {
        if (data.color.length === 0) {
            notifyErrorColor();
        } else if (data.size.length === 0) {
            notifyErrorSize();
        } else {
            dispatch(addCart(data));
            notifySuccess();
        }
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkSlug = (id) => {
        var catArr = [];
        if (id && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.slug);
                }
            });
        }
        return catArr[0];
    };

    const checkMultiCate = (id) => {
        var catArr = [];
        if (id && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.name);
                }
            });
        }
        return catArr.toString();
    };

    const checkSingleCate = (id) => {
        var catArr = [];
        if (id && lstCate.Categories) {
            lstCate.Categories.forEach((value) => {
                if (id.includes(value._id)) {
                    catArr.push(value.name);
                }
            });
        }
        if (catArr.length === 3) {
            return catArr[2].toString();
        } else if (catArr.length === 2) {
            return catArr[1].toString();
        }
    };

    const checkColor = (id) => {
        var colorArr = [];
        if (id && lstColor && lstColor.Colors) {
            lstColor.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.code);
                }
            });
        }
        return colorArr;
    };

    const checkSize = (id) => {
        var sizeArr = [];
        if (id && lstSize && lstSize.Sizes) {
            lstSize.Sizes.forEach((value) => {
                if (value._id.includes(id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return sizeArr;
    };

    useEffect(() => {
        if (successReviewCreate) {
            toast.success('Cám ơn bạn đã đánh giá !.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(getProductBySlug(slug));
        dispatch(getCategories());
        dispatch(getColors());
        dispatch(getSizes());
        if (userId !== '') {
            dispatch(getUser(userId));
        }
    }, [dispatch, slug, successReviewCreate, userId]);
    return (
        <div>
            {/* Breadcrumb Section Begin */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <a href="./home.html">
                                    <i className="fa fa-home" /> Trang Chủ
                                </a>
                                <Link to={url.split('/product')[0]}>
                                    Cửa Hàng
                                </Link>
                                <span>Chi Tiết Sản Phẩm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb Section Begin */}
            {/* Product Shop Section Begin */}
            <section className="product-shop spad page-details">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <MenuLeft
                                listCate={lstCate.Categories}
                                listColor={lstColor ? lstColor.Colors : null}
                                listSize={lstSize ? lstSize.Sizes : null}
                                slugCate={checkSlug(pro.categoryId)}
                            />
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="product-pic-zoom">
                                        <div className="product-pic-zoom">
                                            {pro.image ? (
                                                <img
                                                    className="product-big-img"
                                                    src={`http://localhost:5000/products/${
                                                        pro.image.split(',')[
                                                            count
                                                        ]
                                                    }`}
                                                    alt=""
                                                />
                                            ) : (
                                                <img
                                                    className="product-big-img"
                                                    src="https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
                                                    alt=""
                                                />
                                            )}
                                            {/* <div className="zoom-icon">
                                                <i className="fa fa-search-plus"></i>
                                            </div> */}
                                        </div>
                                        {/* <div className="zoom-icon">
                                            <i className="fa fa-search-plus" />
                                        </div> */}
                                    </div>
                                    <div className="product-thumbs">
                                        <Carousel
                                            swipeable={false}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            ssr={true} // means to render carousel on server-side.
                                            infinite={true}
                                            autoPlay={true}
                                            autoPlaySpeed={5000}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            transitionDuration={500}
                                            containerClass="carousel-container"
                                            removeArrowOnDeviceType={[
                                                'tablet',
                                                'mobile',
                                            ]}
                                            // deviceType={this.props.deviceType}
                                            dotListClass="custom-dot-list-style"
                                            itemClass="carousel-item-padding-40-px"
                                        >
                                            {pro.image ? (
                                                pro.image
                                                    .split(',')
                                                    .map((value, key) => {
                                                        return (
                                                            <div
                                                                key={key}
                                                                className="pt col-12"
                                                                onClick={() =>
                                                                    setCount(
                                                                        key
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={`http://localhost:5000/products/${value}`}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <div className="pt">
                                                    <img
                                                        src="https://admin-demo.nopcommerce.com/images/thumbs/default-image_100.png"
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product-details">
                                        <div className="pd-title">
                                            <span>
                                                {checkSingleCate(
                                                    pro.categoryId
                                                )}
                                            </span>
                                            <h3>{pro.name}</h3>
                                            {localStorage.getItem(
                                                'userInfo'
                                            ) ? (
                                                checkAdd === true ? (
                                                    <div
                                                        onClick={() =>
                                                            handleAddFavorite(
                                                                pro._id
                                                            )
                                                        }
                                                        className="heart-icon"
                                                    >
                                                        <i className="icon_heart" />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            handleAddFavorite(
                                                                pro._id
                                                            )
                                                        }
                                                        className="heart-icon"
                                                    >
                                                        <i className="icon_heart_alt" />
                                                    </div>
                                                )
                                            ) : null}
                                        </div>
                                        {getStar()}
                                        <div className="pd-desc">
                                            {pro.priceDiscount !== 0 ? (
                                                <h4 className="product-price">
                                                    {formatVND(
                                                        pro.priceDiscount
                                                    )}
                                                    <span>
                                                        {' '}
                                                        {formatVND(pro.price)}
                                                    </span>
                                                </h4>
                                            ) : (
                                                <h4 className="product-price">
                                                    {formatVND(pro.price)}
                                                </h4>
                                            )}
                                        </div>
                                        <div className="pd-color">
                                            <h6>Màu</h6>
                                            {/* <div className="circle" style={{ background: value.code }}></div> */}
                                            <div className="pd-color-choose">
                                                {pro.color ? (
                                                    pro.color
                                                        .split(',')
                                                        .map((value, key) => {
                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className="cc-item"
                                                                >
                                                                    {colorAct ===
                                                                    key ? (
                                                                        <div
                                                                            className="circle_active"
                                                                            style={{
                                                                                background:
                                                                                    checkColor(
                                                                                        value
                                                                                    ),
                                                                            }}
                                                                        ></div>
                                                                    ) : (
                                                                        <div
                                                                            className="circle"
                                                                            onClick={() =>
                                                                                handleClickColor(
                                                                                    key,
                                                                                    value
                                                                                )
                                                                            }
                                                                            style={{
                                                                                background:
                                                                                    checkColor(
                                                                                        value
                                                                                    ),
                                                                            }}
                                                                        ></div>
                                                                    )}
                                                                </div>
                                                            );
                                                            //circle_active
                                                        })
                                                ) : (
                                                    <div className="cc-item">
                                                        <div
                                                            className="circle"
                                                            style={{
                                                                background:
                                                                    pro.color,
                                                            }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="pd-size-choose">
                                            {pro.size ? (
                                                pro.size
                                                    .split(',')
                                                    .map((value, key) => {
                                                        return (
                                                            <div
                                                                key={key}
                                                                className="sc-item"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id="sm-size"
                                                                />
                                                                {sizeAct ===
                                                                key ? (
                                                                    <label
                                                                        className="active"
                                                                        htmlFor="sm-size"
                                                                    >
                                                                        {checkSize(
                                                                            value
                                                                        )}
                                                                    </label>
                                                                ) : (
                                                                    <label
                                                                        onClick={() =>
                                                                            handleClickSize(
                                                                                key,
                                                                                value
                                                                            )
                                                                        }
                                                                        htmlFor="sm-size"
                                                                    >
                                                                        {checkSize(
                                                                            value
                                                                        )}
                                                                    </label>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <div className="sc-item">
                                                    <input
                                                        type="radio"
                                                        id="sm-size"
                                                    />
                                                    <label htmlFor="sm-size"></label>
                                                </div>
                                            )}
                                        </div>
                                        {pro.quantity > 0 ? (
                                            <div className="quantity">
                                                <div className="pro-qty">
                                                    <input
                                                        type="number"
                                                        defaultValue={1}
                                                        min={1}
                                                        max={pro.quantity}
                                                        onChange={(e) =>
                                                            setQuantityPro(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <Link
                                                    to={location.pathname}
                                                    onClick={() =>
                                                        handleAddCart({
                                                            ...pro,
                                                            size: sizes,
                                                            color: colors,
                                                            getQty: Number(
                                                                quantityPro
                                                            ),
                                                        })
                                                    }
                                                    className="primary-btn pd-cart"
                                                >
                                                    Thêm Giỏ Hàng
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="quantity">
                                                <h3 className="danger-btn pd-cart">
                                                    Hết Hàng
                                                </h3>
                                            </div>
                                        )}
                                        <ul className="pd-tags">
                                            <li>
                                                <span>DANH MỤC SẢN PHẨM</span>:{' '}
                                                {checkMultiCate(pro.categoryId)}
                                            </li>
                                            {/* <li>
                                                <span>TAGS</span>: Clothing, T-shirt, Woman
                                            </li> */}
                                        </ul>
                                        {/* <div className="pd-share">
                                            <div className="p-code">
                                                Sku : 00012
                                            </div>
                                            <div className="pd-social">
                                                <a href="/#">
                                                    <i className="ti-facebook" />
                                                </a>
                                                <a href="/#">
                                                    <i className="ti-twitter-alt" />
                                                </a>
                                                <a href="/#">
                                                    <i className="ti-linkedin" />
                                                </a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="product-tab">
                                <div className="tab-item">
                                    <ul className="nav" role="tablist">
                                        <li>
                                            <a
                                                className="active"
                                                data-toggle="tab"
                                                href="#tab-1"
                                                role="tab"
                                            >
                                                Mô Tả
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#tab-2"
                                                role="tab"
                                            >
                                                Đặc Tính
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#tab-3"
                                                role="tab"
                                            >
                                                Đánh Giá Của Khách Hàng (
                                                {pro.numReviews})
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-item-content">
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade-in active"
                                            id="tab-1"
                                            role="tabpanel"
                                        >
                                            <div className="product-content">
                                                <div className="row">
                                                    <div
                                                        className="col-lg-12"
                                                        dangerouslySetInnerHTML={{
                                                            __html: pro.details,
                                                        }}
                                                    />
                                                    {/* <div className="col-lg-5">
                                                        <img src="img/product-single/tab-desc.jpg" alt="" />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="tab-2"
                                            role="tabpanel"
                                        >
                                            <div className="specification-table">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Xếp hạng
                                                            </td>
                                                            <td>{getStar()}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Giá
                                                            </td>
                                                            <td>
                                                                <div className="p-price">
                                                                    {formatVND(
                                                                        pro.price
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-catagory">
                                                                Tồn Kho
                                                            </td>
                                                            <td>
                                                                <div className="p-stock">
                                                                    {
                                                                        pro.quantity
                                                                    }{' '}
                                                                    trong kho
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="tab-3"
                                            role="tabpanel"
                                        >
                                            <div className="customer-review-option">
                                                <h4>
                                                    {pro.numReviews} Bình Luận
                                                </h4>
                                                <div className="comment-option">
                                                    {pro.reviews ? (
                                                        pro.reviews.map(
                                                            (value, key) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="co-item"
                                                                    >
                                                                        <div className="avatar-pic">
                                                                            {value.sex ? (
                                                                                value.sex ===
                                                                                1 ? (
                                                                                    <img
                                                                                        src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                                                                        alt=""
                                                                                    />
                                                                                ) : (
                                                                                    <img
                                                                                        src="https://images.clipartlogo.com/files/istock/previews/9730/97305655-avatar-icon-of-girl-in-a-wide-brim-felt-hat.jpg"
                                                                                        alt=""
                                                                                    />
                                                                                )
                                                                            ) : (
                                                                                <img
                                                                                    src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-cute/avatar-cute-12.jpg"
                                                                                    alt=""
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        <div className="avatar-text">
                                                                            <div className="at-rating show-rating">
                                                                                {Array(
                                                                                    5
                                                                                )
                                                                                    .fill(
                                                                                        0
                                                                                    )
                                                                                    .map(
                                                                                        (
                                                                                            _,
                                                                                            i
                                                                                        ) =>
                                                                                            i +
                                                                                            1
                                                                                    )
                                                                                    .map(
                                                                                        (
                                                                                            idx
                                                                                        ) => (
                                                                                            <i
                                                                                                key={
                                                                                                    idx
                                                                                                }
                                                                                                className={
                                                                                                    idx <=
                                                                                                    value.rating
                                                                                                        ? 'fa fa-star'
                                                                                                        : 'fa fa-star-o'
                                                                                                }
                                                                                            />
                                                                                        )
                                                                                    )}
                                                                            </div>
                                                                            <h5>
                                                                                {
                                                                                    value.name
                                                                                }{' '}
                                                                                <span>
                                                                                    {moment(
                                                                                        value.createdAt.substring(
                                                                                            0,
                                                                                            10
                                                                                        )
                                                                                    ).format(
                                                                                        'DD MMM  YYYY'
                                                                                    )}
                                                                                </span>
                                                                            </h5>
                                                                            <div className="at-reply">
                                                                                {
                                                                                    value.comment
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <div className="co-item"></div>
                                                    )}

                                                    {/* <div className="co-item">
                                                        <div className="avatar-pic">
                                                            <img
                                                                src="assets/img/product-single/avatar-2.png"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="avatar-text">
                                                            <div className="at-rating">
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star" />
                                                                <i className="fa fa-star-o" />
                                                            </div>
                                                            <h5>
                                                                Roy Banks{' '}
                                                                <span>
                                                                    27 Aug 2019
                                                                </span>
                                                            </h5>
                                                            <div className="at-reply">
                                                                Nice !
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                {localStorage.getItem(
                                                    'userInfo'
                                                ) && noComment === false ? (
                                                    <div className="personal-rating">
                                                        <h6>Your Rating</h6>
                                                        <Rate
                                                            rating={rating}
                                                            onRating={(rate) =>
                                                                setRating(rate)
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
                                                {localStorage.getItem(
                                                    'userInfo'
                                                ) ? (
                                                    noComment === false ? (
                                                        <div className="leave-comment">
                                                            <h4>
                                                                Leave A Comment
                                                            </h4>
                                                            <form
                                                                className="comment-form"
                                                                onSubmit={
                                                                    submitHandler
                                                                }
                                                            >
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <textarea
                                                                            placeholder="Messages"
                                                                            value={
                                                                                comment
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setComment(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        <button
                                                                            type="submit"
                                                                            className="site-btn"
                                                                        >
                                                                            Send
                                                                            message
                                                                        </button>
                                                                        <div>
                                                                            {errorReviewCreate && (
                                                                                <MessageBox variant="danger">
                                                                                    {
                                                                                        errorReviewCreate
                                                                                    }
                                                                                </MessageBox>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    ) : null
                                                ) : (
                                                    <MessageBox>
                                                        Hãy{' '}
                                                        <Link to="/dang-nhap">
                                                            Đăng nhập
                                                        </Link>{' '}
                                                        để đánh giá sản phẩm !
                                                    </MessageBox>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Shop Section End */}
            {/* Related Products Section End */}
            <RelatedProducts
                listCate={lstCate.Categories}
                slug={slug}
                cate={cate}
            />
        </div>
    );
};

export default ProductDetailScreen;
