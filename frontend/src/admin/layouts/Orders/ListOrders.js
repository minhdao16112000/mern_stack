import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import { deleteOrders, listOrder } from '../../../redux/actions/orderActions';
import ExportExcel from '../../components/Export/ExportExcel';
import OrderTable from '../../components/table/OrderTable';

const ListOrders = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstOrders = useSelector((state) => state.order.orders);

    const { deletedCount, Orders } = lstOrders;

    const ClickDeleteHandler = () => {
        dispatch(deleteOrders(deleteItems.toString()));
    };

    const formatVND = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const checkButtonDelete = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() => ClickDeleteHandler()}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa(Đã Chọn)
                </button>
            );
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa
                </button>
            );
        }
    };

    const getData = () => {
        let displayOders = [];
        if (lstOrders && Orders) {
            displayOders = [...Orders];
        }
        const myExportData = displayOders.map((d) => {
            return {
                'Mã đơn hàng': d._id.slice(-6).toUpperCase(),
                'Phương thức thanh toán':
                    d.paymentMethod === 'cash' ? 'Tiền mặt' : d.paymentMethod,
                'Trạng thái thanh toán':
                    d.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán',
                'Ngày mua hàng': moment(d.createdAt)
                    .utc()
                    .format('DD-MM-YYYY HH:ss'),
                Họ: d.shippingAddress.lastName,
                Tên: d.shippingAddress.firstName,
                Phone: d.shippingAddress.phone,
                'SLSP đã mua': d.orderItems.length,
                'Phí vận chuyển': formatVND(d.shippingFee),
                'Tổng tiền': formatVND(d.totalPrice),
            };
        });
        return myExportData;
    };

    const getFooter = () => {
        let displayOders = [];
        if (lstOrders && Orders) {
            displayOders = [...Orders];
            let total = 0;
            const footer = [];
            const myExportData = displayOders.map((d) => {
                total += d.totalPrice;
                return {
                    'Mã đơn hàng': d._id.slice(-6).toUpperCase(),
                    'Phương thức thanh toán':
                        d.paymentMethod === 'cash'
                            ? 'Tiền mặt'
                            : d.paymentMethod,
                    'Trạng thái thanh toán':
                        d.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán',
                    'Ngày mua hàng': moment(d.createdAt)
                        .utc()
                        .format('DD-MM-YYYY HH:ss'),
                    Họ: d.shippingAddress.lastName,
                    Tên: d.shippingAddress.firstName,
                    Phone: d.shippingAddress.phone,
                    'Số lượng sản phẩm đã mua': d.orderItems.length,
                    'Phí vận chuyển': d.shippingFee,
                    'Tổng tiền': d.totalPrice,
                };
            });
            let i = 0;
            Object.keys(myExportData[0]).forEach((value) => {
                footer[i++] = '';
            });
            footer[0] = 'Total';
            footer[footer.length - 1] = formatVND(total);
            return footer;
        }
    };

    useEffect(() => {
        document.title = 'Manage Orders';
        dispatch(listOrder());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Đơn Hàng</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div
                                className="breadcrumb-wrapper"
                                style={{ marginBottom: '5px' }}
                            >
                                <nav aria-label="breadcrumb">
                                    <ExportExcel
                                        getData={getData()}
                                        getFooter={getFooter()}
                                    ></ExportExcel>
                                    &nbsp;
                                    {checkButtonDelete()}
                                    &nbsp;
                                    <Link
                                        to={`${url}/trash`}
                                        className="main-btn warning-btn btn-hover"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                        &ensp;Thùng Rác (
                                        {deletedCount ? deletedCount : 0})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <OrderTable list={Orders} setDeleteItems={setDeleteItems} />
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListOrders;
