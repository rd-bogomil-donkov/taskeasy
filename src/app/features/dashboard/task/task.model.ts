export interface ITask {
    id: string;
    project: string;
    assignee: string;
    estimation: number;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
}