ParallaxScroll = function($elt) {
  this.init($elt);
};

$.extend(ParallaxScroll.prototype, {
  init: function ($elt) {
    var $nav = $('#main-navigation');

    this.$elt = $elt;
    this.$scrollContainer = $(window);
    this.config = {
      isBottom: this.$elt.hasClass("parallax-bottom"),
      initTop: +this.$elt.css("top").replace('px',''),
      initBottom: +this.$elt.css("bottom").replace('px',''),
      moveHeight: 150
    };
    this.navHeight = $nav.length > 0 ?  $nav.innerHeight() : 0;

    this.scroll.bind(this);
    this.$scrollContainer.scroll(this.scroll.bind(this));
  },
  scroll: function () {
    var eltOffset = this.$elt.offset(),
        eltTop = eltOffset.top,
        windowHeight = this.$scrollContainer.innerHeight() - this.navHeight,
        windowTop = this.$scrollContainer.scrollTop(),
        windowBottom = windowTop + windowHeight,
        scrollRatio = (windowBottom -  eltTop) / windowHeight;

    if (scrollRatio > - 0.1 && scrollRatio < 1.1) {
      var movePx = this.config.moveHeight * scrollRatio;

      if (this.config.isBottom) {
        var newBottom = this.config.initBottom - movePx,
            newBottomCss = newBottom + "px";

        this.$elt.css("bottom", newBottomCss);
      } else {
        var newTop = this.config.initTop + movePx,
            newTopCss = newTop + "px";

        this.$elt.css("top", newTopCss);
      }
    }
  }
});
