import React from 'react';
import useLocations from '../hooks/useLocations';
import { useState } from 'react';
import Residents from './Residents';
import axios from 'axios';

const Locations = () => {
    const {planet, type, dimension, population, residents, setPlaces} = useLocations();

    const[searchValue, setSearchValue] = useState(" ");

    const searchBtn = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${searchValue}`)
            .then(res => setPlaces(res.data));
    };
    return (
        <div>
            <div className='search-container'>
            <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <button onClick={searchBtn}><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div className='location'>
            <h2>{planet}</h2>
            <article className='locations-descriptions'>
            <p><span>type: </span>{type}</p>
            <p><span>dimansion: </span>{dimension}</p>
            <p><span>population: </span>{population}</p>
            </article>
            </div>
            <section className='residents-container'>
            {residents?.map( url =>(
                <Residents residentsUrl={url} key={url} />
            ))}
            </section>
        </div>
    );
};

export default Locations;