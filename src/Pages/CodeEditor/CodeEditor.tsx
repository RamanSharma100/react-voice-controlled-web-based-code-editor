import { FunctionComponent as FC, useEffect, useRef, useState } from "react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";

import SideBar from "../../Components/SideBar/SideBar";
import EditorTabs from "../../Components/EditorTabs/EditorTabs";
import Editor from "../../Components/Editor/Editor";
import VoiceAssistant from "../../Components/VoiceAssistant/VoiceAssistant";

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
  text,
  setText,
  isSpeaking,
  setIsSpeaking,
}) => {
  const [openedEditors, setOpenedEditors] = useState<any[]>([]);
  const [openedEditorsContent, setOpenedEditorsContent] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { speak, speaking } = useSpeechSynthesis({
    callbackFunctions: [setText, setIsSpeaking],
  });

  useEffect(() => {
    if (speaking) {
      setIsSpeaking(true);
      //   setTimeout(() => setText(""), 5000);
    } else {
      setIsSpeaking(false);
    }
  }, [speaking]);

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
    const recentFile: boolean =
      openedEditors.filter((editor: any) => editor.file_name.includes(fileName))
        .length > 0;
    if (!recentFile) {
      if (openedEditors.length < 5) {
        setOpenedEditors((prevEditors: any) => [
          ...prevEditors,
          {
            file_name: fileName,
            isOpened: false,
          },
        ]);
        setOpenedEditorsContent((prevEditors: any) => [
          ...prevEditors,
          {
            file_name: fileName,
            content: "",
          },
        ]);
        handleOpen(fileName);
        setText(`created ${fileName} !`);
        speak({ text: `created ${fileName} !` });
        setFileName("");
      } else {
        // alert("You can open only 5 files at a time");
        setText("You can open only 5 files at a time");
        speak({ text: "You can open only 5 files at a time" });
        setFileName("");
      }
    } else {
      // alert("This file already exists");
      setText("This file already exists");
      speak({ text: "This file already exists" });
    }
  };

  const createNewFile = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <VoiceAssistant
        text={text}
        setText={setText}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        openedEditors={openedEditors}
        setOpenedEditors={setOpenedEditors}
        openedEditorsContent={openedEditorsContent}
        setOpenedEditorsContent={setOpenedEditorsContent}
        textAreaRef={textAreaRef}
      />
      {isModalOpen && (
        <div className="flex fixed transition-all delay-75 bg-black fade text-white left-0 top-0 flex-col items-center p-5 w-full z-10 h-full">
          <h1 className="text-5xl font-bold py-10 mt-10 mb-5">
            Create New File
          </h1>
          <form className="flex w-2/5 gap-10 flex-col items-center">
            <input
              className="w-full p-5 border border-t-0 border-l-0 border-r-0 outline-none bg-transparent"
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <div className="flex gap-2 w-full">
              <button
                className="w-3/6 py-3 px-5  outline-none bg-white text-black"
                type="submit"
                onClick={() => {
                  openNewFile();
                  setIsModalOpen(false);
                }}
              >
                Create File
              </button>
              <button
                className="w-3/6 py-3 px-5  outline-none bg-red-500 text-white"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
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
          createNewFile={createNewFile}
        />
        {openedEditors.length > 0 &&
        openedEditors.filter((editor: any) => editor.isOpened).length > 0 ? (
          <Editor
            textAreaRef={textAreaRef}
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
                onClick={createNewFile}
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
