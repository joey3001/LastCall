$(document).ready(function() {

  //Remove title page
  $("#startQuiz").click(function() {
    $("#titlePage").fadeOut();
    //nextQuestion();
  })

  //One question at a time
  const question = $(".form-group");
  const nextButton = $("#next");
  const backButton = $("#back");
  const submitButton = $("#submit");
  let nextQuestion = 0;

  function hideAll() {
    submitButton.hide();
    question.delay(200).fadeOut();
    nextButton.delay(200).fadeOut();
    backButton.delay(200).fadeOut();
  }

  function
})