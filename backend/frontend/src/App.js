import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Routers from './routers/Routers';
import { ScrollToTop } from './components/Scroll/ScrollToTop';

function App() {
    const notify = () =>
        toast.success(JSON.parse(localStorage.getItem('message-user')).message);
    const clearMess = () => {
        localStorage.removeItem('message-user');
    };
    useEffect(() => {
        if (localStorage.getItem('message-user')) {
            notify();
            setTimeout(clearMess, 5000);
        } else {
            clearTimeout(clearMess);
        }
    }, []);
    return (
        <BrowserRouter>
            <div className="App">
                <ToastContainer />
                <Route
                    path={[
                        '/',
                        '/dang-nhap',
                        '/dang-ky',
                        '/category/:slug1',
                        '/category/:slug1/:slug2',
                        '/category/:slug1/:slug2/:slug3',
                        '/product/:slug',
                        '/color/:slug1',
                        '/size/:slug1',
                        '/xem-gio-hang',
                        '/xem-gio-hang/check-out',
                        '/order/:id',
                        '/lich-su-mua-hang',
                        '/tin-tuc',
                        '/chu-de/:slug',
                        '/tin-tuc/:slug',
                        '/lien-he',
                        '/tim-kiem',
                        '/page/:slug',
                        '/thong-tin-tai-khoan',
                        '/danh-muc-ua-thich',
                    ]}
                    exact
                    component={Header}
                />

                <Routers />
                <Route
                    path={[
                        '/',
                        '/dang-nhap',
                        '/dang-ky',
                        '/category/:slug1',
                        '/category/:slug1/:slug2',
                        '/category/:slug1/:slug2/:slug3',
                        '/product/:slug',
                        '/color/:slug1',
                        '/size/:slug1',
                        '/xem-gio-hang',
                        '/xem-gio-hang/check-out',
                        '/order/:id',
                        '/lich-su-mua-hang',
                        '/tin-tuc',
                        '/chu-de/:slug',
                        '/tin-tuc/:slug',
                        '/lien-he',
                        '/tim-kiem',
                        '/page/:slug',
                        '/thong-tin-tai-khoan',
                        '/danh-muc-ua-thich',
                    ]}
                    exact
                    component={Footer}
                />
            </div>
            <ScrollToTop />
        </BrowserRouter>
    );
}

export default App;
