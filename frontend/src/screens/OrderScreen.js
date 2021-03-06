import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import api from '../api';
import { detailsOrder, payOrder } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstant';
import MessageBox from '../components/Box/MessageBox';
import moment from 'moment';
import './styles/payment.scss';

const OrderScreen = (props) => {
    const dispatch = useDispatch();
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.order);
    const { order } = orderDetails;

    const oderPay = useSelector((state) => state.order);
    const { success: successPay } = oderPay;

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await api.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    return order && order.length !== 0 ? (
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
                                <span>Tr???ng Th??i Thanh To??n</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Checkout Section End -- */}
            <section className="checkout-section spad show-order">
                <div className="container">
                    <form action="#" className="checkout-form">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4>Chi Ti???t ????n H??ng</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label htmlFor="fir">H???</label>
                                        <p>
                                            <strong>
                                                {
                                                    order.shippingAddress
                                                        .firstName
                                                }
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="last">T??n</label>
                                        <p>
                                            <strong>
                                                {order.shippingAddress.lastName}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-12">
                                        <label htmlFor="street">?????a Ch???</label>
                                        <p>
                                            <strong>
                                                {order.shippingAddress.address}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="email">Email</label>
                                        <p>
                                            <strong>
                                                {
                                                    order.shippingAddress
                                                        .emailAddress
                                                }
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="phone">
                                            S??? ??i???n Tho???i
                                        </label>
                                        <p>
                                            <strong>
                                                {order.shippingAddress.phone}
                                            </strong>
                                        </p>
                                    </div>
                                    {order.shippingAddress.note.length !== 0 ? (
                                        <div className="col-lg-12">
                                            <label htmlFor="note">L??u ??</label>
                                            <p>{order.shippingAddress.note}</p>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                    {order.delivered === 'Delivered' ? (
                                        <MessageBox variant="success">
                                            ???? Giao H??ng L??c {order.deliveredAt}
                                        </MessageBox>
                                    ) : order.delivered === 'Delivering' ? (
                                        <MessageBox variant="warning">
                                            ??ang Giao H??ng
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">
                                            ??ang Chu???n B???
                                        </MessageBox>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="place-order">
                                    <h4>????n H??ng C???a B???n</h4>
                                    <div className="order-total">
                                        <ul className="order-table">
                                            <li>
                                                S???n Ph???m <span>T???ng</span>
                                            </li>
                                            {order.orderItems.map(
                                                (item, key) => {
                                                    return (
                                                        <li
                                                            key={key}
                                                            className="fw-normal"
                                                        >
                                                            {item.name} x{' '}
                                                            {item.quantity}
                                                            <span>
                                                                {formatVND(
                                                                    item.price *
                                                                        item.quantity
                                                                )}
                                                            </span>
                                                        </li>
                                                    );
                                                }
                                            )}
                                            <li className="fw-normal">
                                                T???m T??nh{' '}
                                                <span>
                                                    {formatVND(
                                                        order.totalPrice -
                                                            order.shippingFee
                                                    )}
                                                </span>
                                            </li>
                                            <li className="fw-normal">
                                                Ph?? Giao H??ng
                                                <span>
                                                    {formatVND(
                                                        order.shippingFee
                                                    )}
                                                </span>
                                            </li>
                                            <li className="fw-normal">
                                                Gi???m gi??
                                                <span>
                                                    -{' '}
                                                    {formatVND(
                                                        order.discount || 0
                                                    )}
                                                </span>
                                            </li>
                                            <li className="total-price">
                                                T???ng ti???n{' '}
                                                <span>
                                                    {formatVND(
                                                        order.totalPrice -
                                                            order.discount
                                                    )}{' '}
                                                    = $
                                                    {(
                                                        (order.totalPrice -
                                                            order.discount) /
                                                        25000
                                                    ).toFixed(2)}
                                                </span>
                                            </li>
                                        </ul>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">
                                                Thanh To??n L??c{' '}
                                                {moment(order.paidAt)
                                                    .utc()
                                                    .format('DD-MM-YYYY HH:ss')}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">
                                                Ch??a Thanh To??n
                                            </MessageBox>
                                        )}
                                        <div className="payment-check payment-method">
                                            <label>
                                                Ph????ng th???c thanh to??n:{' '}
                                            </label>
                                            <p>
                                                <strong>
                                                    {order.paymentMethod}
                                                </strong>
                                            </p>
                                        </div>
                                        <div>
                                            {sdkReady &&
                                            order.paymentMethod === 'Paypal' &&
                                            order.isPaid === false ? (
                                                <PayPalButton
                                                    amount={(
                                                        order.totalPrice / 25000
                                                    ).toFixed(2)}
                                                    onSuccess={
                                                        successPaymentHandler
                                                    }
                                                ></PayPalButton>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            {/* !-- Checkout Section End -- */}
        </div>
    ) : (
        <div></div>
    );
};

export default OrderScreen;
