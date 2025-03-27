const { createReadStream } = require("fs");

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream("./content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (chunk) => {
  counter++;
  console.log(`Chunk ${counter} recieved:`, chunk.length, "characters");
});

stream.on("end", () => {
  console.log(`Total ${counter} chunks received`);
});

stream.on("error", (err) => console.log("Error reading file:", err));
