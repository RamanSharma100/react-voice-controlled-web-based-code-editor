import { Dispatch, SetStateAction } from "react";

export default interface IAllCommands {
  setCommandsOpened: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  speak: ({ text }: { text: string }) => void;
}
