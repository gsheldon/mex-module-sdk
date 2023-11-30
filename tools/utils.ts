import {exec, spawn} from "child_process";

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

export async function shWithLogs(cmd: string[]) {
    return new Promise((resolve, reject) => {
        const child = spawn('/bin/bash', ['-c', cmd.join(" && ")], {
            detached: true,
            stdio: 'pipe'
        })

        child.stderr.setEncoding('utf8')
        child.stdout.setEncoding('utf8')

        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)

        child.on('error', reject)
        child.on('exit', exitCode => {
            if (exitCode === 0) {
                resolve(null);
            } else {
                reject("Exit with code" + exitCode)
            }
        })

        return child
    })
}
