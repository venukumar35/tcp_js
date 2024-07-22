const net = require("net");

const port = 3000;

const server = net.createServer((socket) => {
  console.log("connect bulid successfully");

  socket.on("data", (data) => {
    const strData = data.toString();

    console.log(
      "recived data from cilent",
      data[0],
      data,
      data.toString("hex")
    );

    const command = strData.split(",");

    const operationCommand = command[0];

    console.log(command[0]);

    const arr1 = parseInt(command[1], 10);
    const arr2 = parseInt(command[2], 10);

    let result;
    switch (operationCommand) {
      case "add":
        result = arr1 + arr2;
        break;

      case "sub":
        result = arr1 - arr2;
        break;

      default:
        break;
    }
    console.log(result);
    const buffer = Buffer.from(result.toString());

    socket.write(result.toString());
    console.log("next line ");
    socket.write(buffer);
  });

  socket.on("end", () => {
    console.log("connection colsed");
  });

  socket.on("error", (err) => {
    console.log("socket error", err.message);
  });
});

server.on("error", (err) => {
  console.log("server error ", err.message);
});
server.listen(port, () => {
  console.log(`server is listing in the port :${port}`);
});
