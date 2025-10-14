// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import childProcess from "node:child_process";

/**
 * Easy to mock childProcess utils.
 * @internal
 */
export const processUtils = {
  /**
   * Promisifying childProcess.execFile
   * @internal
   */
  execFile(
    file: string,
    params: string[],
    options?: childProcess.ExecFileOptionsWithStringEncoding,
  ): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
      childProcess.execFile(file, params, options, (error, stdout, stderr) => {
        if (Buffer.isBuffer(stdout)) {
          stdout = stdout.toString("utf8");
        }
        if (Buffer.isBuffer(stderr)) {
          stderr = stderr.toString("utf8");
        }
        // Many CLI tools write diagnostic info to stderr even on success.
        // Only reject when the process reports an execution error.
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  },
};
