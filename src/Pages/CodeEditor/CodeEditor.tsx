import { FunctionComponent as FC } from "react";

import SideBar from "../../Components/SideBar/SideBar";

import ICodeEditor from "./ICodeEditor";
import UserIcon from "../../assets/icons/user_icon.svg";
import FileClosedIcon from "../../assets/icons/file_closed_icon.svg";
import SearchIcon from "../../assets/icons/search_icon.svg";

const CodeEditor: FC<ICodeEditor> = ({
  isSideBarOpen,
  isSubSideBarOpen,
  subSideBar,
  setIsSideBarOpen,
  setIsSubSideBarOpen,
  setSubSideBar,
}) => {
  return (
    <>
      {isSideBarOpen && (
        <SideBar
          list={[
            {
              subSideBar,
              setSubSideBar,
              icon: FileClosedIcon,
              text: "Explorer",
              collapsable: false,
              isOpen: isSubSideBarOpen,
              setIsOpen: setIsSubSideBarOpen,
            },
            {
              subSideBar,
              setSubSideBar,
              icon: SearchIcon,
              text: "Search",
              collapsable: false,
              isOpen: isSubSideBarOpen,
              setIsOpen: setIsSubSideBarOpen,
            },
          ]}
          setIsSideBarOpen={setIsSideBarOpen}
          setSubSideBar={setSubSideBar}
          setIsSubSideBarOpen={setIsSubSideBarOpen}
          mainSideBar={true}
          title={{ text: "Guest User", icon: UserIcon }}
        />
      )}
      {isSideBarOpen && isSubSideBarOpen ? (
        subSideBar === "explorer" ? (
          <SideBar
            setIsSideBarOpen={setIsSideBarOpen}
            setSubSideBar={setSubSideBar}
            setIsSubSideBarOpen={setIsSubSideBarOpen}
            list={[
              {
                text: "Opened Files",
                isOpen: false,
                setIsOpen: (isOpen: boolean) => {},
                collapsable: true,
                subSideBar: "",
                setSubSideBar: (subSideBar: string) => {},
              },
              {
                text: "Work Space",
                isOpen: false,
                setIsOpen: (isOpen: boolean) => {},
                collapsable: true,
                subSideBar: "",
                setSubSideBar: (subSideBar: string) => {},
              },
            ]}
          />
        ) : (
          <SideBar
            setIsSideBarOpen={setIsSideBarOpen}
            setIsSubSideBarOpen={setIsSubSideBarOpen}
            setSubSideBar={setSubSideBar}
            list={[
              {
                text: "Search [coming in upcoming updates]",
                isOpen: false,
                setIsOpen: (isOpen: boolean) => {},
                collapsable: true,
                subSideBar: "",
                setSubSideBar: (subSideBar: string) => {},
              },
            ]}
          />
        )
      ) : null}
      <div
        className={`${
          isSideBarOpen
            ? isSubSideBarOpen
              ? "ml-auto border-x border-r-0"
              : "ml-60 border-x border-r-0"
            : "w-full"
        } p-5 bg-black h-screen text-white max-h-full`}
        style={{
          width: `${isSideBarOpen && isSubSideBarOpen && "calc(100% - 480px)"}`,
        }}
      >
        {!isSideBarOpen && (
          <button
            type="button"
            className="ml-auto text-black bg-white py-1 px-4 absolute left-0.5 z-10"
            onClick={() => {
              setIsSideBarOpen(true);
            }}
          >
            {"> "}
          </button>
        )}
        CodeEditor
      </div>
    </>
  );
};

export default CodeEditor;
