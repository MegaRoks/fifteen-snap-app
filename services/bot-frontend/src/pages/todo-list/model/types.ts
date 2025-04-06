export type GetTodoListResponse = Todo[];

export type GetTodoListRequest = {
    title: string;
};


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
