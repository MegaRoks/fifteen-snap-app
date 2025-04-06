import * as todoList from '../../pages/todo-list/model/api';
import * as todoDetails from '../../pages/todo-details/model/api';
import * as todoCreate from '../../pages/todo-create/model/api';

export const endpoints = {
    ...todoList,
    ...todoDetails,
    ...todoCreate,
};

type TEndpointDefinitions = typeof endpoints;

type TEndpointName = keyof TEndpointDefinitions;

export type TEndpoints = {
    [key in TEndpointName]: ReturnType<TEndpointDefinitions[key]>;
};
