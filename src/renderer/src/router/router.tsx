import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Dashboard4g } from '../view/dashboard4g';
import { Dashboard2g } from '../view/dashboard2g';
import { Log } from '../view/log';
// import { Setting } from '../view/setting';


/**
 * 路由定义 
 */
export const ViewRouter: FC<any> = () => <Router>
    <Routes>
        <Route
            path="/"
            element={<Layout><Dashboard4g /></Layout>} />
        <Route
            path="/2g"
            element={<Layout><Dashboard2g /></Layout>} />
        <Route
            path="/log"
            element={<Layout><Log /></Layout>} />
        <Route
            path="*"
            element={
                <div>NotFound</div>
            } />
    </Routes>
</Router>;