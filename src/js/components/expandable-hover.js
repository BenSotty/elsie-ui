ExpandableHover = function($container) {
  this.init($container);
};

$.extend(ExpandableHover.prototype, {
  init: function($container) {
    this.$container = $container;
    this.$toggle = this.$container.find(".expandable-toggle");

    // Expand when hoverIn toggle
    this.$toggle.hover(this.expand.bind(this), function() {});
    // Collapse when hoverOut container
    this.$container.hover(function() {}, this.collapse.bind(this));
    // For touch screens: toggle on click / tap
    this.$toggle.click(this.toggle.bind(this));
  },
  expand: function() {
    this.$container.addClass("expanded");
  },
  collapse: function() {
    this.$container.removeClass("expanded");
  },
  toggle: function() {
    this.$toggle.toggleClass("expanded");
  }
});
