import { exec } from 'child_process';
export async function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    });
}
//# sourceMappingURL=execute.js.map