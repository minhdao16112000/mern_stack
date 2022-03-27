import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    destroySizes,
    getTrashSizes,
    restoreSizes,
} from "../../../redux/actions/productActions";
import SizeTable from "../../components/table/SizeTable";

const ListTrashSizes = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstSizes = useSelector((state) => state.product.sizes_list);

    const checkButtonDestroy = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() =>
                        dispatch(destroySizes(deleteItems.toString()))
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
                        dispatch(restoreSizes(deleteItems.toString()))
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
        document.title = "Manage Sizes";
        dispatch(getTrashSizes());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Sizes Đã Xóa</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to="/admin/sizes"
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>
                                        &ensp;Danh Sách Sizes
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
                {lstSizes && lstSizes.length ? (
                    <SizeTable
                        list={lstSizes}
                        setDeleteItems={setDeleteItems}
                    />
                ) : (
                    <SizeTable list={[]} setDeleteItems={setDeleteItems} />
                )}
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListTrashSizes;
