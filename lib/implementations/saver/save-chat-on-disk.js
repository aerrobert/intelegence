import { Saver } from '../../execution/saver';
import fs from 'fs';
import { randomId } from '../../utils/random';
export class SaveExecutionDataOnDisk extends Saver {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        fs.mkdirSync(prefix, { recursive: true });
    }
    async saveRaw(value) {
        const data = JSON.stringify(value, null, 2);
        const path = `${this.prefix}/${value.id || randomId()}.json`;
        await fs.promises.writeFile(path, data);
        const absolutePath = 'file://' + fs.realpathSync(path);
        return { accessUrl: absolutePath };
    }
}
//# sourceMappingURL=save-chat-on-disk.js.map