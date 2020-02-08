import React, { useState, useEffect } from "react";
import { List, Row, Col, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import "./FileList.scss";
import propTypes from "prop-types";
import useKeyPress from "../../hooks/useKeyPress";

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [value, setValue] = useState("");

  const enterPressedEdit = useKeyPress(13);
  const escPressedEdit = useKeyPress(27);

  const closeEdit = e => {
    // e.preventDefault();
    setEditStatus(false);
    setValue("");
  };
  useEffect(() => {
    // const handleInputEvent = event => {
    //   const { keyCode } = event;
    //   if (keyCode === 13 && editStatus) {
    //     const editItem = files.find(item => item.id === editStatus);
    //     onSaveEdit(editItem.id, value);
    //     setEditStatus(false);
    //     setValue("");
    //   } else if (keyCode === 27 && editStatus) {
    //     closeEdit(event);
    //   }
    // };
    // document.addEventListener("keyup", handleInputEvent);

    // return () => {
    //   document.removeEventListener("keyup", handleInputEvent);
    // };
    if (enterPressedEdit && editStatus) {
      const editItem = files.find(item => item.id === editStatus);
      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      setValue("");
    }
    if (escPressedEdit && editStatus) {
      closeEdit();
    }
  });

  return (
    <>
      <List
        size="small"
        bordered
        dataSource={files}
        renderItem={item =>
          item.id !== editStatus ? (
            <>
              <List.Item>
                <Row
                  className="list-row"
                  type="flex"
                  justify="space-between"
                  align="middle"
                >
                  <Col span={4}>
                    <FontAwesomeIcon icon={faMarkdown}> </FontAwesomeIcon>{" "}
                  </Col>{" "}
                  <Col span={16}> {item.title} </Col>{" "}
                  <Col
                    span={2}
                    className="c-click"
                    onClick={() => {
                      setEditStatus(item.id);
                      setValue(item.title);
                    }}
                  >
                    <FontAwesomeIcon size="xs" icon={faEdit}>
                      {" "}
                    </FontAwesomeIcon>{" "}
                  </Col>{" "}
                  <Col
                    span={2}
                    className="c-click"
                    onClick={() => {
                      onFileDelete(item.id);
                    }}
                  >
                    <FontAwesomeIcon size="xs" icon={faTrash}>
                      {" "}
                    </FontAwesomeIcon>{" "}
                  </Col>{" "}
                </Row>{" "}
              </List.Item>{" "}
            </>
          ) : (
            <>
              <List.Item>
                <Row
                  className="list-row"
                  type="flex"
                  justify="space-between"
                  align="middle"
                >
                  <Col span={20}>
                    <Input
                      value={value}
                      onChange={e => {
                        setValue(e.target.value);
                      }}
                      // ref={node}
                      placeholder="搜索云文档"
                    />
                  </Col>{" "}
                  <Col span={2}>
                    <FontAwesomeIcon
                      onClick={closeEdit}
                      className="c-click"
                      title="关闭"
                      size="xs"
                      icon={faTimes}
                    ></FontAwesomeIcon>{" "}
                  </Col>{" "}
                </Row>{" "}
              </List.Item>{" "}
            </>
          )
        }
      />{" "}
    </>
  );
};

FileList.propTypes = {
  files: propTypes.array,
  onFileClick: propTypes.func,
  onFileDelete: propTypes.func
};

export default FileList;
