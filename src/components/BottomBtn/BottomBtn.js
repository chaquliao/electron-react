import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './BottomBtn.scss'

BottomBtn.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.object.isRequired,
  onBtnClick: PropTypes.func
};

function BottomBtn({ text, type, icon, onBtnClick }) {
  return (
    <Button className="bottom-btn" type={type} onClick={onBtnClick} block>
      <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
      {text}
    </Button>
  );
}

export default BottomBtn;
