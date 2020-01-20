const fs = require("fs");
let data = {};

async function start() {
  for (let i = 250; i < 90501; i += 250) {
    console.log(`afl2-autosave${i}`);
    data[i] = await JSON.parse(fs.readFileSync(`data/alf2-autosave${i}.json`));
    if (i == 90500) {
      await fs.writeFileSync(
        `./data/afl2-autosave-total.json`,
        JSON.stringify(data)
      );
    }
  }
}

start();
