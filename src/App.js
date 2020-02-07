import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "antd";

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={6}> col - 12 </Col> <Col span={18}> col - 12 </Col>
      </Row>
    </div>
  );
}

export default App;
