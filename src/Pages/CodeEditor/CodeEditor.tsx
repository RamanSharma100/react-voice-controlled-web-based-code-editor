import { FunctionComponent as FC, useState } from "react";

import SideBar from "../../Components/SideBar/SideBar";
import EditorTabs from "../../Components/EditorTabs/EditorTabs";
import Editor from "../../Components/Editor/Editor";

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
  const [openedEditorsContent, setOpenedEditorsContent] = useState<any[]>([]);

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
    setOpenedEditorsContent((prevEditors: any) => [
      ...prevEditors,
      { file_name, content: "" },
    ]);
  };

  const handleClose = (file_name: string) => {
    setOpenedEditors((prevEditors) =>
      prevEditors.filter((editor: any) => editor.file_name !== file_name)
    );
    setOpenedEditorsContent((prevEditors) =>
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
      setOpenedEditorsContent((prevEditors: any) => [
        ...prevEditors,
        {
          file_name:
            "untitled-file " +
            (prevEditors.filter((editor: any) =>
              editor.file_name.includes("untitled-file")
            ).length +
              1),
          content: "",
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
              // {
              //   text: "Work Space",
              //   isOpen: false,
              //   setIsOpen: (isOpen: boolean) => {},
              //   collapsable: true,
              //   subSideBar: "",
              //   setSubSideBar: (subSideBar: string) => {},
              // },
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
        {openedEditors.length > 0 &&
        openedEditors.filter((editor: any) => editor.isOpened).length > 0 ? (
          <Editor
            file_data={
              openedEditorsContent.find(
                (editor1) =>
                  editor1.file_name ===
                  openedEditors.find((editor) => editor.isOpened).file_name
              ).content
            }
            set_file_data={setOpenedEditorsContent}
            opened_file={
              openedEditors.find((editor) => editor.isOpened).file_name
            }
          />
        ) : (
          <div className="flex justify-center items-center mt-60">
            <div className="text-center">
              <h1 className="text-3xl">Welcome to Code Editor</h1>
              <p className="text-lg py-4">Create a new file</p>
              <button
                type="button"
                className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={openNewFile}
              >
                Create New File
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CodeEditor;
