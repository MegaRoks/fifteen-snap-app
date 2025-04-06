export type GetTodoResponse = Todo;

export type GetTodoRequest = {
    id: string
}

export type UpdateTodoRequest = Todo;

export type UpdateTodoResponse = Todo;

export type DeleteTodoResponse = {
    id: string;
};

export type DeleteTodoRequest = {
    id: string
}

export type Todo = {
    id: string;
    title: string;
    status: StatusType;
}

export enum StatusType {
    COMPLETED = 'completed',
    CANCELLED = 'canceled',
    IN_PROCESS = 'in_process',
}
