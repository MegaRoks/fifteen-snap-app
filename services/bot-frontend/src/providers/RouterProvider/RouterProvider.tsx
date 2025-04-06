import {useCallback} from 'react';

import {
    RouterProvider as Provider,
    Route,
    RouteObject,
    createBrowserRouter,
} from 'react-router-dom';
import {routesData} from '../../routes/routes.data.tsx';

export const RouterProvider = () => {
    const renderRoutes = useCallback((routesData: RouteObject[]) => {
        return routesData.map(route => {
            if (route.children?.length) {
                return (
                    <Route key={route.path} path={route.path} element={route.element}>
                        {renderRoutes(route.children)}
                    </Route>
                );
            }
            return <Route key={route.path} path={route.path} element={route.element}/>;
        });
    }, []);

    return (
        <Provider router={createBrowserRouter(routesData)}/>
    );
};
