SubmitAnimated = function($btn) {
  this.init($btn);
};

$.extend(SubmitAnimated.prototype, {
  init: function($btn) {
    this.$btn = $btn;
    this.$timer = this.$btn.find(".timer svg");

    this.$btn.click(this.animate.bind(this));
  },
  animate: function() {
    if (this.$btn.hasClass("running")) {
      return;
    } else if (this.$btn.hasClass("success")) {
      this.reset.call(this);
      return;
    }
    this.$btn.addClass("running");

    var self = this;
    window.setTimeout(function() { self.loadAnimation.call(self, 0); }, 1200);
    window.setTimeout(function() { self.loadAnimation.call(self, 15); }, 1200);
    window.setTimeout(function() { self.loadAnimation.call(self, 75); }, 2000);
    window.setTimeout(function() { self.loadAnimation.call(self, 100); }, 2800);
  },
  loadAnimation: function(amountLoaded) {
    var strokeDashoffset = 3.83 * (100 - amountLoaded) + "px";
    this.$timer.css("stroke-dashoffset", strokeDashoffset);

    var self = this;
    if (amountLoaded === 100) {
      window.setTimeout(function() {
        self.$btn.removeClass("running");
        self.$btn.addClass("success");
      }, 500);
    }
  },
  reset: function () {
    this.$btn.addClass("reset");
    this.$timer.css("stroke-dashoffset", "383px");

    var self = this;
    window.setTimeout(function() {
      self.$btn.removeClass("success");
      self.$btn.removeClass("running");
      self.$btn.removeClass("reset");
    }, 500);
  }
});
