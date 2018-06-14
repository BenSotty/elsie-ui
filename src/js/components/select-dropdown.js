SelectDropdown = function($container) {
  this.init($container);
};

$.extend(SelectDropdown.prototype, {
  init: function($container) {
    this.$container = $container;
    this.$toggle = this.$container.find(".dropdown-toggle");
    this.$toggleLabel = this.$toggle.find(".dropdown-toggle-label");
    this.$content = this.$container.find(".dropdown-options");
    this.$options = this.$content.find(".dropdown-option");
    this.$select = this.$container.find("select");

    var self = this;
    this.$toggle.click(function(event) {
      self.toggle.call(self);
      event.stopPropagation();
    });

    this.$options.not(".disabled").click(function(event) {
      self.select.call(self, $(event.currentTarget));
    });
  },
  toggle: function () {
    this.$container.toggleClass("expanded");
  },
  close: function() {
    this.$container.removeClass("expanded");
  },
  select: function ($option) {
    if (!$option) { return; }

    var value = $option.data("value"),
        closeDelayInMs = 100;

    this.$options.not($option).removeClass("selected");
    $option.addClass("selected");
    this.$toggleLabel.html($option.html());
    window.setTimeout(this.close.bind(this), closeDelayInMs);

    if (this.$select.length > 0) {
      var $selectOption = this.$select.find("option[value='" + value + "']");
      $selectOption.prop("selected", true);
    }
  }
});
