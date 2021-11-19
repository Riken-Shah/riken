export const UPDATE_SCROLLING_DATA = "UPDATE_SCROLLING_DATA";
export const SET_MAIN_SCROLLBAR_INSTANCE = "SET_MAIN_SCROLLBAR_INSTANCE";
export const WINDOW_RESIZE = "WINDOW_RESIZE";
export const SET_APP_STATE = "SET_APP_STATE";
export const SET_VISIBLE_SECTION = "SET_VISIBLE_SECTION";
export const SET_OBSERVER = "SET_OBSERVER";
export const ADD_SECTION_ELEMENT = "ADD_SECTION_ELEMENT";
export const SET_CURSOR_SCALE = "SET_CURSOR_SCALE";
export const SET_THEME = "SET_THEME";
export const APP_STATE = { DESKTOP: "desktop", MOBILE: "mobile" };

const Reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SCROLLING_DATA: {
      const { x, y } = action;
      // Avoid setting x and y to be 0 so we restore the scroll position
      // when app state changes.
      if (x === 0 && y === 0) {
        return state;
      }
      const oldX = state.scrollingPosition.x;
      const oldY = state.scrollingPosition.y;
      let horizontalScrollDirection = "";
      let verticleScrollDirection = "";
      if (oldY < y) {
        verticleScrollDirection = "down";
      } else {
        verticleScrollDirection = "up";
      }

      if (oldX < x) {
        horizontalScrollDirection = "right";
      } else {
        horizontalScrollDirection = "left";
      }

      return {
        ...state,
        scrollingPosition: {
          x,
          y,
          horizontalScrollDirection,
          verticleScrollDirection,
        },
      };
    }
    case SET_MAIN_SCROLLBAR_INSTANCE: {
      const { mainScrollBar } = action;
      if (mainScrollBar) {
        mainScrollBar.updatePluginOptions("onInitPlugin", {
          x: state.scrollingPosition.x,
          y: state.scrollingPosition.y,
        });
      }
      return { ...state, mainScrollBar };
    }
    case WINDOW_RESIZE: {
      state.mainScrollBar?.update();
      return {
        ...state,
        windowSize: { width: action.width, height: action.height },
      };
    }
    case SET_APP_STATE:
      return {
        ...state,
        appState: action.appState,
      };
    case SET_VISIBLE_SECTION: {
      return { ...state, activeSection: action.item };
    }
    case SET_OBSERVER:
      return { ...state, rootObserver: action.observer };
    case ADD_SECTION_ELEMENT: {
      const { elementType: index, element } = action;
      const newSectionElements = new Map(state.sectionElements);
      newSectionElements.set(index, element);
      return { ...state, sectionElements: newSectionElements };
    }
    case SET_CURSOR_SCALE:
      return { ...state, cursorScale: action.cursorScale };
    case SET_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

export default Reducer;
