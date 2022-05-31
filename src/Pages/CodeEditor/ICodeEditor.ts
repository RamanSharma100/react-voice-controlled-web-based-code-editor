export default interface ICodeEditor {
  isSideBarOpen: boolean;
  isSubSideBarOpen: boolean;
  subSideBar: string;
  setIsSideBarOpen(isOpen: boolean): void;
  setIsSubSideBarOpen(isOpen: boolean): void;
  setSubSideBar(sideBar: string): void;
}
