import { FunctionComponent as FC } from "react";
import IAllCommands from "./IAllCommands";

const AllCommands: FC<IAllCommands> = ({}) => {
  return (
    <div className="fixed top-0 z-20 bg-black border-2 border-t-0 border-b-0 border-r-0 shadow-md shadow-slate-600 w-1/3 right-0 h-screen">
      AllCommands
    </div>
  );
};

export default AllCommands;
