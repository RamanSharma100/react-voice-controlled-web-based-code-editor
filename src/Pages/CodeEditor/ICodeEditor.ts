import { Dispatch, SetStateAction } from "react";

export default interface ICodeEditor {
  isSideBarOpen: boolean;
  isSubSideBarOpen: boolean;
  subSideBar: string;
  setIsSideBarOpen(isOpen: boolean): void;
  setIsSubSideBarOpen(isOpen: boolean): void;
  setSubSideBar(sideBar: string): void;
  setText: Dispatch<SetStateAction<string>>;
  setIsSpeaking: Dispatch<SetStateAction<boolean>>;
  isSpeaking: boolean;
  text: string;
}
