import { useEffect, useState } from 'react'
import axios from "axios";

import './App.css'
import { HomePage } from './HomePage'

const Api="38e1a92040f03400814a3a396b6180fe"
const url="https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric"


// async function CheckLocation(){
//   const resposne = await axios.get(url+`&appid=${Api}`)
//   console.log(resposne.data)
// }
// CheckLocation();

function App() {
  const[city,setCity] = useState("")
  const[temp,settemp] = useState();
  const[wind,setWind] =useState();
  const[humidity,setHumidity] =useState();
  const[weather,setWeather] = useState("");

  useEffect(()=>{
    const weather=async()=>{
      const response = await axios.get(`url+&appid=${Api}`);
      setCity(response.data.name)
      settemp(response.data.main.temp)
      setHumidity(response.data.main.humidity)
      setWind(response.data.wind.speed)
      setWeather(response.data.weather[0].main)
    }
  })

  return (
    <div>
    <HomePage></HomePage>
      
    </div>
  )
}

export default App
