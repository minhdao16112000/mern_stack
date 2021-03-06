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
                            ? 'Ch??a gi???i quy???t'
                            : get_order.status === 'Processing'
                            ? '??ang x??? l??'
                            : get_order.status === 'Completed'
                            ? '???? ho??n t???t'
                            : 'H???y h??ng'
                    }
                    className="select_status"
                    onChange={(e) => setSaveStatus(e.target.value)}
                >
                    <option value="Pending">Ch??a gi???i quy???t</option>
                    <option value="Processing">??ang x??? l??</option>
                    <option value="Completed">???? ho??n t???t</option>
                    <option value="Cancel">H???y h??ng</option>
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
                            ? '??ang chu???n b???'
                            : get_order.delivered === 'Delivering'
                            ? '??ang giao h??ng'
                            : '???? giao h??ng'
                    }
                    className="select_status"
                    onChange={(e) => setSaveDelivery(e.target.value)}
                >
                    <option value="Preparing">??ang chu???n b???</option>
                    <option value="Delivering">??ang giao h??ng</option>
                    <option value="Delivered">???? giao h??ng</option>
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
                                <h2>Chi Ti???t ????n H??ng</h2>
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
                                        &ensp;Quay L???i Danh S??ch
                                    </Link>
                                    &nbsp;
                                    <button
                                        type="submit"
                                        className="main-btn success-btn btn-hover"
                                        onClick={() => printDocument()}
                                    >
                                        <i className="fas fa-save"></i>
                                        &ensp;Xu???t file PDF
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
                                        <i className="fas fa-info"></i> Th??ng
                                        Tin ????n H??ng
                                    </h4>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="info_oder">
                                                            <label htmlFor="id">
                                                                M?? ????n H??ng:
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
                                                                Ng??y T???o:
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
                                                                Ph????ng Th???c
                                                                Thanh To??n:
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
                                                                Tr???ng Th??i Thanh
                                                                To??n:
                                                            </label>
                                                            <p>
                                                                <strong>
                                                                    {get_order.isPaid ===
                                                                    true
                                                                        ? '???? thanh to??n'
                                                                        : 'Ch??a thanh to??n'}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="info_oder">
                                                            <label htmlFor="fir">
                                                                Tr???ng Th??i ????n
                                                                H??ng:
                                                            </label>
                                                            {changeStatus ===
                                                            0 ? (
                                                                <p>
                                                                    <strong>
                                                                        {get_order.status ===
                                                                        'Pending'
                                                                            ? 'Ch??a gi???i quy???t'
                                                                            : get_order.status ===
                                                                              'Processing'
                                                                            ? '??ang x??? l??'
                                                                            : get_order.status ===
                                                                              'Completed'
                                                                            ? '???? ho??n t???t'
                                                                            : 'H???y h??ng'}
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
                                                                    C???p Nh???t
                                                                    Tr???ng Th??i
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
                                                                        C???p Nh???t
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setChangeStatus(
                                                                                0
                                                                            )
                                                                        }
                                                                        className="main-btn light-btn rounded-full btn-hover"
                                                                    >
                                                                        H???y
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
                                                                T??n Kh??ch H??ng:
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
                                                                T???m T??nh:
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
                                                                Ph?? V???n Chuy???n:
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
                                                                Gi???m gi??{''}
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
                                                                T???ng Ti???n:
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
                                                                Tr???ng Th??i Giao
                                                                H??ng:
                                                            </label>
                                                            {changeDelivery ===
                                                            0 ? (
                                                                <p>
                                                                    <strong>
                                                                        {get_order.delivered ===
                                                                        'Preparing'
                                                                            ? '??ang chu???n b???'
                                                                            : get_order.delivered ===
                                                                              'Delivering'
                                                                            ? '??ang giao h??ng'
                                                                            : '???? giao h??ng'}
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
                                                                    C???p Nh???t
                                                                    Tr???ng Th??i
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
                                                                        C???p Nh???t
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setChangeDelivery(
                                                                                0
                                                                            )
                                                                        }
                                                                        className="main-btn light-btn rounded-full btn-hover"
                                                                    >
                                                                        H???y
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
                                        To??n & V???n Chuy???n
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
                                                                <td>H???</td>
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
                                                                <td>T??n</td>
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
                                                                <td>?????a Ch???</td>
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
                                                                    S??? ??i???n
                                                                    Tho???i
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
                                                                <td>L??u ??</td>
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
                                                                            *Tr???ng*
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
                                        <i className="fas fa-th-list"></i> S???n
                                        Ph???m
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
                                                                        H??nh ???nh
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        T??n S???n
                                                                        Ph???m
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        M??u S???c
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        Size
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>Gi??</h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        S??? L?????ng
                                                                    </h6>
                                                                </th>
                                                                <th>
                                                                    <h6>
                                                                        T???ng
                                                                        Ti???n
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
                                                                Kh??ng C?? S???n
                                                                Ph???m
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
