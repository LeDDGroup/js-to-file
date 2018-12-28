import { basename, resolve, relative, dirname, extname } from "path";
import { promisify } from "util";
import { writeFile, ensureDir } from "fs-extra";
import globCb from "glob";
import { getResultFile } from "./utils";

const glob = promisify(globCb);

export interface Options {
  outDir?: string;
  require?: string;
  ext: string;
}

export async function runAndSave(file: string, outDir: string, ext: string) {
  const outFile = getResultFile(file, outDir, ext);
  const content = require(file);
  const func = typeof content === "function" ? content : content.default;
  // TODO check func is a function
  const result = func();
  // TODO check result is a string
  await writeFile(outFile, result);
}

export async function jsToFile(base: string, options: Options) {
  const { ext } = options;
  const outDir = options.outDir || base;
  if (options.require) {
    require(options.require);
  }
  const files = await glob(resolve(base, "**/*"));
  await ensureDir(outDir);
  for (const file of files) {
    const rel = relative(base, dirname(file));
    const dir = resolve(outDir, rel);
    await ensureDir(dir);
    await runAndSave(file, dir, ext);
  }
}
