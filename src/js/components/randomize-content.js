RandomizeContent = function($container) {
  this.init($container);
};

$.extend(RandomizeContent.prototype, {
  init: function($container) {
    var contentName = $container.data("randomize-content"),
        randomContent = window.elsie.randomContents[contentName],
        self = this;

    this.$container = $container;
    this.contents = randomContent.contents;
    this.defaultOptions = {
      switchIntervallInSeconds: 20,
      animationDuration: 0.8,
      fadingOutStopRate: 0.3,
      fadeOut: true
    };
    this.options = $.extend({}, this.defaultOptions, randomContent.options);
    this.$container.css("transition-duration", this.options.animationDuration + "s");
    this.eltSwitchDuration = (this.options.animationDuration / 2) * 1000;
    this.currentIndex = +this.$container.data("randomize-index") || 0;
    this.$elts = {};

    $.each(this.contents[0], function(k, v) {
      self.$elts[k] = self.find.call(self, k);
    });

    window.setInterval(this.switchContent.bind(this), this.options.switchIntervallInSeconds * 1000);
  },
  find: function(name) {
    var dataName = "data-randomize-" + name,
        $elt = this.$container.find("[ "+ dataName + "]"),
        containerAttr = this.$container.attr(dataName);

    if ($elt.length > 0) {
      return $elt;
    } else if (typeof containerAttr !== typeof undefined && containerAttr !== false) {
      return this.$container;
    } else {
      return null;
    }
  },
  switchContent: function() {
    this.setRandomIndex.call(this);
    if (this.options.fadeOut) {
      this.startFadeOut.call(this);
      var stopFadeOutInMs = this.options.animationDuration * this.options.fadingOutStopRate * 1000;
      window.setTimeout(this.stopFadeOut.bind(this), stopFadeOutInMs);
    }

    this.setContent.call(this);
  },
  setRandomIndex: function() {
    var index = null;

    while (index === null || index === this.currentIndex) {
      index = Math.floor(Math.random() * this.contents.length);
    }

    this.currentIndex = index;
  },
  startFadeOut: function() {
    this.$container.addClass("fadingOut");
  },
  stopFadeOut: function() {
    this.$container.removeClass("fadingOut");
  },
  setContent: function() {
    var content = this.contents[this.currentIndex],
        self = this;

    $.each(content, function(k, v) {
      var $elt = self.$elts[k];

      if ($elt && $elt.length > 0) {
        self.switchElt.call(self, $elt, k, v);
      }
    });
  },
  switchElt: function($elt, k, v) {
    var option = this.getOption.call(this, k);

    if (option === "class") {
      this.switchClass($elt, k, v);
    } else if (option === "href") {
      $elt.attr("href", v);
    } else {
      this.switchHtml.call(this, $elt, v);
    }
  },
  getOption: function(key) {
    if (this.options) {
      return this.options[key];
    } else {
      return null;
    }
  },
  switchClass: function($elt, k, v) {
    var oldClass = $elt.data("randomize-class");
    if (oldClass) {
      $elt.removeClass(oldClass);
    }
    $elt.addClass(v);
    $elt.data("randomize-class", v);
  },
  switchHtml: function($elt, v) {
    var self = this;

    $($elt).fadeOut({
      duration: self.eltSwitchDuration,
      complete: function () {
        var $elt = $(this);
        $elt.html(v);
        $elt.fadeIn(self.eltSwitchDuration);
      }
    });
  }
});
