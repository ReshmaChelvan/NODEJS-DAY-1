let Import = require("express");
let fs = require("fs");
let path = require("path");

//Create New Application Of Express
let NewServer = Import();

//New PORT
let PORT = 3000;

//Creating a New Folder if Not Create a New One
let NewFolder = "./newFolder";

//Checking File Exist Or Not if No Create a NewFile Using mkdirSync(MakeDirectorySync)
if (!fs.existsSync(NewFolder)) {
  fs.mkdirSync(NewFolder);
}

NewServer.get("/", (response, request) => {
  const Data = new Date();
  const Year = Data.getFullYear().toString();
  const Month = (Data.getMonth() + 1).toString();
  const Hour = Data.getHours().toString();
  const Minute = Data.getMinutes().toString();
  const Second = Data.getSeconds().toString();

  let CreateData = `${Year}-${Month}-${Hour}-${Minute}-${Second}.txt`;
  let CreateFile = path.join(NewFolder, CreateData);

  fs.writeFile(CreateFile, Data.toISOString(), (err) => {
    if (err) {
      request.status(500).send(`Error Occured ${err}`);
      return;
    } else {
      request.send(`File Created Successfully Created At ${CreateFile}`);
    }
  });
});

NewServer.get("/GetFolder", (request, response) => {
  fs.readdir(NewFolder, (err, files) => {
    if (err) {
      response.status(500).send(`Error Read File ${err}`);
      return;
    }
    const TextFiles = files.filter((file) => path.extname(file) === ".txt");
    response.json(TextFiles);
  });
});

//Creating Listen
NewServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
