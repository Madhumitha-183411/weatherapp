import './App.css'
import clear from "./assets/clear.png"
import cloudicon from "./assets/cloudicon.png"
import rainy from "./assets/rainy-day.png"
import windicon from "./assets/wind.png"
import snowfall from "./assets/snowfall.png"
import humidityicon from "./assets/humidity.png"
import dizzle from "./assets/weather.png"
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const Weatherdetails = ({icon,temp,city,country,lat,log,humidity,wind}) =>{
   return (
           <>
  <div className='image'>
      <img src={icon} alt="Image" width={"150px"} height={"150px"} />
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
  </div>

  <div className='data-container'>
    <div className='element'>
      <img className='icon' src={humidityicon} alt="humidity" height={"100px"} width={"100px"} />
      <div className='data'>
        <div className='humidity-percent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>

    <div className='element'>
      <img className='icon' src={windicon} alt="wind" height={"100px"} width={"100px"} />
      <div className='data'>
        <div className='wind-percent'>{wind}km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>
  </div>

  </>
        )
}


function App() {
  const [icon,seticon] = useState(snowfall)
  const [text,settext] = useState("Pondicherry")
  const [temp,settemp] = useState(0)
  const [city,setcity] = useState("")
  const [country,setcountry] = useState("")
  const [lat,setlat] = useState(0)
  const [log,setlog] = useState(0)
  const [humidity,sethumidity] = useState(0)
  const [wind,setwind] = useState(0)

  const [loading,setloading] = useState(false)
  const [citynotfound,setcitynotfound] = useState(false)
  const [error,seterror] = useState(null)
  const weathericonmap = {
    "01d":clear,
    "01n":clear,
    "02d":cloudicon,
    "02n":cloudicon,
    "03d":dizzle,
    "03n":dizzle,
    "04d":dizzle,
    "04d":dizzle,
    "09d":rainy,
    "09n":rainy,
    "10d":rainy,
    "10n":rainy,
    "13d":snowfall,
    "13n":snowfall
  }
  const Search = async ()=>{
    setloading(true)
  let api_key="3d158504a954ef3d9283128dd91457eb";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

  try {
        let res = await fetch(url)
        let data = await res.json()
        if(data.cod === "404"){
          console.log("city not found")
          setcitynotfound(true)
          setloading(false)
          return;
        }
        sethumidity(data.main.humidity)
        setwind(data.wind.speed)
        settemp(Math.floor(data.main.temp))
        setcity(data.name)
        setcountry(data.sys.country)
        setlat(data.coord.lat)
        setcitynotfound(false)
        setlog(data.coord.lon)
        const weathericoncode = data.weather[0].icon
        seticon(weathericonmap[weathericoncode] || clear)

  } catch (error) {
      console.log("An error occured",error.message)
      seterror("An error occured while fetching weather data")
  }finally{
    setloading(false)
  }
}

const handlecity = (e)=>{
      settext(e.target.value)
}

const hanlekeydown=(e)=>{
    if(e.key === "Enter"){
      Search();
    }
}

useEffect(()=>{
       Search()
},[])

  return (
    
        <div className='container'>
          <div className='input-container'> 
            <input value={text}
            onKeyDown={hanlekeydown}
              onChange={handlecity}
              className='city-input' 
              type="text" 
              placeholder='Search City'/><span style={{paddingRight:"5px"}} onClick={()=>Search()}><SearchOutlined /></span>
          </div>
          {!loading && !citynotfound && <Weatherdetails icon={icon} temp={temp} city={city}
           country={country} lat={lat} log={log} humidity={humidity}
            wind={wind}/>}
            {loading && <div className='loading-message'>Loading...</div>}
            {error && <div className='error-message'>{error}</div>}
            {citynotfound && <div className='city-not-found'>City not found</div>}
            <p className='copyright'>
              Designed by <span >Madhumitha</span>
            </p>
        </div>
   
  )
}

export default App
