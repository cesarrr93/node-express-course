const EventEmitter = require("events");
const emitter = new EventEmitter();

//First event example with timer
setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);
emitter.on("timer", (msg) => console.log(msg));

//Second event

const waitForEvent = () => {
  return new Promise((resolve) => {
    emitter.on("happens", (msg) => resolve(msg));
  });
};
const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event ! here it is : ", msg);
};
doWait();
emitter.emit("happens", "Hellow World!");

// Third event example - chaining events
emitter.on("ping", () => {
  console.log("Got ping!");
  emitter.emit("pong");
});

emitter.on("pong", () => {
  console.log("Got pong!");
  setTimeout(() => emitter.emit("ping"), 1000);
});

//Start the ping-pong
emitter.emit("ping");

//emit the happens event after 3 seconds
setTimeout(() => {
    emitter.emit("happens", "Hellow World!");
}, 3000);