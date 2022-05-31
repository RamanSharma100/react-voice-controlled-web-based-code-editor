import { FunctionComponent as FC, useState } from "react";

import SideBar from "../../Components/SideBar/SideBar";
import EditorTabs from "../../Components/EditorTabs/EditorTabs";

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
  const [openedEditors, setOpenedEditors] = useState<any[]>([]);

  const handleOpen = (file_name: string) => {
    setOpenedEditors((prevEditors: any) =>
      prevEditors.map((editor: any) => {
        if (editor.file_name === file_name) {
          editor.isOpened = true;
        } else {
          editor.isOpened = false;
        }
        return editor;
      })
    );
  };

  const handleClose = (file_name: string) => {
    setOpenedEditors((prevEditors) =>
      prevEditors.filter((editor: any) => editor.file_name !== file_name)
    );
  };

  const openNewFile = () => {
    if (openedEditors.length < 5) {
      setOpenedEditors((prevEditors: any) => [
        ...prevEditors,
        {
          file_name:
            "untitled-file " +
            (prevEditors.filter((editor: any) =>
              editor.file_name.includes("untitled-file")
            ).length +
              1),
          isOpened: false,
        },
      ]);
      handleOpen(
        "untitled-file " +
          (openedEditors.filter((editor: any) =>
            editor.file_name.includes("untitled-file")
          ).length +
            1)
      );
    } else {
      alert("You can open only 5 files at a time");
    }
  };

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
          width: `${
            isSideBarOpen
              ? isSubSideBarOpen
                ? "calc(100% - 480px)"
                : "calc(100% - 240px)"
              : "100%"
          }`,
        }}
      >
        {!isSideBarOpen && (
          <button
            type="button"
            className="ml-auto text-black bg-white py-1 px-4 fixed left-0.5 z-10"
            onClick={() => {
              setIsSideBarOpen(true);
            }}
          >
            {"> "}
          </button>
        )}
        <EditorTabs
          openedEditors={openedEditors}
          handleOpen={handleOpen}
          handleClose={handleClose}
          openNewFile={openNewFile}
        />
        CodeEditor
      </div>
    </>
  );
};

export default CodeEditor;
