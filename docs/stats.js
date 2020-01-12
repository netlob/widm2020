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
  document.body.innerHTML += `<h3>Wie is de mol stats</h3><hr>`;
  response = response.replace(/\s/g, "").toLowerCase();

  document.body.innerHTML += `<h5>% landelijke verdenkingen</h5>`;
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
    document.body.innerHTML += `<b>${person}:</b> ${stats[person].count}%<br>`;
  }

  stats.total = parseInt(
    response.substring(
      response.indexOf("erzijn<strong>") + 14,
      response.indexOf("</strong>verdenkingen")
    )
  );
  document.body.innerHTML += `<hr><b>Totaal:</b> ${stats.total} stemmen`;

  stats.money = response
    .substr(response.indexOf('<divclass="moneypot-text">&euro;'))
    .substring(
      32,
      response
        .substr(response.indexOf('<divclass="moneypot-text">&euro;'))
        .indexOf("</div></div>")
    );
  document.body.innerHTML += `<h5>Totaal € in de pot op dit moment</h5><h6>${stats.money}€</h6><br>`;

  // document.body.innerText = JSON.stringify(stats);
});
