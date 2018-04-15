Navigation = function(id) {
  this.init(id);
};

$.extend(Navigation.prototype, {
  init: function (id) {
    this.id = id;
    this.$navBar = $("#" + this.id);
    this.headerId = this.id + "-header";
    this.$header = $("#" + this.headerId);
    this.scrolled = false;
    $(window).scroll(this.updateState.bind(this));
    this.updateState();
  },

  updateState: function () {
    var headerPos = this.$header.position(),
        headerbottom = headerPos.top + this.$header.innerHeight(),
        navBottom = $(window).scrollTop() + this.$navBar.innerHeight(),
        windowScrollTop = $(window).scrollTop(),
        isScrolled = navBottom > headerbottom;

    if (isScrolled !== this.scrolled) {
      this.scrolled = isScrolled;
      this.$navBar.toggleClass("scrolled");
    }
  }
});
