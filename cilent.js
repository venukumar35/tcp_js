const net = require("net");

const port = 3000;

const host = "192.168.16.186";
let count = 0;

const thersold = 2;

const cilent = net.createConnection(port, host, () => {
  console.log("conneted to server");
  cilent.write("add,100000000000000000,10");

  // const dataInObject = {
  //   name: "ram",
  // };
  // console.log(JSON.stringify(dataInObject));
  // const buffer = Buffer.from(JSON.stringify(dataInObject));

  // cilent.write(buffer);
});

cilent.on("data", (data) => {
  console.log("received data from a server side", data.toString());

  count++;

  if (count == thersold) {
    cilent.destroy();
  }

  //
});

cilent.on("error", (err) => {
  console.log("error from connection", err.message);
});

cilent.on("close", () => {
  console.log("connection colsed");
});
