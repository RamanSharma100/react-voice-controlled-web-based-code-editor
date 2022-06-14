interface Ititle {
  text?: string;
  icon?: string;
}

interface Ilist {
  icon?: string;
  text: string;
  collapsable: boolean;
  children?: Ilist[];
  isOpen: boolean;
  setIsOpen: any;
  subSideBar: string;
  setSubSideBar: any;
}

export default interface ISideBar {
  mainSideBar?: boolean;
  setIsSideBarOpen: any;
  setSubSideBar: any;
  setIsSubSideBarOpen: any;
  title?: Ititle;
  list: Ilist[];
  setText?: any;
  speak?: ({ text }: { text: string }) => void;
}
