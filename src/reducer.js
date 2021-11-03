export const UPDATE_SCROLLING_DATA = "UPDATE_SCROLLING_DATA";

const Reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SCROLLING_DATA: {
      const { x, y } = action;
      const oldX = state.scrollingPosition.x;
      const oldY = state.scrollingPosition.y;
      let horizontalScrollDirection = "";
      let verticleScrollDirection = "";

      if (oldX < x) {
        horizontalScrollDirection = "down";
      } else {
        horizontalScrollDirection = "up";
      }

      if (oldY < y) {
        verticleScrollDirection = "right";
      } else {
        verticleScrollDirection = "left";
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
    default:
      return state;
  }
};

export default Reducer;
