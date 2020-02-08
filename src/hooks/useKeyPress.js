import { useState, useEffect } from "react";

const useKeyPress = targetKeyCode => {
  const [keyPressed, setKeyPressed] = useState(false);
  const KeyDownHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(true);
    }
  };
  const KeyUpHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", KeyDownHandler);
    document.addEventListener("keyup", KeyUpHandler);
    return () => {
      document.removeEventListener("keydown", KeyDownHandler);
      document.removeEventListener("keyup", KeyUpHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
