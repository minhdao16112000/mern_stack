/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import {
    decreaseQuantity,
    deleteAllCart,
    deleteCart,
    increaseQuantity,
} from '../redux/actions/cartActions';
import { getColors, getSizes } from '../redux/actions/productActions';
import './styles/shoppingCart.scss';

const CartScreen = () => {
    const dispatch = useDispatch();
    const proCart = useSelector((state) => state.cart.carts);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);
    const [totalCart, setTotalCart] = useState(0);
    const [qtyPro, setQtyPro] = useState();
    let { url } = useRouteMatch();

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

    const handleChangeQty = () => {
        if (proCart.length !== 0) {
            const total = proCart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotalCart(total);
        }
    };

    const handleDelate = (key) => {
        dispatch(deleteCart(key));
        if (key !== 0) {
            handleChangeQty();
        } else {
            setTotalCart(0);
        }
        // window.location.reload();
    };

    const deleteAll = () => {
        dispatch(deleteAllCart());
        setTotalCart(0);
        // window.location.reload();
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
                                <a href="/">
                                    <i className="fa fa-home"></i> Trang Ch???
                                </a>
                                <span>Gi??? H??ng</span>
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
                                                <th>H??nh ???nh</th>
                                                <th className="p-name">
                                                    T??n S???n Ph???m
                                                </th>
                                                <th>Size</th>
                                                <th>M??u</th>
                                                <th>Gi??</th>
                                                <th>S??? L?????ng</th>
                                                <th>T???ng</th>
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
                                                                src={`http://localhost:5000/products/${checkImage(
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
                                                                    Kh??ng c??
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
                                                                        Kh??ng c??
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
                                                                        className="dec qtybutton"
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
                                                                        className="inc qtybutton"
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
                                                                    handleDelate(
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
                                            <a
                                                href="/#"
                                                className="primary-btn continue-shop"
                                            >
                                                Ti???p T???c Mua S???m
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 offset-lg-4">
                                        <div className="proceed-checkout">
                                            <ul>
                                                <li className="subtotal">
                                                    T???m t??nh({' '}
                                                    {proCart.reduce(
                                                        (a, c) =>
                                                            a + c.quantity,
                                                        0
                                                    )}{' '}
                                                    S???n Ph???m ){' '}
                                                    <span>
                                                        {formatVND(totalCart)}
                                                    </span>
                                                </li>
                                                <li className="cart-total">
                                                    T???ng ti???n{' '}
                                                    <span>
                                                        {formatVND(totalCart)}
                                                    </span>
                                                </li>
                                            </ul>
                                            <Link
                                                to={`${url}/check-out`}
                                                className="proceed-btn"
                                            >
                                                Ti???n H??nh Thanh To??n
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
                                    Kh??ng c?? s???n ph???m trong gi??? h??ng.
                                </p>
                                <Link to="/" className="active-for-click">
                                    V??? trang ch???
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
