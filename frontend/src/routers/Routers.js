import React from 'react';
import { Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import HomeScreen from '../screens/HomeScreen';
import AdminDashboard from '../admin/screens/HomeAdmin';
import LoginScreen from '../screens/LoginScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ErrorScreen from '../screens/ErrorScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import BlogsScreen from '../screens/BlogsScreen';
import BlogDetailScreen from '../screens/BlogDetailScreen';
import ContactScreen from '../screens/ContactScreen';
import SearchScreen from '../screens/SearchScreen';
import PagesScreen from '../screens/PagesScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import InfoUserScreen from '../screens/InfoUserScreen';

// import { Protected } from '../components/Protected/Protected'

const Routers = () => {
    const requireAdmin = (to, from, next) => {
        const isLogged =
            JSON.parse(localStorage.getItem('userInfo')) !== null
                ? true
                : false;
        const isAdmin =
            JSON.parse(localStorage.getItem('userInfo')) !== null
                ? JSON.parse(localStorage.getItem('userInfo')).role === 1
                    ? true
                    : false
                : false;
        switch (to.meta.auth) {
            case 'admin': {
                if (isLogged) {
                    if (isAdmin) {
                        next();
                    } else {
                        next.redirect('/');
                    }
                } else {
                    next.redirect('/dang-nhap');
                }
                break;
            }
            case 'no-admin': {
                if (isLogged) {
                    next();
                } else {
                    next.redirect('/dang-nhap');
                }
                break;
            }
            default: {
                next();
            }
        }
    };
    return (
        <GuardProvider
            guards={[requireAdmin]}
            loading={LoadingScreen}
            error={ErrorScreen}
        >
            <Switch>
                <GuardedRoute
                    path="/admin"
                    component={AdminDashboard}
                    meta={{ auth: 'admin' }}
                ></GuardedRoute>
                <GuardedRoute
                    path="/dang-nhap"
                    component={LoginScreen}
                    meta={{ auth: 'admin' }}
                ></GuardedRoute>
                <GuardedRoute path="/dang-ky" component={RegisterScreen} />
                <GuardedRoute path="/logout" component={LogoutScreen} />
                <GuardedRoute
                    path="/forget-password"
                    component={ForgetPasswordScreen}
                />
                <GuardedRoute
                    path="/change-password/:id"
                    component={ChangePasswordScreen}
                />
                <GuardedRoute path="/lien-he" component={ContactScreen} />
                <GuardedRoute path="/tim-kiem" component={SearchScreen} />
                <GuardedRoute path="/page/:slug" component={PagesScreen} />
                <GuardedRoute
                    path="/xem-gio-hang/check-out"
                    component={CheckOutScreen}
                />
                <GuardedRoute path="/xem-gio-hang" component={CartScreen} />
                <GuardedRoute path="/order/:id" component={OrderScreen} />
                <GuardedRoute
                    path="/lich-su-mua-hang"
                    component={OrderHistoryScreen}
                    meta={{ auth: 'no-admin' }}
                />
                <GuardedRoute
                    path="/thong-tin-tai-khoan"
                    component={InfoUserScreen}
                    meta={{ auth: 'no-admin' }}
                />
                <GuardedRoute
                    path="/change-password"
                    component={ChangePasswordScreen}
                    meta={{ auth: 'no-admin' }}
                />
                <GuardedRoute
                    path="/tin-tuc/:slug"
                    component={BlogDetailScreen}
                />
                <GuardedRoute
                    path={['/tin-tuc', '/chu-de/:slug']}
                    component={BlogsScreen}
                />
                <GuardedRoute
                    path={['/product/:slug']}
                    component={ProductDetailScreen}
                />
                <GuardedRoute
                    path={[
                        '/category/:slug',
                        '/color/:slug',
                        '/size/:slug',
                        '/category/:slug/:slug',
                        '/category/:slug/:slug/:slug',
                    ]}
                    component={ProductsScreen}
                />
                <GuardedRoute exact path="/" component={HomeScreen} />
            </Switch>
        </GuardProvider>
    );
};

export default Routers;
