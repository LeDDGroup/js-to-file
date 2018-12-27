import execa from "execa";
import { resolve } from "path";
import { remove, readdir, readFile } from "fs-extra";

it("should work", async () => {
  const base = "src/__fixtures";
  const templates = resolve(base, "templates");
  const outDir = resolve(base, "dist");
  await remove(outDir);
  const { stdout } = await execa("ts-node", [
    "src/cli.ts",
    "--ext",
    "html",
    "--outDir",
    outDir,
    templates
  ]);
  const files = await readdir(outDir);
  expect(files).toHaveLength(1);
  expect(files[0]).toBe("home.html");
  const content = (await readFile(resolve(outDir, files[0]))).toString();
  expect(content).toBe(`\
<h1>Hello World</h1>`);
  await remove(outDir);
});
