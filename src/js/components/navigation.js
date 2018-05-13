Navigation = function($navBar) {
  this.init($navBar);
};

$.extend(Navigation.prototype, {
  init: function ($navBar) {
    this.$navBar = $navBar;
    this.id = this.$navBar.attr('id');
    this.headerId = this.id + "-header";
    this.$header = $("#" + this.headerId);
    this.scrolled = false;
    this.$scrollContainer = $(window);
    this.$scrollContainer.scroll(this.updateState.bind(this));
    this.updateState();
  },

  updateState: function () {
    var headerPos = this.$header.position(),
        headerbottom = headerPos.top + this.$header.innerHeight(),
        navBottom = this.$scrollContainer.scrollTop() + this.$navBar.innerHeight(),
        isScrolled = navBottom > headerbottom;

    if (isScrolled !== this.scrolled) {
      this.scrolled = isScrolled;
      this.$navBar.toggleClass("scrolled");
    }
  }
});
