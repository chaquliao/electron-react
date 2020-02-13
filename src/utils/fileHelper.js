const fsPromises = window.require("fs").promises;
const path = window.require("path");

export const fileHelper = {
  readFile: path => {
    return fsPromises.readFile(path, "utf8");
  },

  writeFile: (path, content) => {
    return fsPromises.writeFile(path, content, "utf8");
  },

  renameFile: (oldPath, newPath) => {
    return fsPromises.rename(oldPath, newPath);
  },

  deleteFile: path => {
    return fsPromises.unlink(path);
  }
};


// const testPath = path.join(__dirname, "defaultFiles.js");
// const testWritePath = path.join(__dirname, "hello.md");
// const renamePath = path.join(__dirname, "helloChange.md");
// fileHelper.readFile(testPath).then(data => {
//     console.log(data)
// })
// fileHelper.writeFile(testWritePath, '## hello world').then(() => {
//     console.log('写入成功了')
// })
// fileHelper.rename(testWritePath, renamePath).then(
//   () => {
//     console.log("改名成功");
//   }
// );
//fileHelper.deleteFile(renamePath)
