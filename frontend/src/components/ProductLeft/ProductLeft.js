/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './style.scss';

const ProductLeft = (props) => {
    const listImg = useSelector((state) => state.image.images);
    const user = useSelector((state) => state.user.user);
    var img = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === '1' && value.status === '1'
        );
    }
    var [childCateFeMale, setChildCateCateFeMale] = useState([]);
    var [proCateFeMale, setProCateFeMale] = useState([]);
    var [count, setCount] = useState(1);

    const id = childCateFeMale[count];

    const handleCheckFavorite = (id) => {
        var check = false;
        if (user && user.favorites) {
            user.favorites.forEach((values) => {
                if (values._id === id) {
                    return (check = true);
                }
            });
        }
        if (check === false) {
            return (
                <div className="icon">
                    <i className="icon_heart_alt"></i>
                </div>
            );
        } else {
            return (
                <div className="icon">
                    <i className="icon_heart"></i>
                </div>
            );
        }
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        childCateFeMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        proCateFeMale.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
            // for(let i = 0; i< imageArr.length; i++){
            //     console.log(imageArr[i])
            // }
        });
        return Arr[key];
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    useEffect(() => {
        const FeMale = props.listFeMale;
        const ProFeMale = props.listProFeMale;
        let parentFeMale = [];
        if (FeMale) {
            parentFeMale = FeMale.filter((value) => value.name === 'Nữ');
        }
        let valueArr = [];
        let Arr = [];
        let proArr = [];
        parentFeMale.forEach((data) => {
            if (FeMale && ProFeMale) {
                ProFeMale.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === '1' &&
                        value.deleted === false
                    ) {
                        Arr.push(value);
                    }
                });
                FeMale.forEach((option) => {
                    if (
                        option.parentCate.includes(data._id) &&
                        option.status === '1' &&
                        option.deleted === false
                    ) {
                        valueArr.push(option);
                    }
                });
            }
        });
        Arr.forEach((option) => {
            if (id) {
                if (option.categoryId.includes(id._id)) {
                    proArr.push(option);
                }
            }
        });
        // setProCateMale(Arr);
        setProCateFeMale(proArr);
        proArr = [];
        setChildCateCateFeMale(valueArr);
    }, [props, id]);

    return (
        <section className="women-banner spad">
            <div className="container-fluid">
                <div className="row">
                    {img.length !== 0 ? (
                        <div className="col-lg-3">
                            <div
                                className="product-large set-bg m-large large-man"
                                style={{
                                    backgroundImage: `url(http://localhost:5000/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/nu">Xem thêm</a>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="col-lg-8 offset-lg-1">
                        <div className="filter-control">
                            <ul>
                                {childCateFeMale.map((value, key) => {
                                    if (key === count) {
                                        return (
                                            <li key={key} className="active">
                                                {value.name}
                                            </li>
                                            // <li key={key} className="active">b</li>
                                        );
                                    } else {
                                        return (
                                            <li
                                                key={key}
                                                onClick={() => setCount(key)}
                                            >
                                                {value.name}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                        <Slider {...settings}>
                            {proCateFeMale.slice(0, 5).map((value, key) => {
                                return (
                                    <div
                                        key={key}
                                        className="product-item col-12"
                                    >
                                        <Link
                                            to={`/product/${value.slug}`}
                                            onClick={() =>
                                                localStorage.setItem(
                                                    'proCate',
                                                    value.categoryId
                                                )
                                            }
                                        >
                                            <div className="pi-pic">
                                                <img
                                                    src={`http://localhost:5000/products/${checkImage(
                                                        key
                                                    )}`}
                                                    alt=""
                                                />
                                                {value.priceDiscount !== 0 ? (
                                                    <div className="sale">
                                                        Sale
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}

                                                {handleCheckFavorite(value._id)}
                                                {/* <ul>
                                                <li className="w-icon active">
                                                    <a href="/#">
                                                        <i onClick={() =>
                                                            handleAddCart({ ...value, getQty: 1})
                                                        } className="icon_bag_alt"></i>
                                                    </a>
                                                </li>
                                                <li className="quick-view">
                                                    <Link to={`/category/${checkSlug(value.categoryId)}/product/${value._id}`}>
                                                        + Quick View
                                                    </Link>
                                                </li>

                                            </ul> */}
                                            </div>
                                            <div className="pi-text">
                                                <div className="catagory-name">
                                                    {checkCate(
                                                        value.categoryId
                                                    )}
                                                </div>
                                                <h5>{value.name}</h5>
                                                {value.priceDiscount !== 0 ? (
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
                                                        {formatVND(value.price)}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductLeft;
