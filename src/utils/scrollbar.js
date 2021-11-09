// eslint-disable-next-line max-classes-per-file
import ScrollBar, { ScrollbarPlugin } from "smooth-scrollbar";

// Custom Plugins
class StopScrollPlugin extends ScrollbarPlugin {
  static pluginName = "stopScroll";

  static defaultOptions = {
    stop: false,
  };

  transformDelta(delta) {
    return this.options.stop ? { x: 0, y: 0 } : delta;
  }
}

class HorizontalScrollPlugin extends ScrollbarPlugin {
  static pluginName = "horizontalScroll";

  static defaultOptions = {
    enable: false,
  };

  transformDelta(delta, fromEvent) {
    if (this.options.enable) {
      if (!/wheel/.test(fromEvent.type)) {
        return delta;
      }

      const { x, y } = delta;
      return {
        x: 0,
        y: Math.abs(x) > Math.abs(y) ? x : y,
      };
    }
    return delta;
  }
}

ScrollBar.use(StopScrollPlugin, HorizontalScrollPlugin);
export default ScrollBar;
