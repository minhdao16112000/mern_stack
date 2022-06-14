import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import FormAddVoucher from '../components/form/FormAdd/FormAddVoucher';
import ListTrashVouchers from '../layouts/Vouchers/ListTrashVouchers';
import ListVouchers from '../layouts/Vouchers/ListVouchers';

const VoucherScreen = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <ListVouchers />
                </Route>
                <Route path={`${path}/trash`}>
                    <ListTrashVouchers />
                </Route>
                <Route path={`${path}/add`}>
                    <FormAddVoucher />
                </Route>
                {/* <Route path={`${path}/:id`} component={FormEditProduct} /> */}
            </Switch>
        </div>
    );
};

export default VoucherScreen;
