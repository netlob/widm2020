let stats = {
  anita: {},
  buddy: {},
  claes: {},
  jaike: {},
  johan: {},
  leonie: {},
  miljuschja: {},
  nathan: {},
  rob: {},
  tina: {}
};

$.ajax({
  url:
    "https://cors-anywhere.herokuapp.com/http://wieisdemol.avrotros.nl/home/", //
  method: "GET",
  cors: true
}).done(function(response) {
  $("main").append(`<h3>Wie is de mol stats</h3><hr>`);
  response = response.replace(/\s/g, "").toLowerCase();

  $("main").append(`<h5>% landelijke verdenkingen</h5>`);
  for (let person in stats) {
    stats[person].count = response
      .substr(response.indexOf(`"teaser-round-title">${person}`))
      .substring(
        response
          .substr(response.indexOf(`"teaser-round-title">${person}`))
          .indexOf('"count":') + 8,
        response
          .substr(response.indexOf(`"teaser-round-title">${person}`))
          .indexOf("</span></strong>")
      )
      .split(">")
      .pop();
    $("main").append(
      `<span style="${
        parseInt(stats[person].count) < 1
          ? "color:red;text-decoration:line-through;"
          : ""
      }text-transform: capitalize;"><b>${person}:</b> ${
        stats[person].count
      }%<br></span>`
    );
  }

  stats.total = parseInt(
    response.substring(
      response.indexOf("erzijn<strong>") + 14,
      response.indexOf("</strong>verdenkingen")
    )
  );
  $("main").append(`<hr><b>Totaal:</b> ${stats.total} stemmen`);

  stats.money = response
    .substr(response.indexOf('<divclass="moneypot-text">&euro;'))
    .substring(
      32,
      response
        .substr(response.indexOf('<divclass="moneypot-text">&euro;'))
        .indexOf("</div></div>")
    );
  $("main").append(
    `<h5>Totaal € in de pot op dit moment</h5><h6>${stats.money}€</h6><br><hr>`
  );

  $("main").append(
    `<br><h5>Aantal x voorgekomen in aflevering 2 per kandidaat</h6>`
  );
});
