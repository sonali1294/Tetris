import keyMirror from 'keymirror';
var TIMER_STATE = keyMirror({ NOT_STARTED: null, RUNNING: null, PAUSED: null, ENDED: null });

export class Interval {
  constructor(callback, time) {
    debugger;
    this.time = time;
    this.callback = callback;
    this.state = TIMER_STATE.NOT_STARTED;
  }
  internalCallback() {
    //this will execute every time.
    this.lastCallbackStartTime = Date.now(); //1566217326282
    this.callback();
  }
  start() {
    this.cID = setInterval(this.internalCallback.bind(this), this.time);
    this.state = TIMER_STATE.RUNNING;
  }
  reStartTimer() {
    this.internalCallback();
    this.start();
  }
  end() {
    clearInterval(this.cID);
    this.state = TIMER_STATE.ENDED;
  }
  pause() {
    this.timeRemaining = this.time - (Date.now() - this.lastCallbackStartTime);
    clearInterval(this.cID);
    this.state = TIMER_STATE.PAUSED;
  }
  resume() {
    setTimeout(this.reStartTimer.bind(this), this.timeRemaining);
  }
}
/**
 * var t = new Interval(function(){
 *          console.log('called');
 * }, 400);
 * t.start();
 * t.pause();
 * t.unpause();
 * t.stop();
 *
 *  */
