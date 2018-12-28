import { basename, resolve, relative, dirname } from "path";
import { promisify } from "util";
import { writeFile, ensureDir } from "fs-extra";
import globCb from "glob";

const glob = promisify(globCb);

export interface Options {
  outDir?: string;
  ext: string;
}

export async function runAndSave(file: string, outDir: string, ext: string) {
  const outFile = resolve(outDir, basename(file).replace(/\.js$/, `.${ext}`));
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
  const files = await glob(resolve(base, "**/*.js"));
  await ensureDir(outDir);
  for (const file of files) {
    const rel = relative(base, dirname(file));
    const dir = resolve(outDir, rel);
    await ensureDir(dir);
    await runAndSave(file, dir, ext);
  }
}
