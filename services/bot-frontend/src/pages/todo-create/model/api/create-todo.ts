import {TBuilder} from './../../../../store/api/consts';
import {CreateTodoRequest, CreateTodoResponse} from "../types.ts";

export const createTodo = (build: TBuilder) => {
    return build.mutation<CreateTodoRequest, CreateTodoResponse>({
        query: (params) => {
            return {
                url: '/todo',
                method: 'POST',
                body: params,
            }
        },
        invalidatesTags: () => {
            return [{type: 'Todos', id: 'LIST'}];
        },
    });
};

