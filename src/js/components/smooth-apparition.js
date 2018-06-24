SmoothApparition = function($elt) {
  this.init($elt);
};

$.extend(SmoothApparition.prototype, {
  init: function($elt) {
    var $nav = $('#main-navigation');

    this.$elt = $elt;
    this.state = null;
    this.$scrollContainer = $(window);
    this.navHeight = $nav.length > 0 ?  $nav.innerHeight() : 0;
    var duartion = this.$elt.css("transition-duration")
    this.config = {
      padding: 100,
      duartion: duartion ? (+duartion.replace('s','')) * 1000 : 300
    }

    if (this.$elt.hasClass("smooth-apparition-top") || this.$elt.hasClass("smooth-apparition-bottom")) {
      this.isVertical = true;
      this.config = { padding: 40 }
    } else {
      this.isVertical = false;
    }

    this.states = ["not-appeared", "appeared"];
    this.isRunning = false;

    this.$scrollContainer.scroll(this.updateState.bind(this));
    this.state =  "not-appeared";
    this.$elt.addClass(this.state);
    this.updateState.call(this);
  },
  setState: function (state) {
    this.state = state;
    this.$elt.removeClass(this.states).addClass(state);
    this.isRunning = true;
    var self = this;
    window.setTimeout(function () { self.isRunning = false; }, this.config.duration);
  },
  updateState: function () {
    this.resetPositionState.call(this);
    if (this.shouldAppear.call(this)) {
      this.appear.call(this);
    } else if (this.shouldResetApparition.call(this)) {
      this.resetApparition.call(this);
    }
  },
  resetPositionState: function () {
    var eltOffset = this.$elt.offset(),
        eltTop = eltOffset.top,
        eltBottom = eltTop + this.$elt.innerHeight(),
        windowHeight = this.$scrollContainer.innerHeight() - this.navHeight,
        windowTop = this.$scrollContainer.scrollTop() + this.navHeight,
        areaHeight = windowHeight - 2 * this.config.padding,
        areaTop = windowTop  + this.config.padding,
        areaBottom = areaTop + areaHeight,
        windowBottom = windowTop + windowHeight;

    this.positionState = {
      overBottom: areaBottom > eltTop,
      belowTop: areaTop < eltBottom,
      belowWindow: windowBottom < eltTop,
      overWindow: windowTop > eltBottom,
    };
  },
  shouldAppear: function () {
    return !this.isRunning && !this.isAppeared.call(this) && this.isInArea.call(this);
  },
  shouldResetApparition: function () {
    // Don't reset for vertical - it gets complicated
    return !this.isVertical && !this.isRunning && this.isAppeared.call(this) && this.isOutOfWindow.call(this);
  },
  isInArea: function () {
    return this.positionState.overBottom && this.positionState.belowTop;
  },
  isOutOfWindow: function () {
    return this.positionState.belowWindow || this.positionState.overWindow;
  },
  isAppeared: function () {
    return this.state === "appeared";
  },
  appear: function () {
    this.setState.call(this, "appeared");
  },
  resetApparition: function () {
    this.setState.call(this, "not-appeared");
  }
});
