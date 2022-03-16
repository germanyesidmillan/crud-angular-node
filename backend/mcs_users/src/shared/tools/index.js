const path = require("path");
const glob = require("glob");

const ImportFiles = (dirname, callBack, responseJSON = false) => {
  let response = {};
  const pathFiles = glob.sync(dirname);
  pathFiles.map((pathFile) => {
    const file = require(path.join(path.resolve("."), pathFile));
    if (responseJSON) {
      //eslint-disable-next-line
      const fileName = pathFile.replace(/^.*[\\\/]/, "").slice(0, -3);
      response[fileName] = callBack(file);
    } else {
      callBack(file);
    }
  });

  return response;
};

module.exports = {
  ImportFiles,
};
