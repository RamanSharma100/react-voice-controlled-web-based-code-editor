export default interface IEditorTabs {
  openedEditors: any;
  handleOpen: (file: string) => void;
  handleClose: (file: string) => void;
  openNewFile: () => void;
}
