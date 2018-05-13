Greetings = function($greetings) {
  this.init($greetings);
};

$.extend(Greetings.prototype, {
  init: function($greetings) {
    this.$greetings = $greetings;
    this.setMessage.call(this);

    var oneHourInMs = 60 * 60 * 1000;
    window.setInterval(this.setMessage.bind(this), oneHourInMs);
  },
  setMessage: function() {
    var now = new Date(),
        hours = now.getHours(),
        message = this.getMessage(hours);

    this.$greetings.html(message);
  },
  getMessage: function(hours) {
    var defaultMessage = "Hello!";
    if (isNaN(hours)) {
      return defaultMessage;
    } else if (this.isMorning(hours)) {
      return "Good morning!";
    } else if (this.isAfternoon(hours)) {
      return "Good afternoon!";
    } else if (this.isEvening(hours)) {
      return "Good evening!";
    } else if (this.isNight(hours)) {
      return "Good night!";
    } else {
      return defaultMessage;
    }
  },
  isMorning: function(hours) {
    return hours > 6 && hours < 12;
  },
  isAfternoon: function(hours) {
    return hours > 11 && hours < 19;
  },
  isEvening: function(hours) {
    return hours > 18 && hours < 22;
  },
  isNight: function(hours) {
    return hours > 21 || hours < 7;
  }
});
