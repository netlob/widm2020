for (let i in [2, 3]) {
  let data = [];
  let highest = {};
  $.ajax({
    url: `./api/episodes/${parseInt(i) + 2}/data/chrono.json`,
    method: "GET"
  }).done(response => {
    $("body").append(
      `<canvas id="countChart${parseInt(i) +
        2}" width="400" height="300"></canvas>`
    );

    let colors = [
      "rgb(230, 25, 75)",
      "rgb(60, 180, 75)",
      "rgb(255, 225, 25)",
      "rgb(0, 130, 200)",
      "rgb(245, 130, 48)",
      "rgb(145, 30, 180)",
      "rgb(70, 240, 240)",
      "rgb(0, 128, 128)",
      "rgb(170, 110, 40)",
      "rgb(0, 0, 128)"
    ];

    Object.keys(response[250]).forEach((name, index) => {
      data.push({
        label: name,
        data: [],
        borderColor: colors[index],
        pointRadius: 0,
        lineTension: 0.3,
        fill: false,
        pointHoverRadius: 10
      });
    });

    Object.keys(response).forEach(frame => {
      Object.keys(response[frame]).forEach((name, index) => {
        data[index].data.push(response[frame][name]);
      });
    });

    data.forEach(item => {
      if (
        !highest.data ||
        item.data[item.data.length - 1] > highest.data[highest.data.length - 1]
      )
        highest = item.data[item.data.length - 1];
    });
    console.log(Object.keys(response).length);
    let ctx = document
      .getElementById(`countChart${parseInt(i) + 2}`)
      .getContext("2d");
    let lineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...Array(Object.keys(response).length).keys()],
        datasets: data
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: highest
              }
            }
          ]
        }
      }
    });
  });
}
