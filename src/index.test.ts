import execa from "execa";
import { resolve } from "path";
import { remove, readdir, readFile } from "fs-extra";

async function checkFile(file: string, expected: string) {
  const content = (await readFile(file)).toString();
  expect(content).toBe(expected);
}

describe("cli", () => {
  it("should work", async () => {
    const base = "src/__fixtures";
    const templates = resolve(base, "templates");
    const outDir = resolve(base, "dist");
    await remove(outDir);
    await execa("ts-node", [
      "src/cli.ts",
      "--ext",
      "html",
      "--outDir",
      outDir,
      templates
    ]);
    const files = await readdir(outDir);
    expect(files).toHaveLength(2);
    await checkFile(
      resolve(outDir, "home.html"),
      `\
<h1>Hello World</h1>`
    );
    await checkFile(resolve(outDir, "export-equal.html"), "hello");
    await remove(outDir);
  });

  it("should work with typescript", async () => {
    const base = "src/__fixtures";
    const templates = resolve(base, "ts");
    const outDir = resolve(base, "dist");
    await remove(outDir);
    const { stdout } = await execa("ts-node", [
      "src/cli.ts",
      "--ext",
      "html",
      "--require",
      "ts-node/register",
      "--outDir",
      outDir,
      templates
    ]);
    const files = await readdir(outDir);
    expect(files).toHaveLength(1);
    await checkFile(
      resolve(outDir, "index.html"),
      `\
<h1>Hello World</h1>`
    );
    await remove(outDir);
  });
});
