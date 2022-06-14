import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    listTrashVoucher,
    listVoucher,
} from '../../../redux/actions/voucherActions';
import {
    VOUCHER_DELETE_RESET,
    VOUCHER_DESTROY_RESET,
    VOUCHER_RESTORE_RESET,
} from '../../../constants/voucherConstant';
import './style.scss';

const VoucherTable = (props) => {
    const list = props.list;
    const dispatch = useDispatch();
    let { url } = useRouteMatch();
    const [itemsChecked, setItemsChecked] = useState([]);
    const [activePage, setCurrentPage] = useState(1);
    const handelVoucher = useSelector((state) => state.voucher);

    const {
        error: errorReviewCreate,
        trash: pushVoucherToTrash,
        delete: deleteVoucher,
        restore: restoreVoucher,
    } = handelVoucher;

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
        if (errorReviewCreate.length !== 0) {
            toast.error(errorReviewCreate);
        }

        if (pushVoucherToTrash && pushVoucherToTrash === true) {
            var inputs = document.querySelectorAll('#checkbox-1');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            setItemsChecked([]);
            dispatch(listVoucher());
            dispatch({ type: VOUCHER_DELETE_RESET });
        }

        if (deleteVoucher && deleteVoucher === true) {
            var inputsTrash = document.querySelectorAll('#checkbox-1');
            for (var j = 0; j < inputsTrash.length; j++) {
                inputsTrash[j].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashVoucher());
            dispatch({ type: VOUCHER_DESTROY_RESET });
        }

        if (restoreVoucher && restoreVoucher === true) {
            var inputTrash = document.querySelectorAll('#checkbox-1');
            for (var k = 0; k < inputTrash.length; k++) {
                inputTrash[k].checked = false;
            }
            setItemsChecked([]);
            dispatch(listTrashVoucher());
            dispatch({ type: VOUCHER_RESTORE_RESET });
        }
        props.setDeleteItems(itemsChecked);
    }, [
        deleteVoucher,
        dispatch,
        errorReviewCreate,
        itemsChecked,
        props,
        pushVoucherToTrash,
        restoreVoucher,
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
                                            <h6>Tiêu Đề</h6>
                                        </th>
                                        <th>
                                            <h6>Ký Tự Nhận Biết</h6>
                                        </th>
                                        <th>
                                            <h6>Số Lượng</h6>
                                        </th>
                                        <th>
                                            <h6>Mã Giảm Giá</h6>
                                        </th>
                                        <th>
                                            <h6>Giá Trị Giảm</h6>
                                        </th>
                                        <th>
                                            <h6>Mã Đã Sử Dụng</h6>
                                        </th>
                                        <th>
                                            <h6>Số Tiền Tối Thiểu</h6>
                                        </th>
                                        {url === '/admin/vouchers/trash' ? (
                                            <th>
                                                <h6>Thời Điểm Xóa</h6>
                                            </th>
                                        ) : (
                                            <>
                                                <th>
                                                    <h6>Ngày Hết Hạn</h6>
                                                </th>
                                                <th>
                                                    <h6>Ngày Tạo</h6>
                                                </th>
                                                {/* <th>
                                                    <h6>Chức Năng</h6>
                                                </th> */}
                                            </>
                                        )}
                                    </tr>
                                    {/*-- end table row--*/}
                                </thead>
                                {currentTodos.length === 0 ? (
                                    <p className="text-center">
                                        Không Có Mã Giảm Giá Nào Nào Hết !
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
                                                        <p>{value.title}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p
                                                            style={{
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {value.idCharacter}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>{value.quantity}</p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.code
                                                                .length !== 0
                                                                ? value.code
                                                                      .join(
                                                                          ', '
                                                                      )
                                                                      .substring(
                                                                          0,
                                                                          40
                                                                      ) + '...'
                                                                : ''}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        {value.type === 0 ? (
                                                            <p>
                                                                {value.discount +
                                                                    '%'}
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                {formatVND(
                                                                    value.discount
                                                                )}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {value.used
                                                                .length !== 0
                                                                ? value.used
                                                                      .join(
                                                                          ', '
                                                                      )
                                                                      .substring(
                                                                          0,
                                                                          40
                                                                      ) + '...'
                                                                : ''}
                                                        </p>
                                                    </td>
                                                    <td className="min-width">
                                                        <p>
                                                            {formatVND(
                                                                value.min
                                                            )}
                                                        </p>
                                                    </td>
                                                    {value.deleted === false ? (
                                                        <>
                                                            <td className="min-width">
                                                                <p>
                                                                    {new Date(
                                                                        value.expire
                                                                    ).toLocaleDateString(
                                                                        'en-CA'
                                                                    )}
                                                                </p>
                                                            </td>
                                                            <td className="min-width">
                                                                <p>
                                                                    {new Date(
                                                                        value.createdAt
                                                                    ).toLocaleDateString(
                                                                        'en-CA'
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
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="min-width">
                                                                <p>
                                                                    {new Date(
                                                                        value.deletedAt
                                                                    ).toLocaleDateString(
                                                                        'en-CA'
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

export default VoucherTable;
