import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Dashboard } from '../view/dashboard';
// import { Setting } from '../view/setting';


/**
 * 路由定义 
 */
export const ViewRouter: FC<any> = () => <Router>
    <Routes>
        <Route
            path="/"
            element={<Layout><Dashboard /></Layout>} />
        {/* <Route
            path="/dashboard"
            element={
                <Layout>
                    <Dashboard />
                </Layout>
            } /> */}
        <Route
            path="*"
            element={
                <div>NotFound</div>
            } />
    </Routes>
</Router>;