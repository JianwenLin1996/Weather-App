<template>
  <div id="weather" class="container-fluid padding text-center" >
    <div class="input-group d-flex justify-content-center py-3">
      <div class="form-outline w-50">
        <input type="search" id="searchbox" class="form-control text-primary" placeholder="Search..." v-model="searchCity" @keypress.enter="getWeather"/>
      </div>
    </div>

    <div class="bottom-part h-75 d-lg-flex align-items-center justify-content-center ">
        <div id="information-display" class="p-5 m-5 h-50">
          <h1 id="country" class="my-3 font-weight-bold"> {{weatherInfo.city}},  {{weatherInfo.countryCode}} </h1>
          <h3 class="my-3 font-weight-light font-italic"> {{currentDateTime.currentDate}} ({{currentDateTime.currentDay}}) </h3>
          <h3 class="my-3  font-weight-light font-italic"> {{currentDateTime.currentTime}} </h3>
        </div>

        <div id="degree" class="p-5 m-5 text-light h-50 ">
          <h1 class="display-2 font-weight-bold"> {{weatherInfo.temp}} &#176;C</h1>
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'app',
  data () {
    return {
      size : {
        width : 0,
        height : 0
        },
      weatherInfo: {
        city: "Ipoh",
        countryCode: "MY",
        temp: "27.0",
      },
      currentDateTime: {
        currentDate: "",
        currentTime: "",
        currentDay: ""
      },
      searchCity: "Penang",
      apiKey : 'c0a78c42b6d00b5224c441b211033407',
      urlBase : 'https://api.openweathermap.org/data/2.5/',
      // remember add https at url base, else it will read back own index.html

      months: ["January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"],
      day: ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"],
    }
  },
  methods: {
    changeBg(temperature){
      console.log(temperature);
      if (temperature >= 25){
        $('#weather').removeClass('winter');
        $('#weather').removeClass('autumn');
        $('#weather').addClass('summer');
      }else if (temperature < 25 && temperature >= 15){
        $('#weather').removeClass('winter');
        $('#weather').removeClass('summer');
        $('#weather').addClass('autumn');
      }else {
        $('#weather').removeClass('summer');
        $('#weather').removeClass('autumn');
        $('#weather').addClass('winter');
      }
    },
    getWeather(){
      fetch(`${this.urlBase}weather?q=${this.searchCity}&units=metric&APPID=${this.apiKey}`)
        .then(res => {
          if (res.ok)
          return res.json(); //.json() and .text() are asynchronous, thus data need to be obtained using then()
          else
          return 0;
        }).then(data => {
          if (data){
          this.weatherInfo.city = data.name;
          this.weatherInfo.countryCode = data.sys.country;
          this.weatherInfo.temp = data.main.temp.toFixed(1);
          this.changeBg(data.main.temp);
          }else{
            alert("Can't find city");
          }
        }).catch(e=>{
          console.error(e);
        });

        this.searchCity = "";
    },
    getDateTime(){
      let currentDateTimeTemp = new Date();
      let currentHoursTemp = currentDateTimeTemp.getHours();

      this.currentDateTime.currentDate =  currentDateTimeTemp.getDate() + " " + this.months[currentDateTimeTemp.getMonth()+1] + " " + currentDateTimeTemp.getFullYear();

      this.currentDateTime.currentTime = `${currentHoursTemp>12 ? (currentHoursTemp-12).toString().padStart(2,'0'): currentHoursTemp.toString().padStart(2,'0')}:${currentDateTimeTemp.getMinutes().toString().padStart(2,'0')}:${currentDateTimeTemp.getSeconds().toString().padStart(2,'0')} ${currentHoursTemp>12 ? "PM": "AM"}`;

      this.currentDateTime.currentDay = this.day[currentDateTimeTemp.getDay()];
    },
  },
  created(){
    this.getWeather();
    this.getDateTime();
    // this.getDateTime();
  },
  mounted(){
    setInterval(()=>this.getDateTime(),1000);
    this.$nextTick(()=>{
        this.size.width = window.innerWidth;
        this.size.height = window.innerHeight;
      })
  }
}
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap");
  #weather {
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: overlay;
    height: 100vh;

    }

    #weather.summer {
    background-image: url('./assets/summer_bg.jpg'), linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
    }

    #weather.winter {
    background-image: url('./assets/winter_bg.jpg'), linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
    }

    #weather.autumn {
    background-image: url('./assets/autumn_bg.jpg'), linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
    }

    h1 {
      font-size: 4em;
    }

     h3 {
      font-size: 2em;
    }

  #country, #degree h1 {
    font-family: 'Sriracha',sans-serif;
      }

  #information-display{
    background-color: rgba(255, 228, 196, 0.5);
    border-radius: 5%;
    color: darkslateblue;
    }

  #degree{
    background-color: rgba(67, 83, 77, 0.5);
    border-radius: 5%;
    }

  #information-display, #degree{
    box-shadow: 3px 3px 5px grey;
  }

  #degree h1 { /* center value */
    position: relative;
    top: 50%;
    transform: translateY(-50%)
    }
</style>
