import {TBuilder} from './../../../../store/api/consts';
import {GetTodoListRequest, GetTodoListResponse} from "../types.ts";

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
