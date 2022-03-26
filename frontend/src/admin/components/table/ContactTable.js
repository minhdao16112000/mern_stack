import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
// import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from "react-router-dom";
import "./style.scss";

const ContactTable = (props) => {
    const list = props.list;
    // const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastTodo = activePage * 5;

    const indexOfFirstTodo = indexOfLastTodo - 5;

    var currentTodos = [];
    if (list && list.length !== 0) {
        currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
        props.setDeleteItems(itemsChecked);
    }, [itemsChecked, props]);

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
                                            <h6>Tên Khách Hàng</h6>
                                        </th>
                                        <th>
                                            <h6>Email</h6>
                                        </th>
                                        <th>
                                            <h6>Vấn Đề</h6>
                                        </th>
                                        <th>
                                            <h6>Phản Hồi</h6>
                                        </th>
                                        <th>
                                            <h6>Thời Điểm Phản Hồi</h6>
                                        </th>
                                        {url === "/admin/contacts/trash" ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
                                            </th>
                                        ) : (
                                            <th>
                                                <h6>Chức Năng</h6>
                                            </th>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Vấn Đề Nào Cả
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
                                                        <p>{value.name}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.email}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.message}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.reply}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {moment(
                                                                value.repliedAt
                                                            )
                                                                .utc()
                                                                .format(
                                                                    "DD-MM-YYYY HH:ss"
                                                                )}
                                                        </p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <td>
                                                            <div className="action">
                                                                <Link
                                                                    to={`${url}/${value._id}`}
                                                                    className="text-primary"
                                                                    title="Edit"
                                                                >
                                                                    <i className="fas fa-pen-square"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    ) : (
                                                        <td className="min-width">
                                                            <p>
                                                                {moment(
                                                                    value.deletedAt
                                                                )
                                                                    .utc()
                                                                    .format(
                                                                        "DD-MM-YYYY HH:ss"
                                                                    )}
                                                            </p>
                                                        </td>
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

export default ContactTable;
