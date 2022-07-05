import { FunctionComponent as FC } from "react";
import voiceCommands from "../../data/voiceCommands";
import CommandsTable from "./CommandsTable";

import IAllCommands from "./IAllCommands";

const AllCommands: FC<IAllCommands> = ({
  setCommandsOpened,
  setText,
  speak,
}) => {
  return (
    <div className="fixed top-0 z-20 bg-black border-2 border-t-0 border-b-0 border-r-0 shadow-md shadow-slate-600 w-1/3 right-0 h-screen overflow-y-auto">
      <i
        className="fa fa-times text-white cursor-pointer mt-8 ml-96"
        onClick={() => {
          setCommandsOpened(false);
          setText(" Commands table closed!");
          speak({
            text: "Commands table closed!",
          });
        }}
      ></i>
      <div className="bg-black text-white">
        <h1 className="py-4 px-5">Voice Commands</h1>
        {Object.keys(voiceCommands).map((key, i) => (
          <div className="py-5 px-5" key={i * 7456}>
            <h4 className="py-4 px-5 text-capitalize text-center">
              {key.toLowerCase().replace("commands", "")} Commands
            </h4>
            <CommandsTable
              cols={["Commands", "Information"]}
              rows={(voiceCommands as any)[key].commands}
              info={(voiceCommands as any)[key].info}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCommands;
