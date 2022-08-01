import React, { useEffect, useState } from 'react';
import axios from 'axios';
import banner from '../images/banner.svg';

const Location = ({ searchLocation, name, type, dimension, population }) => {

    const [searchValue, setSearchValue] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);


    useEffect(() => {
        if (searchValue !== "") {
            axios.get(`https://rickandmortyapi.com/api/location/?name=${searchValue}`)
                .then(res => setLocationSuggestions(res.data.results.slice(0,5)))
        } else {
            setLocationSuggestions([])
        }
    }, [searchValue])

const clearInput = () => {
    setSearchValue("");
}

    return (
        <>
            <header>
                <img src={banner} alt="" />
                <input
                    type="text"
                    placeholder='Type any letter'
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <section>
                    {locationSuggestions?.map(location => (
                        <div onClick={() =>{ searchLocation(location), clearInput()}} key={location.name}><p>{location.name}</p></div>
                    ))}
                </section>
            </header>
            <main>
            <div className='location'>
                <h4>Name:</h4><p>{name}</p>
                <h4>Type:</h4><p>{type}</p>
                <h4>Dimension:</h4><p>{dimension}</p>
                <h4>Population:</h4><p>{population}</p>
            </div>
            </main>
        </>
    );
};

export default Location;