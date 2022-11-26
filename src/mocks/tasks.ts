import { Task } from '../models/task.js';

export const TASKS = [
    new Task('Hacer algo', 'Pepe'),
    new Task('Hacer otra cosa', 'Ernesto'),
    new Task('No hacer nada', 'Elvira'),
].map((item) => ({ ...item }));

export const initializeTasks = () => TASKS;
