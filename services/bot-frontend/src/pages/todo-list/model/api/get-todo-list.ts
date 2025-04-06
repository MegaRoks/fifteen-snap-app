import {TBuilder} from './../../../../store/api/consts';
import {GetTodoListRequest, GetTodoListResponse} from "../types.ts";

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
// import { StatusType, Todo } from "../../interfaces/todo";
//
// interface TodoParams {
//     title?: string;
// }
//
// export const todoApi = createApi({
//     reducerPath: 'todos/api',
//     tagTypes: ['Todos'],
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://6cb2cd159e3510c5e60b10902e5a6e1f.serveo.net/api/',
//     }),
//     endpoints: (build) => ({
//         getTodoList: build.query<Todo[], TodoParams>({
//             query: (params) => ({
//                 url: 'todo/',
//                 method: "GET",
//                 params,
//             }),
//             providesTags: (result) =>
//                 result
//                     ? [...result.map(({ id }) => ({ type: 'Todos', id } as const)), { type: 'Todos', id: 'LIST' }]
//                     : [{ type: 'Todos', id: 'LIST' }],
//         }),
//         getTodoDetails: build.query<Todo, string>({
//             query: (todoId) => ({
//                 url: `todo/${todoId}`,
//                 method: "GET",
//             }),
//             providesTags: (result, error, todoId) => [{ type: 'Todos', id: todoId }],
//         }),
//         createToto: build.mutation<Todo, { title: string }>({
//             query: (data) => ({
//                 url: 'todo',
//                 method: "POST",
//                 body: data,
//             }),
//             invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
//         }),
//         deleteToto: build.mutation<Todo, string>({
//             query: (todoId) => ({
//                 url: `todo/${todoId}`,
//                 method: "DELETE",
//             }),
//             invalidatesTags: (result, error, todoId) => [{ type: 'Todos', id: todoId }],
//         }),
//         updateTotoStatus: build.mutation<Todo, { id: string, status: StatusType }>({
//             query: ({ id, status }) => ({
//                 url: `todo/${id}`,
//                 method: "PATCH",
//                 body: { status },
//             }),
//             invalidatesTags: (result, error, { id }) => [{ type: 'Todos', id }],
//         }),
//         updateTitleStatus: build.mutation<Todo, { id: string, title: string }>({
//             query: ({ id, title }) => ({
//                 url: `todo/${id}`,
//                 method: "PATCH",
//                 body: { title },
//             }),
//             invalidatesTags: (result, error, { id }) => [{ type: 'Todos', id }],
//         })
//     })
// })
//
// export const {
//     useGetTodoListQuery,
//     useGetTodoDetailsQuery,
//     useCreateTotoMutation,
//     useDeleteTotoMutation,
//     useUpdateTotoStatusMutation,
//     useUpdateTitleStatusMutation,
// } = todoApi;

export const getTodoList = (build: TBuilder) => {
    return build.query<GetTodoListResponse, GetTodoListRequest>({
        query: (params) => {
            return {
                url: '/todo',
                method: 'GET',
                params: params,
            }
        },
        providesTags: (result) => {
            return result
                ? [...result.map(({id}) => ({type: 'Todos', id})), {type: 'Todos', id: 'LIST'}]
                : [{type: 'Todos', id: 'LIST'}];
        },
    });
};
