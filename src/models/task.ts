// Se puede usar type, interface o class

type TaskType = {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
};

export class Task implements TaskType {
    static generateId() {
        // return generateKey('hma')
        return String(~~(Math.random() * 1_000_000).toPrecision(6));
    }
    id: string;
    isCompleted: boolean;
    constructor(public title: string, public responsible: string) {
        this.id = Task.generateId();
        this.isCompleted = false;
    }
}
