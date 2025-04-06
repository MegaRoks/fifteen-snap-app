export type CreateTodoRequest = {
    title: string;
};

export type CreateTodoResponse = Todo;

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
