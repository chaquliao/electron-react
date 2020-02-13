import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./FileSearch.scss";
import propTypes from "prop-types";
import useKeyPress from "../../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch, onCloseFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  let node = useRef(null);

  const closeSearch = e => {
    setInputActive(false);
    setValue("");
    onCloseFileSearch();
  };

  useEffect(() => {
    // const handleInputEvent = event => {
    //   const { keyCode } = event;
    //   if (keyCode === 13 && inputActive) {
    //     onFileSearch(value);
    //   } else if (keyCode === 27 && inputActive) {
    //     closeSearch(event);
    //   }
    // };
    // document.addEventListener("keyup", handleInputEvent);

    // return () => {
    //   document.removeEventListener("keyup", handleInputEvent);
    // };
    // 通过自定义hook改造代码
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  });

  useEffect(() => {
    if (inputActive) {
      node.current.focus();
    }
  }, [inputActive]);

  return (
    <>
      <div className="layout">
        {!inputActive && (
          <Row
            className="search-row"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col span={16}>
              <span>{title}</span>
            </Col>
            <Col span={8}>
              <FontAwesomeIcon
                onClick={() => {
                  setInputActive(true);
                }}
                title="搜索"
                icon={faSearch}
              ></FontAwesomeIcon>
            </Col>
          </Row>
        )}
        {inputActive && (
          <Row
            className="search-row"
            type="flex"
            justify="space-around"
            align="middle"
          >
            <Col span={16}>
              <Input
                value={value}
                onChange={e => {
                  setValue(e.target.value);
                }}
                ref={node}
                placeholder="搜索云文档"
              />
            </Col>
            <Col span={8}>
              <FontAwesomeIcon
                onClick={closeSearch}
                title="关闭"
                size="lg"
                icon={faTimes}
              ></FontAwesomeIcon>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

FileSearch.propTypes = {
  title: propTypes.string,
  onFileSearch: propTypes.func.isRequired
};

FileSearch.defaultProps = {
  title: "我的云文档"
};

export default FileSearch;
