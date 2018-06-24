(function() {
  $(document).ready(function(){
    var $navBar = $("#main-navigation");
    if ($navBar.length > 0) {
      new Navigation($navBar);
    }

    $.each($(".expandable-hover"), function() {
      new ExpandableHover($(this));
    });

    var $greetings = $("#greetings");
    if ($greetings.length > 0) {
      new Greetings($greetings);
    }

    $.each($("[data-randomize-content]"), function() {
      new RandomizeContent($(this));
    });

    $.each($(".select-dropdown"), function() {
      new SelectDropdown($(this));
    });

    $.each($(".parallax-shape-container [class^='parallax-shape-']"), function() {
      new ParallaxScroll($(this));
    });

    $.each($(".submit-animated"), function() {
      new SubmitAnimated($(this));
    });

    // Empty newsletter after click submit button
    $("#newsletter-submit").click(function() {
      $("#newsletter-submit-input").val("");
    });

    $.each($("[data-smooth-apparition]"), function () {
      new SmoothApparition($(this));
    });
  });
}());
