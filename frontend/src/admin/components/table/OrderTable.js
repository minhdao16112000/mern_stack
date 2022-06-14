import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    ORDER_DELETE_RESET,
    ORDER_DESTROY_RESET,
    ORDER_RESTORE_RESET,
} from '../../../constants/orderConstant';
import {
    listOrder,
    listTrashOrders,
} from '../../../redux/actions/orderActions';

const OrderTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);

    const handelOrder = useSelector((state) => state.order);

    const {
        error: errorHandle,
        trash: pushOrderToTrash,
        delete: deleteOrder,
        restore: restoreOrder,
    } = handelOrder;

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const isChecked = (e, id) => {
        const checked = e.target.checked;
        if (checked) {
            setItemsChecked((oldval) => [...oldval, id]);
        } else {
            setItemsChecked(
                itemsChecked.filter((item) => {
                    return item !== id;
                })
            );
        }
    };

    useEffect(() => {
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        // if (activeOrder && activeOrder === true) {
        //     dispatch(listOrder());
        //     dispatch({ type: ORDER_STATUS_RESET });
        // }

        if (pushOrderToTrash && pushOrderToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(listOrder());
            dispatch({ type: ORDER_DELETE_RESET });
        }

        if (deleteOrder && deleteOrder === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashOrders());
            dispatch({ type: ORDER_DESTROY_RESET });
        }

        if (restoreOrder && restoreOrder === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashOrders());
            dispatch({ type: ORDER_RESTORE_RESET });
        }

        props.setDeleteItems(itemsChecked);
    }, [
        deleteOrder,
        dispatch,
        errorHandle,
        itemsChecked,
        props,
        pushOrderToTrash,
        restoreOrder,
    ]);

    return (
        <div className="tables-wrapper">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-style mb-30">
                        <div className="table-wrapper table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            <h6>#</h6>
                                        </th>
                                        <th>
                                            <h6>Mã Đơn Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Khách Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Trạng Thái Thanh Toán</h6>
                                        </th>
                                        <th>
                                            <h6>Trạng Thái Giao Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Thời Điểm Tạo</h6>
                                        </th>
                                        <th>
                                            <h6>Tổng Tiền</h6>
                                        </th>
                                        {url === '/admin/orders/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
                                            </th>
                                        ) : (
                                            <>
                                                <th>
                                                    <h6
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Trạng Thái
                                                    </h6>
                                                </th>
                                                <th>
                                                    <h6>Chức Năng</h6>
                                                </th>
                                            </>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Đơn Hàng Nào Cả
                                    </p>
                                ) : (
                                    <tbody>
                                        {currentTodos.map((value, key) => {
                                            return (
                                                <tr key={key} id={value._id}>
                                                    <td>
                                                        <div className="check-input-primary">
                                                            <input
                                                                className="form-check-input check-admin"
                                                                type="checkbox"
                                                                id="checkbox-1"
                                                                onClick={(e) =>
                                                                    isChecked(
                                                                        e,
                                                                        value._id
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value._id}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {
                                                                value
                                                                    .shippingAddress
                                                                    .firstName
                                                            }{' '}
                                                            {
                                                                value
                                                                    .shippingAddress
                                                                    .lastName
                                                            }
                                                        </p>
                                                    </td>
                                                    <td
                                                        className="min-width"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p>
                                                            {value.isPaid ===
                                                            true
                                                                ? 'Đã Thanh toán'
                                                                : 'Chưa thanh toán'}
                                                        </p>
                                                    </td>
                                                    <td
                                                        className="min-width"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <p>
                                                            {value.delivered ===
                                                            'Preparing'
                                                                ? 'Đang chuẩn bị'
                                                                : value.delivered ===
                                                                  'Delivering'
                                                                ? 'Đang giao hàng'
                                                                : 'Đã giao hàng'}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {new Date(
                                                                value.createdAt
                                                            ).toLocaleString(
                                                                'en-CA'
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.discount
                                                                ? formatVND(
                                                                      value.totalPrice -
                                                                          value.discount
                                                                  )
                                                                : formatVND(
                                                                      value.totalPrice
                                                                  )}
                                                        </p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td
                                                                className="min-width"
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                            >
                                                                {value.status ===
                                                                'Pending' ? (
                                                                    <span className="status-btn warning-btn">
                                                                        {
                                                                            'Chưa giải quyết'
                                                                        }
                                                                    </span>
                                                                ) : value.status ===
                                                                  'Processing' ? (
                                                                    <span className="status-btn active-btn">
                                                                        {
                                                                            'Đang xử lý'
                                                                        }
                                                                    </span>
                                                                ) : value.status ===
                                                                  'Completed' ? (
                                                                    <span className="status-btn success-btn">
                                                                        {
                                                                            'Đã hoàn tất'
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <span className="status-btn close-btn">
                                                                        {
                                                                            'Hủy hàng'
                                                                        }
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="action"
                                                                    style={{
                                                                        textAlign:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <Link
                                                                        to={`${url}/${value._id}`}
                                                                        className="text-primary"
                                                                    >
                                                                        <i className="fas fa-info-circle"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="min-width">
                                                                <p>
                                                                    {moment(
                                                                        value.deletedAt
                                                                    )
                                                                        .utc()
                                                                        .format(
                                                                            'DD-MM-YYYY HH:ss'
                                                                        )}
                                                                </p>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                        {/*-- end table row --*/}
                                    </tbody>
                                )}
                            </table>
                            {/*-- end table --*/}
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={list ? list.length : 0}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    {/*-- end card --*/}
                </div>
                {/*-- end col --*/}
            </div>
            {/*-- end row --*/}
        </div>
    );
};

export default OrderTable;
