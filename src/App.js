import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";

import FileSearch from "./components/FileSearch/FileSearch";
import FileList from "./components/FileList/FileList";
import defaultFiles from "./utils/defaultFiles";
import BottomBtn from "./components/BottomBtn/BottomBtn";

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={6}>
          <FileSearch
            title="我的云文档"
            onFileSearch={value => {
              console.log(value);
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={id => {
              console.log(id);
            }}
            onFileDelete={id => {
              console.log(id);
            }}
            onSaveEdit={(id, value) => {
              console.log(id, value);
            }}
          />
          <Row>
            <Col span={12}>
              <BottomBtn text="新建" type="primary" icon={faPlus} />
            </Col>
            <Col span={12}>
              <BottomBtn text="新建" type="" icon={faFileImport} />
            </Col>
          </Row>
        </Col>
        <Col span={18}> col - 12 </Col>
      </Row>
    </div>
  );
}

export default App;
