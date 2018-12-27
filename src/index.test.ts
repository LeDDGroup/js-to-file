import { greet } from "./index";

it("should greet world", () => {
  expect(greet("World")).toBe("Hello World!");
});
