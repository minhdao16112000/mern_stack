import { combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import user from './userReducer';
import product from './productReducer';
import category from './categoryReducer';
import cart from './cartReducer';
import order from './orderReducer';
import topic from './topicReducer';
import post from './postReducer';
import image from './imageReducer';
import contact from './contactReducer';
import page from './pageReducer';
import voucher from './voucherReducer';

const rootReducer = combineReducers({
    user,
    product,
    category,
    cart,
    order,
    topic,
    post,
    image,
    contact,
    page,
    voucher,
});

export default rootReducer;
