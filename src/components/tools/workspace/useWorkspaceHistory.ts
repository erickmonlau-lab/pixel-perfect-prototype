import { useCallback, useReducer, useState } from "react";
import type { PageItem, PageWorkspaceDocument, WorkspaceAction, WorkspaceState } from "./types";

function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case "LOAD_DOCUMENTS": {
      const docMap: Record<string, PageWorkspaceDocument> = {};
      action.documents.forEach((doc) => {
        docMap[doc.id] = doc;
      });
      return {
        documents: docMap,
        pages: action.pages,
        selectedPageIds: [],
      };
    }

    case "ADD_DOCUMENTS": {
      const docMap = { ...state.documents };
      action.documents.forEach((doc) => {
        docMap[doc.id] = doc;
      });
      return {
        documents: docMap,
        pages: [...state.pages, ...action.pages],
        selectedPageIds: state.selectedPageIds,
      };
    }

    case "MOVE_PAGE": {
      const nextPages = [...state.pages];
      const [moved] = nextPages.splice(action.sourceIndex, 1);
      if (!moved) return state;
      nextPages.splice(action.targetIndex, 0, moved);
      return {
        ...state,
        pages: nextPages,
      };
    }

    case "ROTATE_PAGES": {
      const targetSet = new Set(action.pageIds);
      return {
        ...state,
        pages: state.pages.map((p) =>
          targetSet.has(p.id)
            ? { ...p, rotation: (p.rotation + action.degrees + 360) % 360 }
            : p
        ),
      };
    }

    case "ROTATE_ALL": {
      return {
        ...state,
        pages: state.pages.map((p) => ({
          ...p,
          rotation: (p.rotation + action.degrees + 360) % 360,
        })),
      };
    }

    case "REMOVE_PAGES": {
      const removeSet = new Set(action.pageIds);
      return {
        ...state,
        pages: state.pages.filter((p) => !removeSet.has(p.id)),
        selectedPageIds: state.selectedPageIds.filter((id) => !removeSet.has(id)),
      };
    }

    case "TOGGLE_SELECT": {
      const exists = state.selectedPageIds.includes(action.pageId);
      let nextSelected: string[];
      if (action.isMulti) {
        nextSelected = exists
          ? state.selectedPageIds.filter((id) => id !== action.pageId)
          : [...state.selectedPageIds, action.pageId];
      } else {
        nextSelected = exists && state.selectedPageIds.length === 1 ? [] : [action.pageId];
      }
      return {
        ...state,
        selectedPageIds: nextSelected,
      };
    }

    case "SELECT_ALL": {
      return {
        ...state,
        selectedPageIds: state.pages.map((p) => p.id),
      };
    }

    case "CLEAR_SELECTION": {
      return {
        ...state,
        selectedPageIds: [],
      };
    }

    case "RESET": {
      return {
        documents: {},
        pages: [],
        selectedPageIds: [],
      };
    }

    default:
      return state;
  }
}

export function useWorkspaceHistory(initialState: WorkspaceState) {
  const [history, setHistory] = useState<WorkspaceState[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex] ?? initialState;

  const dispatch = useCallback((action: WorkspaceAction) => {
    setHistory((prev) => {
      const activeState = prev[currentIndex] ?? initialState;
      const nextState = workspaceReducer(activeState, action);
      const updatedHistory = prev.slice(0, currentIndex + 1);
      return [...updatedHistory, nextState];
    });
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, initialState]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) setCurrentIndex((prev) => prev - 1);
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) setCurrentIndex((prev) => prev + 1);
  }, [canRedo]);

  const reset = useCallback((newState: WorkspaceState) => {
    setHistory([newState]);
    setCurrentIndex(0);
  }, []);

  return {
    state,
    dispatch,
    canUndo,
    canRedo,
    undo,
    redo,
    reset,
  };
}
