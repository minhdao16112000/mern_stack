import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    destroyOrders,
    listTrashOrders,
    restoreOrders,
} from "../../../redux/actions/orderActions";
import OrderTable from "../../components/table/OrderTable";

const ListTrashOrders = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstOrders = useSelector((state) => state.order.orders);

    console.log(lstOrders);

    const checkButtonDestroy = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() =>
                        dispatch(destroyOrders(deleteItems.toString()))
                    }
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa Vĩnh Viễn
                </button>
            );
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa Vĩnh Viễn
                </button>
            );
        }
    };

    const checkButtonRestore = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn info-btn btn-hover"
                    onClick={() =>
                        dispatch(restoreOrders(deleteItems.toString()))
                    }
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Phục Hồi
                </button>
            );
        } else {
            return (
                <button className="main-btn info-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Phục Hồi
                </button>
            );
        }
    };

    useEffect(() => {
        document.title = "Manage Orders";
        dispatch(listTrashOrders());
        // dispatch(getTopics());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Đơn Hàng Đã Xóa</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to="/admin/orders"
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>
                                        &ensp;Danh Sách Đơn Hàng
                                    </Link>
                                    &nbsp;
                                    {checkButtonRestore()}
                                    &nbsp;
                                    {checkButtonDestroy()}
                                    &nbsp;
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                {lstOrders && lstOrders.length ? (
                    <OrderTable
                        list={lstOrders}
                        setDeleteItems={setDeleteItems}
                    />
                ) : (
                    <OrderTable list={[]} setDeleteItems={setDeleteItems} />
                )}
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListTrashOrders;
