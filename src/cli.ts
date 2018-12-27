import meow from "meow";
import { jsToFile } from "./index";

async function main() {
  const cli = meow(
    `\
Usage
  $ js2file [folder]

Options
  --outDir where to output files to, defaults to [folder]
  --ext    resulting extension, required


Examples
  $ js2file templates/ --outDir dist --ext html
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
