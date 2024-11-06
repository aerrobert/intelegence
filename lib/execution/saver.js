export class Saver {
    async save(name, data, execution) {
        execution.tasks.logTask(execution.rootTask, `Saving ${name}`);
        return this.saveRaw(data);
    }
    saveRaw(_) {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=saver.js.map