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
  });
}());
