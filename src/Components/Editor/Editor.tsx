import { FunctionComponent as FC } from "react";

import IEditor from "./IEditor";

import "./Editor.css";

const Editor: FC<IEditor> = ({
  file_data,
  opened_file,
  set_file_data,
  textAreaRef,
}) => {
  const handleChange = (e: any) => {
    set_file_data((prevFileData: any) =>
      prevFileData.map((file: any) => {
        if (file.file_name === opened_file) {
          file.content = e;
        }
        return file;
      })
    );
  };
  return (
    <>
      <div className="w-full flex h-5/6">
        {/* <div ref={divNumbersRef} className="editor-numbers py-5 mt-4 h-full overflow-x-auto">
          {file_data.split("\n").map((line: any, index: number) => (
            <p
              key={index + 1 * 2102}
              className="px-2 text-sm font-mono text-gray-600"
              style={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
            >
              {index + 1}
            </p>
          ))}
        </div> */}
        <textarea
          ref={textAreaRef}
          className="editor w-full font-mono max-w-full text-lg p-5 border-0 outline-none bg-transparent resize-none mt-4 ml-5 h-full"
          value={file_data}
          placeholder="Type your code here"
          onChange={(e) => handleChange(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default Editor;
