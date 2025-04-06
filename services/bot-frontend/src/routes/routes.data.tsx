import {Navigate, RouteObject} from 'react-router-dom';
import {PageLayout} from './../shared/ui/Layouts/PageLayout';
import {TodoList} from "../pages/todo-list";
import {TodoDetails} from "../pages/todo-details";
import {TodoCreate} from "../pages/todo-create";

export const routesData: RouteObject[] = [
    {
        path: '/',
        element: <PageLayout/>,
        children: [
            {
                path: '',
                element: <Navigate to="todos" replace/>,
            },
            {
                path: "/todos",
                element: <TodoList/>,
            },
            {
                path: "/todos/:todoId",
                element: <TodoDetails/>,
            },
            {
                path: "/todos/create",
                element: <TodoCreate/>,
            },
            {
                path: '*',
                element: <div>Нет страницы</div>,
            },
        ],
    },
];
