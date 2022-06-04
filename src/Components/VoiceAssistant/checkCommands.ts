import voiceCommands from "../../data/voiceCommands";

export interface ICheckCommands {
  commandName: string;
  commandType: string;
  commandAction: string | string[];
}

const checkCommands = (command: string): ICheckCommands => {
  let cmdType: string = "",
    cmdName: string = "";

  for (let cTypeIndex in Object.keys(voiceCommands)) {
    const cType = Object.keys(voiceCommands)[cTypeIndex];
    const commandName: string = (voiceCommands as any)[cType].commands.find(
      (cmd: string) =>
        command.toLowerCase().trim().includes(cmd.toLowerCase().trim()) && cmd
    );
    cmdName = commandName;

    if (commandName) {
      cmdType = cType;
      break;
    }
  }
  // console.log({
  //   commandName: cmdName,
  //   commandType: cmdType,
  //   commandAction: (voiceCommands as any)[cmdType]?.actions[0],
  // });

  return {
    commandName: cmdName,
    commandType: cmdType,
    commandAction: (voiceCommands as any)[cmdType]?.actions[0],
  };
};

export default checkCommands;
