import meow from "meow";
import { jsToFile } from "./index";

async function main() {
  const cli = meow(
    `\
Usage
  $ js2file [folder]

Options
  --outDir  where to output files to, defaults to [folder]
  --ext     resulting extension, required
  --require require file before execution

Examples
  $ js2file templates/ --outDir dist --ext html
  typescript
  $ js2file templates/ --outDir dist --ext html --require ts-node/register
  ttypescript
  $ TS_NODE_COMPILER=ttsc js2file templates/ --outDir dist --ext html --require ts-node/register
`
  );
  if (cli.input.length !== 1) {
    console.log("There should be one input file");
    cli.showHelp();
    process.exit(1);
    return;
  }
  if (cli.flags.ext === undefined) {
    console.log("Must specify extension");
    cli.showHelp();
    process.exit(1);
    return;
  }
  await jsToFile(cli.input[0], cli.flags as any);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
