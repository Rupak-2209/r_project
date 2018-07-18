$(function() {

  jQuery.validator.addMethod("checkName", function(value, element) {
    return this.optional(element) || /^\w+\s\w+$/.test(value);
  }, "Please specify the correct name");

  jQuery.validator.addMethod("checkAge", function(value, element) {
    return this.optional(element) || /^([1][8-9]|[2][0-9]|[3][0])$/.test(value);
  }, "Your age must be between 18 and 30");

  jQuery.validator.addMethod("checkDate", function(value, element) {
    var date = value.split('-');
    return this.optional(element) || (date[0] <= new Date().getFullYear()  && date[0] > 1900);
  }, "Please enter valid birth date");

  jQuery.validator.addMethod("checkEmail", function(value, element) {
    return this.optional(element) || /^\w+@\w+\.\w+$/.test(value);
  }, "Please enter valid email address");

  jQuery.validator.addMethod("checkMobileNo", function(value, element) {
    return this.optional(element) || /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(value);
  }, "Your mobile number must be 10 digit long");

  jQuery.validator.addMethod("checkCountry", function(value, element) {
      return this.optional(element) || (value != "other");
  }, "Please select your country");

  jQuery.validator.addMethod("checkMethodToContact", function(value, element) {
      return this.optional(element) || (value != '');
  }, "Check atleast one box to proceed");

  var validator = $(".form").validate({
    rules: {
      name: {
          required: true,
          checkName: true
      },
      age : {
          required: true,
          checkAge: true
      },
      date: {
          required: true,
          checkDate: true,
          date: true
      },
      email: {
          required: true,
          checkEmail: true
      },
      color: "required",
      country: {
          required: true,
          checkCountry: true
      },
      mobileNo: {
          required: true,
          checkMobileNo: true
      },
      address: "required",
      methodToContact: {
          required: true,
          checkMethodToContact: true
      },
    },
    messages: {
      color: "Please select color",
      address: "Please enter your address"
    }
  });

  $('#name').focusout(function() {
      validator.element("#name");
  });
  $('#age').focusout(function() {
      validator.element("#age");
  });
  $('#birthdate').focusout(function() {
      validator.element("#birthdate");
  });
  $('#mobile').focusout(function() {
      validator.element("#mobile");
  });
  $('#formControlTextarea').focusout(function() {
      validator.element("#formControlTextarea");
  });
  $("input[name*='methodToContact']").focusout(function() {
      validator.element("input[name*='methodToContact']");
  });
});
