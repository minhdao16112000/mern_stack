import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    deliveredOrder,
    detailsOrder,
    statusOrder,
} from '../../../../redux/actions/orderActions';
import { getColors, getSizes } from '../../../../redux/actions/productActions';
import '../style.scss';
import { toast } from 'react-toastify';
import { ORDER_DELIVERED_RESET } from '../../../../constants/orderConstant';

const FormEditOrder = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const get_order = useSelector((state) => state.order.order);
    const lstColors = useSelector((state) => state.product.colors_list);
    const lstSizes = useSelector((state) => state.product.sizes_list);
    const handleOrder = useSelector((state) => state.order);

    const { error: errorHandle, success: successHandle } = handleOrder;

    const [changeStatus, setChangeStatus] = useState(0);
    const [saveStatus, setSaveStatus] = useState(get_order.status);

    const [changeDelivery, setChangeDelivery] = useState(0);
    const [saveDelivery, setSaveDelivery] = useState(get_order.delivered);

    const printDocument = async () => {
        const input = document.getElementById('divToPrint');
        await html2canvas(input, {
            // allowTaint: true,
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 15, 50, 180, 180);
            pdf.save('download.pdf');
        });
    };

    const handleOnClickChange = (data) => {
        setChangeStatus(0);
        get_order.status = saveStatus;
        dispatch(statusOrder(data));
    };

    const handleClickChange = (data) => {
        setChangeDelivery(0);
        get_order.delivered = saveDelivery;
        dispatch(deliveredOrder(data));
    };

    const handleChangeStatus = () => {
        return (
            <div className="select-position">
                <select
                    defaultValue={
                        get_order.status === 'Pending'
                            ? 'Chưa giải quyết'
                            : get_order.status === 'Processing'
                            ? 'Đang xử lý'
                            : get_order.status === 'Completed'
                            ? 'Đã hoàn tất'
                            : 'Hủy hàng'
                    }
                    className="select_status"
                    onChange={(e) => setSaveStatus(e.target.value)}
                >
                    <option value="Pending">Chưa giải quyết</option>
                    <option value="Processing">Đang xử lý</option>
                    <option value="Completed">Đã hoàn tất</option>
                    <option value="Cancel">Hủy hàng</option>
                </select>
            </div>
        );
    };

    const handleChangeDelivery = () => {
        return (
            <div className="select-position">
                <select
                    defaultValue={
                        get_order.delivered === 'Preparing'
                            ? 'Đang chuẩn bị'
                            : get_order.delivered === 'Delivering'
                            ? 'Đang giao hàng'
                            : 'Đã giao hàng'
                    }
                    className="select_status"
                    onChange={(e) => setSaveDelivery(e.target.value)}
                >
                    <option value="Preparing">Đang chuẩn bị</option>
                    <option value="Delivering">Đang giao hàng</option>
                    <option value="Delivered">Đã giao hàng</option>
                </select>
            </div>
        );
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
        return <p>{sizeArr.toString()}</p>;
    };

    const checkImage = (key) => {
        let Arr = [];
        get_order.orderItems.forEach((value) => {
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
        document.title = 'Manage Orders';
        if (id) dispatch(detailsOrder(id));
        if (successHandle && successHandle === true) {
            dispatch({ type: ORDER_DELIVERED_RESET });
            dispatch(detailsOrder(id));
        }
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        dispatch(getColors());
        dispatch(getSizes());

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <section className="tab-components">
            <div className="container-fluid" id="divToPrint">
                {/* ========== title-wrapper start ========== */}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Chi Tiết Đơn Hàng</h2>
                            </div>
                        </div>
                        {/* end col */}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to={`/admin/orders`}
                                        className="main-btn active-btn btn-hover"
                                    >
                                        <i className="fas fa-chevron-circle-left"></i>
                                        &ensp;Quay Lại Danh Sách
                                    </Link>
                                    &nbsp;
                                    <button
                                        type="submit"
                                        className="main-btn success-btn btn-hover"
                                        onClick={() => printDocument()}
                                    >
                                        <i className="fas fa-save"></i>
                                        &ensp;Xuất file PDF
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* ========== title-wrapper end ========== */}
                {get_order.length !== 0 ? (
                    <div className="row">
                        <div className="col-lg-12">
                            {/* input style start */}
                            <div className="card-style mb-30">
                                <div>
                                    <h4
                                        style={{
                                            fontSize: '25px',
                                            fontWeight: '700',
                                            color: '#595959',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <i className="fas fa-info"></i> Thông
                                        Tin Đơn Hàng
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="info_oder">
                                                            <label htmlFor="id">
                                                                Mã Đơn Hàng:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        get_order._id
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="cre">
                                                                Ngày Tạo:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {new Date(
                                                                        get_order.createdAt
                                                                    ).toLocaleString(
                                                                        'en-CA'
                                                                    )}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Phương Thức
                                                                Thanh Toán:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        get_order.paymentMethod
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Trạng Thái Thanh
                                                                Toán:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {get_order.isPaid ===
                                                                    true
                                                                        ? 'Đã thanh toán'
                                                                        : 'Chưa thanh toán'}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Trạng Thái Đơn
                                                                Hàng:
                                                            </label>
                                                            {changeStatus ===
                                                            0 ? (
                                                                <p>
                                                                    <strong>
                                                                        {get_order.status ===
                                                                        'Pending'
                                                                            ? 'Chưa giải quyết'
                                                                            : get_order.status ===
                                                                              'Processing'
                                                                            ? 'Đang xử lý'
                                                                            : get_order.status ===
                                                                              'Completed'
                                                                            ? 'Đã hoàn tất'
                                                                            : 'Hủy hàng'}
                                                                    </strong>
                                                                </p>
                                                            ) : (
                                                                handleChangeStatus()
                                                            )}
                                                        </div>
                                                        <div className="info_oder_button">
                                                            {changeStatus ===
                                                            0 ? (
                                                                <button
                                                                    onClick={() =>
                                                                        setChangeStatus(
                                                                            1
                                                                        )
                                                                    }
                                                                    className="main-btn deactive-btn rounded-full btn-hover"
                                                                >
                                                                    Cập Nhật
                                                                    Trạng Thái
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleOnClickChange(
                                                                                {
                                                                                    id: get_order._id,
                                                                                    saveStatus,
                                                                                }
                                                                            )
                                                                        }
                                                                        className="main-btn active-btn rounded-full btn-hover"
                                                                    >
                                                                        Cập Nhật
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setChangeStatus(
                                                                                0
                                                                            )
                                                                        }
                                                                        className="main-btn light-btn rounded-full btn-hover"
                                                                    >
                                                                        Hủy
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                        {/* end input */}
                                                    </div>
                                                    <div
                                                        className="col-lg-6"
                                                        style={{
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <div className="info_oder">
                                                            <label htmlFor="cus">
                                                                Tên Khách Hàng:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {get_order
                                                                        .shippingAddress
                                                                        .firstName +
                                                                        ' ' +
                                                                        get_order
                                                                            .shippingAddress
                                                                            .lastName}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Tạm Tính:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {formatVND(
                                                                        get_order.totalPrice -
                                                                            get_order.shippingFee
                                                                    )}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Phí Vận Chuyển:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {formatVND(
                                                                        get_order.shippingFee
                                                                    )}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Giảm giá{''}
                                                                {get_order.voucher &&
                                                                get_order
                                                                    .voucher
                                                                    .length !==
                                                                    0
                                                                    ? ' (' +
                                                                      get_order.voucher +
                                                                      ')'
                                                                    : ':'}
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    -
                                                                    {formatVND(
                                                                        get_order.discount
                                                                    ) || 0}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Tổng Tiền:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {formatVND(
                                                                        get_order.totalPrice
                                                                    )}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Trạng Thái Giao
                                                                Hàng:
                                                            </label>
                                                            {changeDelivery ===
                                                            0 ? (
                                                                <p>
                                                                    <strong>
                                                                        {get_order.delivered ===
                                                                        'Preparing'
                                                                            ? 'Đang chuẩn bị'
                                                                            : get_order.delivered ===
                                                                              'Delivering'
                                                                            ? 'Đang giao hàng'
                                                                            : 'Đã giao hàng'}
                                                                    </strong>
                                                                </p>
                                                            ) : (
                                                                handleChangeDelivery()
                                                            )}
                                                        </div>
                                                        <div className="info_oder_button">
                                                            {changeDelivery ===
                                                            0 ? (
                                                                <button
                                                                    onClick={() =>
                                                                        setChangeDelivery(
                                                                            1
                                                                        )
                                                                    }
                                                                    className="main-btn deactive-btn rounded-full btn-hover"
                                                                >
                                                                    Cập Nhật
                                                                    Trạng Thái
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleClickChange(
                                                                                {
                                                                                    id: get_order._id,
                                                                                    saveDelivery,
                                                                                }
                                                                            )
                                                                        }
                                                                        className="main-btn active-btn rounded-full btn-hover"
                                                                    >
                                                                        Cập Nhật
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setChangeDelivery(
                                                                                0
                                                                            )
                                                                        }
                                                                        className="main-btn light-btn rounded-full btn-hover"
                                                                    >
                                                                        Hủy
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* end input */}
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <h4
                                        style={{
                                            fontSize: '25px',
                                            fontWeight: '700',
                                            color: '#595959',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <i className="fas fa-truck"></i> Thanh
                                        Toán & Vận Chuyển
                                    </h4>
                                    <div className="row">
                                        <div
                                            className="col-lg-12"
                                            style={{ textAlign: 'center' }}
                                        >
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="table-wrapper table-responsive">
                                                    <table className="table striped-table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Họ</td>
                                                                <td>
                                                                    <strong>
                                                                        {
                                                                            get_order
                                                                                .shippingAddress
                                                                                .firstName
                                                                        }
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tên</td>
                                                                <td>
                                                                    <strong>
                                                                        {
                                                                            get_order
                                                                                .shippingAddress
                                                                                .lastName
                                                                        }
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Địa Chỉ</td>
                                                                <td>
                                                                    <strong>
                                                                        {
                                                                            get_order
                                                                                .shippingAddress
                                                                                .address
                                                                        }
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email</td>
                                                                <td>
                                                                    <strong>
                                                                        {
                                                                            get_order
                                                                                .shippingAddress
                                                                                .emailAddress
                                                                        }
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Số Điện
                                                                    Thoại
                                                                </td>
                                                                <td>
                                                                    <strong>
                                                                        {
                                                                            get_order
                                                                                .shippingAddress
                                                                                .phone
                                                                        }
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Lưu Ý</td>
                                                                <td>
                                                                    {get_order
                                                                        .shippingAddress
                                                                        .note ? (
                                                                        get_order
                                                                            .shippingAddress
                                                                            .note
                                                                    ) : (
                                                                        <i
                                                                            style={{
                                                                                opacity:
                                                                                    '50%',
                                                                            }}
                                                                        >
                                                                            *Trống*
                                                                        </i>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <h4
                                        style={{
                                            fontSize: '25px',
                                            fontWeight: '700',
                                            color: '#595959',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <i className="fas fa-th-list"></i> Sản
                                        Phẩm
                                    </h4>
                                    <div className="row">
                                        <div
                                            className="col-lg-12"
                                            style={{ textAlign: 'center' }}
                                        >
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="table-wrapper table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    <h6>
                                                                        Hình Ảnh
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Tên Sản
                                                                        Phẩm
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Màu Sắc
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Size
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Giá</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Số Lượng
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Tổng
                                                                        Tiền
                                                                    </h6>
                                                                </th>
                                                                {/* <th>
                                                                    <h6>Options</h6>
                                                                </th> */}
                                                            </tr>
                                                            {/*-- end table row--*/}
                                                        </thead>
                                                        {get_order.orderItems
                                                            .length === 0 ? (
                                                            <p className="text-center">
                                                                Không Có Sản
                                                                Phẩm
                                                            </p>
                                                        ) : (
                                                            <tbody>
                                                                {get_order.orderItems.map(
                                                                    (
                                                                        value,
                                                                        key
                                                                    ) => {
                                                                        return (
                                                                            <tr
                                                                                key={
                                                                                    key
                                                                                }
                                                                                id={
                                                                                    value._id
                                                                                }
                                                                            >
                                                                                <td className="min-width th-admin">
                                                                                    <img
                                                                                        src={`http://localhost:5000/products/${checkImage(
                                                                                            key
                                                                                        )}`}
                                                                                        alt=""
                                                                                    />
                                                                                </td>
                                                                                <td className="min-width">
                                                                                    <p>
                                                                                        {
                                                                                            value.name
                                                                                        }
                                                                                    </p>
                                                                                </td>
                                                                                <td
                                                                                    className="min-width"
                                                                                    style={{
                                                                                        width: '50px',
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        className="code-color"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                checkColor(
                                                                                                    value.color
                                                                                                ),
                                                                                        }}
                                                                                    >
                                                                                        {' '}
                                                                                    </div>
                                                                                </td>
                                                                                <td className="min-width">
                                                                                    {checkSize(
                                                                                        value.size
                                                                                    )}
                                                                                </td>
                                                                                <td className="min-width">
                                                                                    <p>
                                                                                        {formatVND(
                                                                                            value.price
                                                                                        )}
                                                                                    </p>
                                                                                </td>
                                                                                <td className="min-width">
                                                                                    <p>
                                                                                        {
                                                                                            value.quantity
                                                                                        }
                                                                                    </p>
                                                                                </td>
                                                                                <td className="min-width">
                                                                                    <p>
                                                                                        {formatVND(
                                                                                            value.price *
                                                                                                value.quantity
                                                                                        )}
                                                                                    </p>
                                                                                </td>
                                                                                {/* <td>
                                                                                <div className="action">
                                                                                    <Link
                                                                                        to={`${url}/${value._id}`}
                                                                                        className="text-primary"
                                                                                        title="Edit"
                                                                                    >
                                                                                        <i className="fas fa-pen-square"></i>
                                                                                    </Link>
                                                                                </div>
                                                                            </td> */}
                                                                            </tr>
                                                                        );
                                                                    }
                                                                )}
                                                                {/*-- end table row --*/}
                                                            </tbody>
                                                        )}
                                                    </table>
                                                </div>
                                                {/* end card */}
                                                {/* ======= input style end ======= */}
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                {/* end input */}
                            </div>
                            {/* end card */}
                            {/* ======= input style end ======= */}
                        </div>
                        {/* end col */}
                    </div>
                ) : (
                    <></>
                )}
                {/* end row */}
            </div>
            {/* end container */}
        </section>
    );
};

export default FormEditOrder;
