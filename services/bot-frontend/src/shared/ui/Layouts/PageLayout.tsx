import {Outlet} from 'react-router-dom';
import {Layout} from "antd";

export function PageLayout() {
    return (
        <Layout style={{width: '100vw', height: '100vh'}}>
            <Outlet/>
        </Layout>
    );
}
