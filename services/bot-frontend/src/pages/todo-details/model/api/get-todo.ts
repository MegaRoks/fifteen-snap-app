import {TBuilder} from "../../../../store/api/consts.ts";
import {GetTodoRequest, GetTodoResponse} from "../types.ts";

export const getTodo = (build: TBuilder) => {
    return build.query<GetTodoResponse, GetTodoRequest>({
        query: (params) => {
            return {
                url: `todo/${params.id}`,
                method: 'GET',
            }
        },
        providesTags: (_result, _error, params) => {
            return [{type: 'Todos', id: params.id}]
        },
    });
};