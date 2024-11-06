import { Saver } from '../../execution/saver';
import fs from 'fs';
import { randomId } from '../../utils/random';
export class SaveBase64ImgOnDisk extends Saver {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        fs.mkdirSync(prefix, { recursive: true });
    }
    async saveRaw(value) {
        const path = `${this.prefix}/${randomId()}.png`;
        const buffer = Buffer.from(value.base64, 'base64');
        await fs.promises.writeFile(path, buffer);
        const absolutePath = 'file://' + fs.realpathSync(path);
        return { accessUrl: absolutePath };
    }
}
//# sourceMappingURL=save-b64-on-disk.js.map