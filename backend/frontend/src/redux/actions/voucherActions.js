import { toast } from 'react-toastify';
import api from '../../api';
import {
    VOUCHER_DELETE_FAIL,
    VOUCHER_DELETE_REQUEST,
    VOUCHER_DELETE_SUCCESS,
    VOUCHER_DESTROY_FAIL,
    VOUCHER_DESTROY_REQUEST,
    VOUCHER_DESTROY_SUCCESS,
    VOUCHER_DETAILS_FAIL,
    VOUCHER_DETAILS_REQUEST,
    VOUCHER_DETAILS_SUCCESS,
    VOUCHER_LIST_FAIL,
    VOUCHER_LIST_REQUEST,
    VOUCHER_LIST_SUCCESS,
    VOUCHER_LIST_TRASH_FAIL,
    VOUCHER_LIST_TRASH_REQUEST,
    VOUCHER_LIST_TRASH_SUCCESS,
    VOUCHER_RESTORE_FAIL,
    VOUCHER_RESTORE_REQUEST,
    VOUCHER_RESTORE_SUCCESS,
} from '../../constants/voucherConstant';

export const createVoucher = (voucher) => async (dispatch) => {
    var token = JSON.parse(localStorage.getItem('userInfo')).token;
    try {
        const { data } = await api.post('/api/voucher', voucher, {
            headers: { Authorization: `jwt ${token}` },
        });
        if (data.voucher) {
            toast.success('Thêm mã giảm giá thành công');
            document.location.href = '/admin/vouchers';
        } else {
            toast.error(data.message);
        }
    } catch (e) {
        console.log(e);
    }
};

export const createVoucherAndContinue = (voucher) => async (dispatch) => {
    var token = JSON.parse(localStorage.getItem('userInfo')).token;
    try {
        const { data } = await api.post('api/voucher', voucher, {
            headers: { Authorization: `jwt ${token}` },
        });
        if (data.voucher) {
            toast.success('Thêm mã giảm giá thành công !');
        } else {
            toast.error(data.message);
        }
    } catch (e) {
        console.log(e);
    }
};

export const listVoucher = () => async (dispatch) => {
    dispatch({ type: VOUCHER_LIST_REQUEST });
    var token = JSON.parse(localStorage.getItem('userInfo')).token;
    try {
        const { data } = await api.get(`/api/voucher/`, {
            headers: { Authorization: `jwt ${token}` },
        });
        dispatch({ type: VOUCHER_LIST_SUCCESS, payload: data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: VOUCHER_LIST_FAIL, payload: message });
    }
};

export const listTrashVoucher = () => async (dispatch) => {
    dispatch({ type: VOUCHER_LIST_TRASH_REQUEST });
    var token = JSON.parse(localStorage.getItem('userInfo')).token;
    try {
        const res = await api.get('api/voucher/trash', {
            headers: { Authorization: `jwt ${token}` },
        });
        dispatch({ type: VOUCHER_LIST_TRASH_SUCCESS, payload: res.data });
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: VOUCHER_LIST_TRASH_FAIL, payload: message });
    }
};

export const detailsVoucher = (code) => async (dispatch) => {
    dispatch({ type: VOUCHER_DETAILS_REQUEST, payload: code });
    try {
        const { data } = await api.get(`/api/voucher/${code}`);
        if (data.voucher) {
            dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data });
        } else {
            dispatch({ type: VOUCHER_DETAILS_FAIL, payload: data.message });
        }
    } catch (e) {
        const message =
            e.response && e.response.data.message
                ? e.response.data.message
                : e.message;
        dispatch({ type: VOUCHER_DETAILS_FAIL, payload: message });
    }
};

export const deleteVouchers = (data) => async (dispatch) => {
    dispatch({ type: VOUCHER_DELETE_REQUEST });
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/voucher/', {
            data: ids,
        });
        if (isDeleted) {
            toast.success('Mã giảm giá đã được đưa vào thùng rác !');
            dispatch({
                type: VOUCHER_DELETE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VOUCHER_DELETE_FAIL, payload: message });
    }
};

