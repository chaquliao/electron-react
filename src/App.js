import React, { useState } from "react";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";
import { fileHelper } from "./utils/fileHelper";
import FileSearch from "./components/FileSearch/FileSearch";
import FileList from "./components/FileList/FileList";
import defaultFiles from "./utils/defaultFiles";
import BottomBtn from "./components/BottomBtn/BottomBtn";
import TabList from "./components/TabList/TabList";

import "./App.css";
const uuidv4 = require("uuid/v4");

// require node.js modules
const { join } = window.require("path");
const { remote } = window.require("electron");
const Store = window.require("electron-store");
const store = new Store({ name: "Files Data" });

const saveFilesToStore = files => {
  // 不需要把所有的状态信息存到store里面
  store.set("files", files);
};
function App() {
  const [files, setFiles] = useState(store.get("files") || []);
  const [activeFileID, setActiveFileID] = useState("0");
  const [opendFileIDs, setOpendFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const writePath = remote.app.getPath("documents");

  const opendFiles = opendFileIDs.map(openID => {
    return files.find(file => file.id === openID);
  });

  const fileClick = id => {
    setActiveFileID(id);
    !opendFileIDs.includes(id) && setOpendFileIDs([...opendFileIDs, id]);
  };

  const tabClick = key => {
    setActiveFileID(key);
  };

  const closeTab = id => {
    const tabsWithout = opendFileIDs.filter(fileID => {
      return fileID !== id;
    });
    setOpendFileIDs(tabsWithout);
    tabsWithout.length > 0
      ? setActiveFileID(tabsWithout[0])
      : setActiveFileID("");
  };

  const onFileChange = (id, value) => {
    let fileTitle;
    const newFiles = files.map(file => {
      if (file.id === id) {
        fileTitle = file.title;
        file.body = value;
      }
      return file;
    });
    setFiles(newFiles);
    !unsavedFileIDs.includes(id) && setUnsavedFileIDs([...unsavedFileIDs, id]);
    fileHelper.writeFile(join(writePath, `${fileTitle}.md`), value);
  };

  const fileDelete = id => {
    const newFiles = files.filter(file => {
      return file.id !== id;
    });
    setFiles(newFiles);
    if (opendFileIDs.includes(id)) {
      closeTab(id);
    }
    let deleteFile = files.filter(file => {
      return file.id === id;
    })[0];
    fileHelper.deleteFile(join(writePath, `${deleteFile.title}.md`));
    saveFilesToStore(newFiles);
  };

  const updateFileName = (id, title, isNew) => {
    const newPath = join(writePath, `${title}.md`);
    let editFile = files.filter(file => {
      return file.id === id;
    })[0];
    const oldTitle = editFile.title;

    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = title;
        file.path = newPath;
        if (file.isNew) {
          file.isNew = false;
        }
      }
      return file;
    });
    if (isNew) {
      fileHelper.writeFile(newPath, editFile.body);
      setFiles(newFiles);
    } else {
      fileHelper.renameFile(join(writePath, `${oldTitle}.md`), newPath);
      setFiles(newFiles);
    }
    saveFilesToStore(newFiles);
  };

  const fileSearch = keywords => {
    const newSearchedFiles = files.filter(file => {
      return file.title.includes(keywords);
    });
    setSearchedFiles(newSearchedFiles);
  };

  const closeFileSearch = () => {
    fileSearch("");
  };

  const createNewFile = () => {
    const newFiles = [
      ...files,
      {
        id: uuidv4(),
        title: "",
        body: "## 请输入文档",
        createdAt: new Date().getTime(),
        isNew: true
      }
    ];
    setFiles(newFiles);
  };

  const importFiles = () => {
    console.log(remote.dialog)
    remote.dialog.showOpenDialog({
      title: "选择导入的MarkDown文件",
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Markdown Files", extensions: ["md"] }]
    }).then(result => {
      console.log(result.filePaths)
    });
  };

  const fileListArr = searchedFiles.length > 0 ? searchedFiles : files;
  return (
    <div className="App">
      <Row>
        <Col span={6} className="left-panel">
          <FileSearch
            title="我的云文档"
            onFileSearch={fileSearch}
            onCloseFileSearch={closeFileSearch}
          />
          <FileList
            files={fileListArr}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={updateFileName}
          />
          <Row className="button-group">
            <Col span={12} onClick={createNewFile}>
              <BottomBtn text="新建" type="primary" icon={faPlus} />
            </Col>
            <Col span={12} onClick={importFiles}>
              <BottomBtn
                text="导入"
                type=""
                icon={faFileImport}
              />
            </Col>
          </Row>
        </Col>
        <Col span={18} className="right-panel">
          <TabList
            files={opendFiles}
            activeId={activeFileID}
            unsaveIds={unsavedFileIDs}
            onTabClick={tabClick}
            onCloseTab={closeTab}
            onFileChange={onFileChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
