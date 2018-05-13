(function() {
  $(document).ready(function(){
    var $navBar = $("#main-navigation");
    if ($navBar.length > 0) {
      new Navigation($navBar);
    }

    var $greetings = $("#greetings");
    if ($greetings.length > 0) {
      new Greetings($greetings);
    }

    $.each($("[data-randomize-content]"), function() {
      new RandomizeContent($(this));
    });
  });
}());
