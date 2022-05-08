/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import {
    decreaseQuantity,
    deleteAllCart,
    deleteCart,
    increaseQuantity,
} from '../redux/actions/cartActions';
import { getColors, getSizes } from '../redux/actions/productActions';

const CartScreen = () => {
    const dispatch = useDispatch();
    const proCart = useSelector((state) => state.cart.carts);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);
    const [totalCart, setTotalCart] = useState(0);
    const [qtyPro, setQtyPro] = useState();
    let { url } = useRouteMatch();

    // const checkSlug = (id) => {
    //     var catArr = [];
    //     var catslug = '';
    //     if (lstCate.Categories) {
    //         lstCate.Categories.forEach((value) => {
    //             if (id.includes(value._id)) {
    //                 catArr.push(value.slug);
    //             }
    //         });
    //         catArr.forEach((value) => {
    //             catslug += value + '/';
    //         });
    //     }
    //     return catslug.slice(0, -1);
    // };

    const handleChangeQty = () => {
        if (proCart.length !== 0) {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotalCart(total);
        }
    };

    const QtyUpdateIncr = (key, quantity) => {
        dispatch(increaseQuantity(key));
        setQtyPro(quantity);
        handleChangeQty();
    };

    const QtyUpdateDecr = (key, quantity) => {
        dispatch(decreaseQuantity(key));
        setQtyPro(quantity);
        handleChangeQty();
    };

    const handleDelete = (key) => {
        dispatch(deleteCart(key));
        if (proCart.length !== 0) {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotalCart(total);
        }
    };

    const deleteAll = () => {
        dispatch(deleteAllCart());
        setTotalCart(0);
    };

    const checkColor = (id) => {
        var colorArr = [];
        if (lstColors.Colors) {
            lstColors.Colors.forEach((value) => {
                if (id.includes(value._id)) {
                    colorArr.push(value.code);
                }
            });
        }
        return colorArr.toString();
    };

    const checkSize = (id) => {
        var sizeArr = [];
        if (lstSizes.Sizes) {
            lstSizes.Sizes.forEach((value) => {
                if (id.includes(value._id)) {
                    sizeArr.push(value.name);
                }
            });
        }
        return <b>{sizeArr.toString()}</b>;
    };

    const checkImage = (key) => {
        let Arr = [];
        proCart.forEach((value) => {
            const imageArr = value.image.split(',');
            Arr.push(imageArr[0]);
        });
        return Arr[key];
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        dispatch(getColors());
        dispatch(getSizes());

        const getTotal = () => {
            if (proCart.length !== 0) {
                const total = proCart.reduce((prev, item) => {
                    return prev + item.price * item.quantity;
                }, 0);
                setTotalCart(total);
            }
        };
        getTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proCart]);

    return (
        <div>
            {/* !-- Breadcrumb Section Begin -- */}
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <Link to="/">
                                    <i className="fa fa-home"></i> Trang Chủ
                                </Link>
                                <span>Giỏ Hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Shopping Cart Section Begin -- */}
            {proCart.length !== 0 ? (
                <section className="shopping-cart spad show-shoppingCart">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cart-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Hình Ảnh</th>
                                                <th className="p-name">
                                                    Tên Sản Phẩm
                                                </th>
                                                <th>Size</th>
                                                <th>Màu</th>
                                                <th>Giá</th>
                                                <th>Số Lượng</th>
                                                <th>Tổng</th>
                                                <th>
                                                    <i
                                                        onClick={() =>
                                                            deleteAll()
                                                        }
                                                        className="ti-close"
                                                    ></i>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proCart.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="cart-pic first-row">
                                                            <img
                                                                src={`https://shopfashi.herokuapp.com/products/${checkImage(
                                                                    key
                                                                )}`}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="cart-title first-row">
                                                            <h5>{item.name}</h5>
                                                        </td>
                                                        {item.size.length !==
                                                        0 ? (
                                                            <td className="cart-size first-row">
                                                                <h5>
                                                                    {checkSize(
                                                                        item.size
                                                                    )}
                                                                </h5>
                                                            </td>
                                                        ) : (
                                                            <td
                                                                className="cart-size first-row"
                                                                style={{
                                                                    paddingLeft:
                                                                        '20px',
                                                                    paddingRight:
                                                                        '15px',
                                                                    fontStyle:
                                                                        'italic',
                                                                    opacity:
                                                                        '50%',
                                                                }}
                                                            >
                                                                <h5>
                                                                    Không có
                                                                </h5>
                                                            </td>
                                                        )}

                                                        <td className="cart-color first-row">
                                                            {item.color
                                                                .length !==
                                                            0 ? (
                                                                <div
                                                                    className="code-color"
                                                                    style={{
                                                                        backgroundColor:
                                                                            checkColor(
                                                                                item.color
                                                                            ),
                                                                    }}
                                                                >
                                                                    {' '}
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    style={{
                                                                        paddingLeft:
                                                                            '15px',
                                                                        paddingRight:
                                                                            '15px',
                                                                        fontStyle:
                                                                            'italic',
                                                                        opacity:
                                                                            '50%',
                                                                        fontSize:
                                                                            '18px',
                                                                    }}
                                                                >
                                                                    <h5>
                                                                        Không có
                                                                    </h5>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="p-price first-row">
                                                            {formatVND(
                                                                item.price
                                                            )}
                                                        </td>
                                                        <td className="qua-col first-row">
                                                            <div className="quantity">
                                                                <div className="pro-qty">
                                                                    <span
                                                                        onClick={() =>
                                                                            QtyUpdateDecr(
                                                                                key,
                                                                                item.quantity
                                                                            )
                                                                        }
                                                                        className="dec qtybtn"
                                                                    >
                                                                        -
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            item.quantity
                                                                                ? item.quantity
                                                                                : 1
                                                                        }
                                                                        readOnly
                                                                    />
                                                                    <span
                                                                        onClick={() =>
                                                                            QtyUpdateIncr(
                                                                                key,
                                                                                item.quantity
                                                                            )
                                                                        }
                                                                        className="inc qtybtn"
                                                                    >
                                                                        +
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="total-price first-row">
                                                            {formatVND(
                                                                item.price *
                                                                    item.quantity
                                                            )}
                                                        </td>
                                                        <td className="close-td first-row">
                                                            <i
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        key
                                                                    )
                                                                }
                                                                className="ti-close"
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="cart-buttons">
                                            <Link
                                                to="/"
                                                className="primary-btn continue-shop"
                                            >
                                                Tiếp Tục Mua Sắm
                                            </Link>
                                        </div>
                                        <div className="discount-coupon">
                                            <h6>Mã Giảm Giá</h6>
                                            <form
                                                action="#"
                                                className="coupon-form"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Nhập Mã Giảm Giá"
                                                />
                                                <button
                                                    type="submit"
                                                    className="site-btn coupon-btn"
                                                >
                                                    Áp Dụng
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 offset-lg-4">
                                        <div className="proceed-checkout">
                                            <ul>
                                                <li className="subtotal">
                                                    Tạm tính({' '}
                                                    {proCart.reduce(
                                                        (a, c) =>
                                                            a + c.quantity,
                                                        0
                                                    )}{' '}
                                                    Sản Phẩm ){' '}
                                                    <span>
                                                        {formatVND(totalCart)}
                                                    </span>
                                                </li>
                                                <li className="cart-total">
                                                    Tổng tiền{' '}
                                                    <span>
                                                        {formatVND(totalCart)}
                                                    </span>
                                                </li>
                                            </ul>
                                            <Link
                                                to={`${url}/check-out`}
                                                className="proceed-btn"
                                            >
                                                Tiến Hành Thanh Toán
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="shopping-cart spad show-shoppingCart">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 no-product">
                                <p className="text-noPro">
                                    Không có sản phẩm trong giỏ hàng.
                                </p>
                                <Link to="/" className="active-for-click">
                                    Về trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {/* !-- Shopping Cart Section End -- */}
        </div>
    );
};

export default CartScreen;
