import { Dispatch, RefObject, SetStateAction } from "react";

export default interface IVoiceAssistant {
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  setIsSpeaking: Dispatch<SetStateAction<boolean>>;
  isSpeaking: boolean;
  openedEditors: string[];
  setOpenedEditors: Dispatch<SetStateAction<string[]>>;
  openedEditorsContent: string[];
  setOpenedEditorsContent: Dispatch<SetStateAction<string[]>>;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  createNewFile: (from?: string) => void;
  cancelFileCreation: Dispatch<SetStateAction<boolean>>;
  openNewFile: (file?: string) => void;
  setFileName: Dispatch<SetStateAction<string>>;
}
