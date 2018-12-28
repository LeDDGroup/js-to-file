import { getResultFile } from "./utils";
import { resolve, basename } from "path";

describe("#getResultFile", () => {
  it("should convert index.js to index.html", () => {
    const outFile = expect(
      getResultFile(resolve("templates", "./index.js"), resolve("src"), ".html")
    ).toBe(resolve("./src/index.html"));
  });
  it("should convert index.js to index.html", () => {
    expect(getResultFile("./index.js", "src", "html")).toBe(
      resolve("./src/index.html")
    );
  });
});
