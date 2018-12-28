import {
  basename,
  resolve,
  relative,
  dirname,
  extname,
  parse,
  format
} from "path";

export function getResultFile(file: string, dir: string, ext: string) {
  if (ext[0] !== ".") {
    ext = "." + ext;
  }
  const { name } = parse(file);
  return resolve(format({ ext, name, dir }));
}
