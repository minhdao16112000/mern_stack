import React, { useEffect } from 'react';
import { listOrderMine } from '../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/history.scss';

const OrderHistoryScreen = (props) => {
    const dispatch = useDispatch();
    const orderMineList = useSelector((state) => state.order);
    const { orders } = orderMineList;

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

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
                                <span>Lịch Sử Mua Hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* !-- Breadcrumb Section End -- */}

            {/* !-- Shopping Cart Section Begin -- */}
            <section className="shopping-cart spad show-historyOrder">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th className="p-name">Ngày</th>
                                            <th>Tổng Tiền</th>
                                            <th>Tình Trạng Thanh Toán</th>
                                            <th>Trình Trạng Giao Hàng</th>
                                            <th>Hành Động</th>
                                            {/* <th><i onClick={() => deleteAll()} className="ti-close"></i></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.length !== 0 ? (
                                            orders.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td className="cart-title first-row">
                                                            <h5>{item._id}</h5>
                                                        </td>
                                                        <td className="cart-title first-row">
                                                            <h5>
                                                                {item.createdAt.substring(
                                                                    0,
                                                                    10
                                                                )}
                                                            </h5>
                                                        </td>
                                                        <td className="p-price first-row">
                                                            {item.discount
                                                                ? formatVND(
                                                                      item.totalPrice -
                                                                          item.discount
                                                                  )
                                                                : formatVND(
                                                                      item.totalPrice
                                                                  )}
                                                        </td>
                                                        <td className="qua-col first-row">
                                                            <div className="quantity">
                                                                <span>
                                                                    {item.isPaid ? (
                                                                        <b className="text-success">
                                                                            {item.paidAt.substring(
                                                                                0,
                                                                                10
                                                                            )}
                                                                        </b>
                                                                    ) : (
                                                                        <b className="text-danger">
                                                                            Chưa
                                                                            thanh
                                                                            toán
                                                                        </b>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="qua-col first-row">
                                                            <div className="quantity">
                                                                {item.delivered ===
                                                                'Delivered' ? (
                                                                    <span className="text-success">
                                                                        <b>
                                                                            {item.deliveredAt.substring(
                                                                                0,
                                                                                10
                                                                            )}
                                                                        </b>
                                                                    </span>
                                                                ) : item.delivered ===
                                                                  'Delivering' ? (
                                                                    <span className="text-info">
                                                                        <b>
                                                                            Đang
                                                                            giao
                                                                            hàng
                                                                        </b>
                                                                    </span>
                                                                ) : (
                                                                    <b>
                                                                        Đang
                                                                        chuẩn bị
                                                                    </b>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="close-td first-row">
                                                            <i
                                                                onClick={() => {
                                                                    props.history.push(
                                                                        `/order/${item._id}`
                                                                    );
                                                                }}
                                                                className="fas fa-info-circle text-primary"
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5">
                                                    <h2
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Bạn Chưa Có Đơn Hàng Nào
                                                        !
                                                    </h2>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* !-- Shopping Cart Section End -- */}
        </div>
    );
};

export default OrderHistoryScreen;
