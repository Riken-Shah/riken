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

// eslint-disable-next-line no-unused-vars
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

class UpdateScrollPositionOnInit extends ScrollbarPlugin {
  static pluginName = "onInitPlugin";

  static defaultOptions = {
    x: 0,
    y: 0,
  };

  onInit() {
    this.scrollbar.scrollTo(this.options.x, this.options.y);
    // Adding a bit momentum to fix scrolling
    this.scrollbar.addMomentum(0, 2);
  }
}

ScrollBar.use(
  StopScrollPlugin,
  UpdateScrollPositionOnInit,
  HorizontalScrollPlugin
);
export default ScrollBar;
