import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useLocations = () => {

    const[places, setPlaces] = useState({})
    

    useEffect(() =>{
        const random = Math.floor(Math.random() * 126) + 1
        axios.get(`https://rickandmortyapi.com/api/location/${random}`)
        .then(res => setPlaces(res.data))
    },[])

    let planet = places?.name;
    let type = places?.type
    let dimension = places?.dimension
    let population = places?.residents?.length
    let residents = places?.residents

  



    return {planet, type, dimension, population, residents, setPlaces}
};

export default useLocations;