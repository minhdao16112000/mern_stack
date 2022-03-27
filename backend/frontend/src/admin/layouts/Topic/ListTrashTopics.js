import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    destroyTopics,
    getTrashTopics,
    restoreTopics,
} from "../../../redux/actions/topicActions";
import TopicTable from "../../components/table/TopicTable";

const ListTrashTopics = () => {
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstTopics = useSelector((state) => state.topic.topics);

    const checkButtonDestroy = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() =>
                        dispatch(destroyTopics(deleteItems.toString()))
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
                        dispatch(restoreTopics(deleteItems.toString()))
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
        document.title = "Manage Topics";
        dispatch(getTrashTopics());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Chủ Đề Đã Xóa</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to="/admin/topics"
                                        className="main-btn secondary-btn btn-hover"
                                    >
                                        <i className="fas fa-clipboard-list"></i>
                                        &ensp;Danh Sách Chủ Đề
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
                {lstTopics && lstTopics.length ? (
                    <TopicTable
                        list={lstTopics}
                        setDeleteItems={setDeleteItems}
                    />
                ) : (
                    <TopicTable list={[]} setDeleteItems={setDeleteItems} />
                )}
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListTrashTopics;
