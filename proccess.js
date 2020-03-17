const fs = require("fs");
let data = {};

async function start() {
  for (let i = 250; i < 90501; i += 250) {
    console.log(`afl3-autosave${i}`);
    data[i] = await JSON.parse(fs.readFileSync(`data/epi-3-autosave${i}.json`));
    if (i == 90500) {
      await fs.writeFileSync(
        `./data/epi-3-autosave-total.json`,
        JSON.stringify(data)
      );
    }
  }
}

start();
