import { useEffect, useRef } from "react";
const { remote } = window.require("electron");
const { Menu, MenuItem } = remote;

const useContextMenu = (itemArr, targetSelector) => {
  let clickElement = useRef(null);
  useEffect(() => {
    const menu = new Menu();
    itemArr.forEach(item => {
      menu.append(new MenuItem(item));
    });
    const handleContextMenu = e => {
      // 当我们点击需要出现菜单的时候，才执行popup
      if (document.querySelector(targetSelector).contains(e.target)) {
        clickElement.current = e.target;
        menu.popup();
      }
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  return clickElement;
};

export default useContextMenu;
