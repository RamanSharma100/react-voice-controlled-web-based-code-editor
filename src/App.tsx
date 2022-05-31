import CodeEditor from "./Pages/CodeEditor/CodeEditor";

import "./App.css";
import { useState } from "react";

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isSubSideBarOpen, setIsSubSideBarOpen] = useState<boolean>(false);
  const [subSideBar, setSubSideBar] = useState<string>("");

  return (
    <div className="App">
      <CodeEditor
        isSideBarOpen={isSideBarOpen}
        isSubSideBarOpen={isSubSideBarOpen}
        subSideBar={subSideBar}
        setIsSideBarOpen={setIsSideBarOpen}
        setIsSubSideBarOpen={setIsSubSideBarOpen}
        setSubSideBar={setSubSideBar}
      />
    </div>
  );
};

export default App;
