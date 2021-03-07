import evt from "./events";
import { bindAll } from "../utils";

export default new (class {
  constructor() {
    this.on = 0;
    this.off = 0;
    this.events = {
      move: "mousemove",
      down: "mousedown",
      up: "mouseup",
    };

    bindAll(this, ["onMove", "onDown", "onUp"]);
    this.addEvents();
  }
  addEvents() {
    const { move, down, up } = this.events;
    evt.on(move, window, this.onMove);
    evt.on(down, window, this.onDown);
    evt.on(up, window, this.onUp);
    evt.on("click", window, (e) => evt.emit("click", e));
  }
  getPos(e) {
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const target = e.target;

    return {
      x,
      y,
      target,
    };
  }

  onMove(e) {
    const { x, y, target } = this.getPos(e);
    evt.emit("mousemove", {
      x,
      y,
      target,
      e,
    });
  }
  onDown(e) {
    const { x, y, target } = this.getPos(e);
    this.on = x;
    evt.emit("mousedown", {
      x,
      y,
      target,
    });
  }

  onUp(e) {
    const { x, target } = this.getPos(e);
    this.off = x;
    const click = Math.abs(this.off - this.on) < 10;
    evt.emit("mouseup", {
      x,
      target,
      click,
    });
  }
})();
