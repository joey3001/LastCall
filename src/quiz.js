$(document).ready(function () {
  $("#quiz").submit(function (event) {
    event.preventDefault();

    const color = $("input:radio[name=color]:checked").val();
    const flavor = $("input:radio[name=flavor]:checked").val();
    const abv = $("input:radio[name=abv]:checked").val();
    const carb = $("input:radio[name=carb]:checked").val();

    if (color === "light") {
      Pilsener;
    } else if (color === "amber") {
      IPA;
    } else if (color === "dark") {
      Stouts;
    }
  });
});

//const color = $("input:radio[name=color]:checked").val();
