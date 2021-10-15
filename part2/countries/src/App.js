import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowInfo = ({ country }) => {
    const [weatherForCity, setWeatherForCity] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeatherForCity(response.data)
            })
    }, [country, api_key])

    const showWeather = () => {
        if (Object.keys(weatherForCity).length !== 0) {
            return (
                <div>
                    <p><b>temperature</b> {weatherForCity.main.temp}</p>
                    <p><b>wind</b> {weatherForCity.wind.speed}</p>
                </div>
            )
        }

    }


    return (
        <div>
            <h1> {country.name} </h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2> languages </h2>
            <ul>
                {country.languages.map(lang =>
                    <li key={lang.name}>  {lang.name} </li>
                )}
            </ul>

            <p><img src={country.flags.svg} width="10%" height="10%" alt="" /> </p>

            <h2> Weather in {country.capital} </h2>
            {showWeather()}


        </div>
    )
}






const ListOfCountries = (props) => {
    const [showView, setShowView] = useState({})


    const countriesToShow = () => props.countries.filter(c => c.name.toUpperCase().includes(props.query.toUpperCase()))



    const handleButton = (country) => {
        const currentCountry = country.name
        const newShowView = {
            ...showView
        }

        newShowView[currentCountry] = !showView[currentCountry]

        setShowView(newShowView)




    }

    const showAddInfo = (country) => {
        if (showView[country.name]) {
            return <ShowInfo country={country} />
        }

    }



    if (countriesToShow().length > 10) {
        return "Too many matches, specify another filter"
    } else if (countriesToShow().length === 1) {
        return (
            <ShowInfo country={countriesToShow()[0]} />
        )
    } else {
        return countriesToShow().map((country) =>

            <li key={country.name}>{country.name} {<button onClick={() => handleButton(country)}> {showView[country.name] ? "hide" : "show"}  </button>}
                {showAddInfo(country)}

            </li>)

    }



}







const App = () => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState("")

    useEffect(() => {
        axios
            .get('https://restcountries.com/v2/all')
            .then(response => {
                setCountries(response.data)


            })
    }, [])

    const handleQuery = (event) => {
        setQuery(event.target.value)
    }


    return (
        <div>
            {<input value={query} onChange={handleQuery} />}

            <ul>
                <ListOfCountries countries={countries} query={query} />

            </ul>
        </div>

    )
}

export default App;
