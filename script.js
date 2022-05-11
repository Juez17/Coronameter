const container = document.querySelector('#container');
const covidDate = document.getElementById('covid-date');
let chart = am4core.create(container, am4charts.PieChart);
const searchBtn = document.getElementById('search-button');
const covidInfo = document.getElementById('covid-info');


const datesAr = [];
// var chart = am4core.create(
//     container,
//     am4charts.PieChart
//   );

// Create pie series
let series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "cases";
series.dataFields.category = "voivodeship";
let title = chart.titles.create();
title.fontSize = 35;
title.marginBottom = 30;

// Add data
chart.data = [{
  "voivodeship": "mazowieckie",
  "cases": 0
}, {
  "voivodeship": "dolnośląskie",
  "cases": 0
}, {
  "voivodeship": "kujawsko-pomorskie",
  "cases": 0
}, {
  "voivodeship": "lubelskie",
  "cases": 0
}, {
  "voivodeship": "lubuskie",
  "cases": 0
}, {
  "voivodeship": "łódzkie",
  "cases": 0
}, {
  "voivodeship": "małopolskie",
  "cases": 0
}, {
  "voivodeship": "opolskie",
  "cases": 0
}, {
  "voivodeship": "podkarpackie",
  "cases": 0
}, {
    "voivodeship": "podlaskie",
    "cases": 0
  },{
    "voivodeship": "pomorskie",
    "cases": 0
  },{
    "voivodeship": "śląskie",
    "cases": 0
  },{
    "voivodeship": "świętokrzyskie",
    "cases": 0
  },{
    "voivodeship": "warmińsko-mazurskie",
    "cases": 0
  },{
    "voivodeship": "wielkopolskie",
    "cases": 0
  },{
    "voivodeship": "zachodniopomorskie",
    "cases": 0
  },];

chart.legend = new am4charts.Legend();



function renderCovidDates() {
    for(piece of data) {
      if(piece['stan_rekordu_na'] && !datesAr.includes(piece['stan_rekordu_na'])) {
        // console.log(piece['stan_rekordu_na']);
        datesAr.push(piece['stan_rekordu_na']);
        const dateOption = document.createElement('option');
        dateOption.textContent = piece['stan_rekordu_na'];
        dateOption.value = piece['stan_rekordu_na'];
        covidDate.appendChild(dateOption);
        // console.log(dateOption);
      }
      
    }
    for(const el of headerData) {
        const infoOption = document.createElement('option');
        infoOption.textContent = el[1];
        infoOption.value = el[0];
        covidInfo.appendChild(infoOption);
    }
}

function renderChart() {
  let TitleText;

  // console.log(`${
    headerData.findIndex((el)=> {
    if(el.includes(covidInfo.value)) {
      titleText = el[1];
    }
  });
// }`);


  title.text = `${titleText ?? covidInfo.value} COVID-19 dnia: ${covidDate.value} - podział procentowy`;
  for(const el of data) {
    if(el.stan_rekordu_na === covidDate.value ) {
      // console.log(el.wojewodztwo, el.liczba_ozdrowiencow);
      for(const elData of chart.data) {
        if(elData.voivodeship === el.wojewodztwo) {
          elData.cases = el[`${covidInfo.value}`];
          // console.log(elData.voivodeship, elData.cases);
        }
      }
    }
  }
  chart.validateData();
}

searchBtn.addEventListener('click', renderChart);
renderCovidDates();
renderChart();


