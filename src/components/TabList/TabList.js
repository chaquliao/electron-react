import React from "react";
import PropTypes from "prop-types";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./TabList.scss";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const TabList = ({
  files,
  activeId,
  unsaveIds,
  onTabClick,
  onCloseTab,
  onFileChange
}) => {
  return (
    <>
      {!files.length ? (
        <div className="start-page">选择或创建新的 MarkDown 文档</div>
      ) : (
        <Tabs
          onChange={onTabClick}
          type="editable-card"
          activeKey={activeId}
          onEdit={onCloseTab}
        >
          {files.map(file => {
            return (
              <TabPane tab={file.title} key={file.id}>
                <SimpleMDE
                  key={file.id}
                  value={file.body}
                  onChange={(value) => onFileChange(file.id, value)}
                  options={{ minHeight: "500px" }}
                />
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </>
  );
};

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
};

TabList.defaultProps = {
  unsaveIds: []
};

export default TabList;
