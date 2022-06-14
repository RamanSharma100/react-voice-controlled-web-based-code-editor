import { FunctionComponent as FC } from "react";

import ISideBar from "./ISideBar";

const SideBar: FC<ISideBar> = ({
  title,
  list,
  mainSideBar,
  setSubSideBar,
  setIsSubSideBarOpen,
  setIsSideBarOpen,
  setText,
  speak,
}) => {
  return (
    <div
      className={`${
        mainSideBar
          ? "w-60"
          : "w-60 ml-60 border border-t-0 border-r-0 border-b-0"
      } h-full shadow-md bg-black  fixed`}
      id="sidenavSecExample"
    >
      {title && (
        <div className="pt-4 pb-2 px-6">
          <div className="flex items-center">
            {title.icon && (
              <div className="shrink-0">
                <img
                  src={title.icon}
                  className="rounded-full w-10"
                  alt="Avatar"
                />
              </div>
            )}
            {title.text && (
              <div className="grow ml-3">
                <p className="text-sm font-semibold text-white">{title.text}</p>
              </div>
            )}
            <button
              type="button"
              className="ml-auto text-black bg-white py-1 px-4 absolute right-0.5 z-10"
              onClick={() => {
                setIsSideBarOpen(false);
                setIsSubSideBarOpen(false);
                setSubSideBar("");
                if (mainSideBar) {
                  if (setText) {
                    setText(`Main sidebar closed!`);
                  }
                  if (speak) {
                    speak({
                      text: `Main sidebar closed!`,
                    });
                  }
                }
              }}
            >
              {"< "}
            </button>
          </div>
        </div>
      )}
      <ul className="relative px-1 py-3 mt-4">
        {list &&
          list.map((item, index) => {
            return (
              <li key={index} className="relative text-white my-2">
                <button
                  type="button"
                  className={`flex items-center text-sm mx-auto py-4 w-full px-6 h-12 overflow-hidden ${
                    item.isOpen && item.subSideBar === item.text.toLowerCase()
                      ? "text-black bg-blue-50"
                      : "text-white"
                  } text-ellipsis whitespace-nowrap rounded ${
                    mainSideBar && " hover:text-black hover:bg-blue-50"
                  } transition duration-300 ease-in-out`}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="primary"
                  onClick={() => {
                    item.setIsOpen(() =>
                      item.isOpen
                        ? item.subSideBar === item.text.toLowerCase()
                          ? false
                          : true
                        : true
                    );
                    item.setSubSideBar(item.text.toLowerCase());

                    if (mainSideBar) {
                      if (setText) {
                        setText(
                          item.isOpen
                            ? item.subSideBar === item.text.toLowerCase()
                              ? `${item.text} Tab closed!`
                              : `${item.text} Tab opened!`
                            : `${item.text} Tab opened!`
                        );
                      }
                      if (speak) {
                        speak({
                          text: item.isOpen
                            ? item.subSideBar === item.text.toLowerCase()
                              ? `${item.text} Tab closed!`
                              : `${item.text} Tab opened!`
                            : `${item.text} Tab opened!`,
                        });
                      }
                    }
                  }}
                >
                  {item.icon && (
                    <img
                      aria-hidden="true"
                      src={item.icon}
                      className="w-8 h-8 mr-3"
                    />
                  )}
                  {item.text}
                </button>
              </li>
            );
          })}
      </ul>
      {mainSideBar && (
        <div className="text-center bottom-0 bg-black py-5 absolute w-full">
          <p className="text-xs pb-3 text-white">Made by Raman Sharma</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
