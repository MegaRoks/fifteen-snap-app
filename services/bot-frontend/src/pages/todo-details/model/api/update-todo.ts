import {TBuilder} from "../../../../store/api/consts.ts";
import {UpdateTodoResponse, UpdateTodoRequest} from "../types.ts";

export const updateTodo = (build: TBuilder) => {
    return build.mutation<UpdateTodoResponse, UpdateTodoRequest>({
        query: (params) => {
            return {
                url: `todo/${params.id}`,
                method: 'PATCH',
                body: params,
            }
        },
        invalidatesTags: () => {
            return [{type: 'Todos', id: 'LIST'}];
        },
    });
};
