/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

const ProductRight = (props) => {
    const listImg = useSelector((state) => state.image.images);
    var img = [];
    if (listImg.Images) {
        img = listImg.Images.filter(
            (value) => value.position === '2' && value.status === '1'
        );
    }
    var [childCateMale, setChildCateMale] = useState([]);
    var [proCateMale, setProCateMale] = useState([]);
    var [count, setCount] = useState(0);

    var id = childCateMale[count];

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkCate = (id) => {
        var catArr = [];
        childCateMale.forEach((value) => {
            if (id.includes(value._id)) {
                catArr.push(value.name);
            }
        });
        return catArr.toString();
    };

    const checkImage = (key) => {
        let Arr = [];
        proCateMale.forEach((value) => {
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
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    useEffect(() => {
        const Male = props.listMale;
        const ProMale = props.listProMale;
        let valueArr = [];
        let Arr = [];
        let proArr = [];
        if (Male && ProMale) {
            let parentMale = Male.filter((value) => value.name === 'Nam');
            parentMale.forEach((data) => {
                ProMale.forEach((value) => {
                    if (
                        value.categoryId.includes(data._id) &&
                        value.status === '1' &&
                        value.deleted === false
                    ) {
                        Arr.push(value);
                    }
                });
                Male.forEach((option) => {
                    if (
                        option.parentCate.includes(data._id) &&
                        option.status === '1' &&
                        option.deleted === false
                    ) {
                        valueArr.push(option);
                    }
                });
            });
        }
        Arr.forEach((option) => {
            if (id) {
                if (option.categoryId.includes(id._id)) {
                    proArr.push(option);
                }
            }
        });
        // setProCateMale(Arr);
        setProCateMale(proArr);
        proArr = [];
        setChildCateMale(valueArr);
    }, [props, id]);

    return (
        <section className="man-banner spad">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="filter-control">
                            <ul>
                                {childCateMale.map((value, key) => {
                                    if (key === count) {
                                        return (
                                            <li key={key} className="active">
                                                {value.name}
                                            </li>
                                            // <li key={key} className="active">a</li>
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
                            {proCateMale.slice(0, 5).map((value, key) => {
                                return (
                                    <div
                                        key={key}
                                        className="product-item col-12"
                                    >
                                        <Link to={`/product/${value.slug}`}>
                                            <div className="pi-pic">
                                                <img
                                                    src={`https://shopfashi.herokuapp.com/products/${checkImage(
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

                                                <div className="icon">
                                                    <i className="icon_heart_alt"></i>
                                                </div>
                                                {/* <ul>
                                                <li className="w-icon active">
                                                    <a href="/#">
                                                        <i onClick={() =>
                                                            handleAddCart({ ...value, getQty: 1 })
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
                    <div className="col-lg-3 offset-lg-1">
                        {img.length !== 0 ? (
                            <div
                                className="product-large set-bg m-large"
                                style={{
                                    backgroundImage: `url(https://shopfashi.herokuapp.com/images/${img[0].image})`,
                                }}
                            >
                                <h2>{img[0].title}</h2>
                                <a href="/category/nam">Xem thêm</a>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductRight;
