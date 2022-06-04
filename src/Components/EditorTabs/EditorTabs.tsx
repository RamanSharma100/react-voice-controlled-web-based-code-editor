import { FunctionComponent as FC, useState } from "react";

import IEditorTabs from "./IEditorTabs";

const EditorTabs: FC<IEditorTabs> = ({
  openedEditors,
  handleClose,
  handleOpen,
  createNewFile,
}) => {
  return (
    <div className=" px-10 flex border-y gap-1 border-t-0 mx-10 ">
      {openedEditors.map((openedEditor: any, index: number) => (
        <div
          key={index * 4231}
          className={`flex px-3 py-2 rounded-t ${
            openedEditor.isOpened
              ? "bg-white text-black"
              : "bg-black text-white"
          }
            hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer
          `}
        >
          <div
            className="w-4/5"
            title={openedEditor.file_name}
            onClick={() => handleOpen(openedEditor.file_name)}
          >
            {openedEditor.file_name.split("/").pop()}
          </div>
          <button
            type="button"
            onClick={() => handleClose(openedEditor.file_name)}
            className={`ml-3  px-2 py-0 z-20 hover:bg-gray-300 hover:text-black transition duration-200 ease-in-out cursor-pointer`}
          >
            x
          </button>
        </div>
      ))}
      {openedEditors.length < 5 && (
        <div
          key={4231 * 4513}
          onClick={createNewFile}
          className="text-white px-3 py-2 rounded-t bg-black hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer"
        >
          Add New Editor +
        </div>
      )}
    </div>
  );
};

export default EditorTabs;
