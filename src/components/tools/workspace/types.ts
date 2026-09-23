export type PageItem = {
  id: string;
  sourceDocumentId: string;
  sourceFileName: string;
  sourcePageIndex: number;
  rotation: number;
  selected: boolean;
};

export type PageWorkspaceDocument = {
  id: string;
  fileName: string;
  fileSize: number;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
};

export type WorkspaceState = {
  documents: Record<string, PageWorkspaceDocument>;
  pages: PageItem[];
  selectedPageIds: string[];
};

export type WorkspaceAction =
  | { type: "LOAD_DOCUMENTS"; documents: PageWorkspaceDocument[]; pages: PageItem[] }
  | { type: "ADD_DOCUMENTS"; documents: PageWorkspaceDocument[]; pages: PageItem[] }
  | { type: "MOVE_PAGE"; sourceIndex: number; targetIndex: number }
  | { type: "ROTATE_PAGES"; pageIds: string[]; degrees: number }
  | { type: "ROTATE_ALL"; degrees: number }
  | { type: "REMOVE_PAGES"; pageIds: string[] }
  | { type: "TOGGLE_SELECT"; pageId: string; isMulti?: boolean }
  | { type: "SELECT_ALL" }
  | { type: "CLEAR_SELECTION" }
  | { type: "RESET" };
