import React,{useState} from 'react'
import './App.css'

function App() {

  const api ={
    key: "3a7ceb28b0008d0170f2c2ba60e19727",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query,Setquery] = useState('')
  const [weather,Setweather] = useState({})

  const search = event => {
    if(event.key === "Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        Setweather(result)
        Setquery('')
        // console.log(result)
        
      } )
    }
  }

  const dateBuilder = d => {

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()

    return `${day}, ${date} ${month} ${year}`

  }

  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      
      <main>
        
        <div className='searchbox'>
          
          <input 
              type="text"
              className="searchbar"
              placeholder="Search..." 
              onChange={e => Setquery(e.target.value)}
              value={query}
              onKeyPress={search}
          />

        </div>

        {(typeof weather.main != "undefined") ? 
        (<div>

          <div className="locationbox">

            <div className="location"><h2>{weather.name}, {weather.sys.country}</h2></div>
            
            <div className="date"><h2>{dateBuilder(new Date())}</h2></div>
          
          </div>

          <div className="weatherbox">

            <div className="temp"><h3>{Math.round(weather.main.temp)}° C</h3></div>
            <div className="weather"><h2>{weather.weather[0].main}</h2></div>

          </div>
          
        </div>
        ) : ('')}
      
      </main>
    
    </div>
  );
}

export default App;
