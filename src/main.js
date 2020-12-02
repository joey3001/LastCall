import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Beer from "../src/js/beerConstructor.js";
import Beers from "../src/js/beers.js";
import User from "../src/js/user.js";

const IPA = new Beer(1, "IPA", 2, 4, 1, 100);
const Pilsner = new Beer(2, "Pilsner", 1, 3, 1, 200);
const Hefewiezen = new Beer(3, "Hefewiezen", 2, 1, 2, 300);
const PaleAle = new Beer(4, "Pale Ale", 3, 2, 2, 400);
const BrownAle = new Beer(5, "Brown Ale", 4, 3, 2, 500);
const Stout = new Beer(6, "Stout", 5, 2, 2, 600);
const SourBeer = new Beer(7, "Sour Beer", 7, 1, 2, 700);

let beers = new Beers();
beers.addBeers(IPA);
beers.addBeers(Pilsner);
beers.addBeers(Hefewiezen);
beers.addBeers(PaleAle);
beers.addBeers(BrownAle);
beers.addBeers(Stout);
beers.addBeers(SourBeer);


//Logic for title page of quiz

$(document).ready(function () {
  $("#startQuiz").click(function () {
    $("#titlePage").fadeOut();
    nextQuestion();
  });

  const question = $(".form-group");
  const nextButton = $("#next");
  const backButton = $("#back");
  const submitButton = $("#submit");
  let step = 0;

  function hideAll() {
    submitButton.hide();
    question.delay(400).fadeOut();
    nextButton.delay(400).fadeOut();
    backButton.delay(400).fadeOut();
  }

  function showButtons() {
    nextButton.fadeIn();
    backButton.fadeIn();
  }

  function showSubmitButton() {
    submitButton.show();
    //or can change to show questions if the user wants to review their answers
    question.hide();
    nextButton.hide();
    backButton.hide();
  }

  function nextQuestion() {
    if (step === 0) {
      submitButton.hide();
      question.hide();
      backButton.hide();
      nextButton.show();
      $("div[value=1]").show();
    } else if (step === 1) {
      hideAll();
      $("div[value=2]").delay(400).fadeIn(300);
      showButtons();
    } else if (step === 2) {
      hideAll();
      $("div[value=3]").delay(400).fadeIn(300);
      showButtons();
    } else if (step === 3) {
      hideAll();
      $("div[value=4]").delay(400).fadeIn(300);
      showButtons();
    } else {
      showSubmitButton();
    }
  }

  nextButton.click(function () {
    step++;
    nextQuestion();
  });
  backButton.click(function () {
    step--;
    nextQuestion();
  });



  $("#quiz").submit(function (event) {
    event.preventDefault();

    const userColor = parseInt($("input:radio[name=color]:checked").val());
    const userIbu = parseInt($("input:radio[name=ibu]:checked").val());
    const userClarity = parseInt($("input:radio[name=clarity]:checked").val());
    const userFlavor = parseInt($("input:radio[name=flavor]:checked").val());

    let user = new User();
    user.showBeerResult(userColor, userIbu, userClarity, userFlavor, beers);
    $("#result").text(`You should try ${user.beerLiked[0].name}.`);
    
  });
});
