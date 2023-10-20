import {exec} from "child_process";

export async function sh(cmd: string[]) {
    return new Promise(function (resolve, reject) {
         exec(cmd.join(" && "), (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}
