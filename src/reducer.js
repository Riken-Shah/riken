export const UPDATE_SCROLLING_DATA = "UPDATE_SCROLLING_DATA";
export const SET_MAIN_SCROLLBAR_INSTANCE = "SET_MAIN_SCROLLBAR_INSTANCE";
export const WINDOW_RESIZE = "WINDOW_RESIZE";

const Reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SCROLLING_DATA: {
      const { x, y } = action;
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
    case SET_MAIN_SCROLLBAR_INSTANCE:
      return { ...state, mainScrollBar: action.mainScrollBar };
    case WINDOW_RESIZE:
      return {
        ...state,
        windowSize: { width: action.width, height: action.height },
      };
    default:
      return state;
  }
};

export default Reducer;
