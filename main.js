

// ** changeName start here

changeName();
function changeName() {
  let cityNameID = document.getElementById('autocomplete');
  let  cityName = cityNameID.value;
  let infoCityName = document.getElementById('infoCityName');
  let value = infoCityName.innerText;
  let urlFirst;
  if(cityName === '') {
    urlFirst = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=3783fa69d86d1c9f665bc262772a0ea9`;
   
 }else {
  urlFirst = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=3783fa69d86d1c9f665bc262772a0ea9`;

 }
 

 // ** api start here
 api(urlFirst);
  async function api(url) {
    
    let jsonMain = await fetch(url);
    
    let weatherInfo = await jsonMain.json();
    
  
    if (weatherInfo.name === undefined) {
      infoCityName.innerText = infoCityName.innerText;
    } else {
      const infoCityName = document.getElementById('infoCityName');
      infoCityName.innerText = weatherInfo.name;
    }
    
  
  // ** Change the Info Dynamically 
    const countryName = document.getElementById('countryName');
    countryName.innerText = weatherInfo.sys.country;
  
    const celcius = document.getElementById('celcius');
    celcius.innerText = weatherInfo.main.temp;
  
    const weatherType = document.getElementById('weatherType');
    weatherType.innerText = weatherInfo.weather[0].main
    //* Info End Here

    // ** Change the sunInfo Dynamically
    let sunRiseData = weatherInfo.sys.sunrise;
    let sunRise = new Date(sunRiseData * 1000);
    let sunSetData = weatherInfo.sys.sunset;
    let sunSet = new Date(sunSetData * 1000);
    let sunRiseId = document.getElementById('sunRiseId');
    sunRiseId.textContent = `${sunRise.getHours()}:${sunRise.getMinutes()}`;
    let sunSetId = document.getElementById('sunSetId');
    sunSetId.textContent = `${sunSet.getHours()}:${sunSet.getMinutes()}`;
    //* sunInfo End Here
  
    const windSpeed = document.getElementById('windCound');
    windSpeed.innerText = weatherInfo.wind.speed;
    
    let humidity = weatherInfo.main.humidity;
    humidityJs (humidity);

  }

  // ** api End here
 
// ** 2nd api 
  let urlSecond;
  if(cityName === '') {
    urlSecond = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=3783fa69d86d1c9f665bc262772a0ea9`;
   
 }else {
   urlSecond = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=3783fa69d86d1c9f665bc262772a0ea9`;

 }


 data(urlSecond);
  async function data(urlSecond){
    let fetchData = await fetch(urlSecond);
    let mainData = await fetchData.json();

    // ** Change Highest and Lowest Temperature Dynamically
    let list = mainData.list;
    let minTemp = list[0].main.temp_min;
    let maxTemp = list[0].main.temp_max;
    let hTemperature = document.getElementById('hTemperature');
    hTemperature.textContent = Math.ceil(maxTemp);
    let lTemperature = document.getElementById('lTemperature');
    lTemperature.textContent = Math.floor(minTemp);
    

    let listLnth = list.length;
    let date = [];
    let temp = [];
    let i,unixTime, dateData, tepmData;
    for(i = 0; listLnth > i; i++){
      unixTime = list[i].dt;
      mainDate = new Date(unixTime * 1000);
      dateData = `${mainDate.getDate()}/${mainDate.getMonth()},${mainDate.getHours()}:00`;
      date.push(dateData);
      tepmData = list[i].main.temp;
      temp.push(tepmData);
    }
  chartJs (date,temp);
  

  }
}

// ** changeName End here

// ** ChartJs start here

function chartJs (date,temp){
  
  let chartJs = document.getElementById('chartJs');
  chartJs.innerHTML = '<canvas id="myChart" width="300" height="200"></canvas>';

  var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [],
          datasets: [{
              label: 'Temperture',
              data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Temperature of 5 Days'
          }
        }
      },
    });

  myChart.data.datasets[0].data = temp;
  myChart.data.labels = date;
  myChart.update();


}

// ** ChartJs End here






// ** humidityJs Start here
  
 function humidityJs (humidity) {
  let humidityContainer = document.getElementById('humidityContainer');
  humidityContainer.innerHTML = '<div id="humidity"></div> ';

  var options = {
      chart: {
        height: 280,
        type: "radialBar",
      },
      
      series: [humidity],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450"
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Humidity"]
    };
    
    var chart = new ApexCharts(document.querySelector("#humidity"), options);
    
    chart.render();

}

// ** humidityJs End here


 let confiqIcon = document.querySelector('.confiqIcon');
  let cross = document.querySelector('.cross');
  let bar = document.querySelector('.bar');

const showNav = () => {
  confiqIcon.style.display = 'none';
  cross.style.display = 'block';
  bar.style.display = 'block';
}

const hideNav = () => {
  confiqIcon.style.display = 'block';
  cross.style.display = 'none';
  bar.style.display = 'none';
}




const hideIcon = () => {
  console.log('hi')
  if(window.innerWidth > 540) {
    confiqIcon.style.display = 'none';
    cross.style.display = 'none';
    bar.style.display = 'block';
  } else {
    confiqIcon.style.display = 'block';
    cross.style.display = 'none';
    bar.style.display = 'none';
  }
}

window.addEventListener('resize', hideIcon);
