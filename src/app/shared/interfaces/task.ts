import { ISubTask } from '../interfaces/subtask';

export interface ITask {
    task: any;
    id: number;
    title: string;
    notes: string;
    date?: Date;
    isComplete: boolean;
    subTasks: ISubTask[];
}
