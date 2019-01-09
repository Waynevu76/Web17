const fs = require("fs");
function readFile(filePatch, onReadFileDone) {
    fs.readFile(filePatch,
    { encoding: "utf-8"},
    (err, data) => {
        if (err) console.log(err);
        else {
            console.log("File data: ", data);
            onReadFileDone(data);
    }}
    )
    console.log("File data ouside: ", fileData);
}

function writeFile(filePatch, fileData) { 
    fs.writeFileSync(
        filePatch,
        fileData,
        { encoding = "utf-8"}
    );
}
module.exports = {
    readFile,
    writeFile
}