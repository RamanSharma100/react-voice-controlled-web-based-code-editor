import { useState } from "react";

import "./App.css";

import CodeEditor from "./Pages/CodeEditor/CodeEditor";

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isSubSideBarOpen, setIsSubSideBarOpen] = useState<boolean>(false);
  const [subSideBar, setSubSideBar] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  return (
    <div className="App">
      <CodeEditor
        isSideBarOpen={isSideBarOpen}
        isSubSideBarOpen={isSubSideBarOpen}
        subSideBar={subSideBar}
        setIsSideBarOpen={setIsSideBarOpen}
        setIsSubSideBarOpen={setIsSubSideBarOpen}
        setSubSideBar={setSubSideBar}
        text={text}
        setText={setText}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
      />
    </div>
  );
};

export default App;
