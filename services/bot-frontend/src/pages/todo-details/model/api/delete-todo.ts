import {TBuilder} from "../../../../store/api/consts.ts";
import {DeleteTodoRequest, DeleteTodoResponse} from "../types.ts";

export const deleteTodo = (build: TBuilder) => {
    return build.mutation<DeleteTodoResponse, DeleteTodoRequest>({
        query: (params) => {
            return {
                url: `todo/${params.id}`,
                method: 'DELETE',
            }
        },
        invalidatesTags: () => {
            return [{type: 'Todos', id: 'LIST'}];
        },
    });
};