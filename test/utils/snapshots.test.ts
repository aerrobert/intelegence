import fs from 'fs';
import path from 'path';

export function expectSnapshot(id: string, value: string) {
    const snapshotPath = path.join('./snapshots', `${id}.snap`);
    fs.writeFileSync(snapshotPath, value);
}