export const destroyVouchers = (data) => async (dispatch) => {
    dispatch({ type: VOUCHER_DESTROY_REQUEST });
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/voucher/force', { data: ids });
        if (isDestroy) {
            toast.success('Mã giảm giá đã được xóa hoàn toàn !');
            dispatch({
                type: VOUCHER_DESTROY_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VOUCHER_DESTROY_FAIL, payload: message });
    }
};

export const restoreVouchers = (data) => async (dispatch) => {
    dispatch({ type: VOUCHER_RESTORE_REQUEST });
    var token = JSON.parse(localStorage.getItem('userInfo')).token;
    try {
        const ids = { id: data };

        const isRestore = await api.patch(
            'api/voucher/restore',
            {
                data: ids.id.split(','),
            },
            {
                headers: { Authorization: `jwt ${token}` },
            }
        );
        if (isRestore) {
            toast.success('Mã giảm giá đã được phục hồi !');
            dispatch({
                type: VOUCHER_RESTORE_SUCCESS,
            });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: VOUCHER_RESTORE_FAIL, payload: message });
    }
};

// export const detailsVoucher = (voucherId) => async (dispatch) => {
//     dispatch({ type: VOUCHER_DETAILS_REQUEST, payload: voucherId });
//     try {
//         const { data } = await api.get(`/api/voucher/${voucherId}`);
//         dispatch({ type: VOUCHER_DETAILS_SUCCESS, payload: data });
//     } catch (e) {
//         const message =
//             e.response && e.response.data.message
//                 ? e.response.data.message
//                 : e.message;
//         dispatch({ type: VOUCHER_DETAILS_FAIL, payload: message });
//     }
// };

// export const payVoucher = (voucher, paymentResult) => async (dispatch) => {
//     dispatch({ type: VOUCHER_PAY_REQUEST, payload: { voucher, paymentResult } });
//     try {
//         // await api.patch('/api/product/decrease-qty', voucher);
//         const { data } = await api.put(
//             `/api/voucher/${voucher._id}/pay`,
//             paymentResult
//         );
//         await api.post('/api/voucher/send-email', data);
//         dispatch({ type: VOUCHER_PAY_SUCCESS, payload: data });
//     } catch (e) {
//         const message =
//             e.response && e.response.data.message
//                 ? e.response.data.message
//                 : e.message;
//         dispatch({ type: VOUCHER_PAY_FAIL, payload: message });
//     }
// };

// export const deliveredVoucher = (voucher) => async (dispatch) => {
//     dispatch({ type: VOUCHER_DELIVERED_REQUEST, payload: { voucher } });
//     try {
//         const { data } = await api.put(
//             `/api/voucher/${voucher.id}/delivered`,
//             voucher
//         );
//         dispatch({ type: VOUCHER_DELIVERED_SUCCESS, payload: data });
//     } catch (e) {
//         const message =
//             e.response && e.response.data.message
//                 ? e.response.data.message
//                 : e.message;
//         dispatch({ type: VOUCHER_DELIVERED_FAIL, payload: message });
//     }
// };

// export const statusVoucher = (voucher) => async (dispatch) => {
//     dispatch({ type: VOUCHER_STATUS_REQUEST, payload: { voucher } });
//     try {
//         const { data } = await api.patch(
//             `/api/voucher/${voucher.id}/status`,
//             voucher
//         );
//         dispatch({ type: VOUCHER_STATUS_SUCCESS, payload: data });
//     } catch (e) {
//         const message =
//             e.response && e.response.data.message
//                 ? e.response.data.message
//                 : e.message;
//         dispatch({ type: VOUCHER_STATUS_FAIL, payload: message });
//     }
// };

// export const listvoucherMine = () => async (dispatch) => {
//     dispatch({ type: VOUCHER_MINE_LIST_REQUEST });
//     const user = JSON.parse(localStorage.getItem('userInfo'))._id;
//     try {
//         const { data } = await api.get(`/api/voucher/${user}/mine`);
//         dispatch({ type: VOUCHER_MINE_LIST_SUCCESS, payload: data });
//     } catch (e) {
//         const message =
//             e.response && e.response.data.message
//                 ? e.response.data.message
//                 : e.message;
//         dispatch({ type: VOUCHER_MINE_LIST_FAIL, payload: message });
//     }
// };
