import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Residents = ({ residentsUrl }) => {

    const [residentData, setResidentData] = useState({});

    useEffect(() => {
        axios.get(residentsUrl)
            .then(res => setResidentData(res.data))
    }, [])

    const name = residentData?.name
    const image = residentData.image
    const status = residentData.status
    const origin = residentData.origin?.name
    const episodes = residentData.episode?.length
    const specie = residentData.species

    const dotColor = (color) => {
        if (color == 'Dead') {
            return 'red';
        } if( color == 'Alive'){
            return 'yellowgreen'
        }else{
            return 'purple'
        }
    }


    console.log(residentData)

    return (
        <article className='resident-card'>
            <img src={image} alt="" />
            <div className='resident-info'>
                <h2>{name}</h2>
                <div className='status'>
                    <div className='dot' style={{ background: dotColor(status) }}></div>
                    <strong>{status} - {specie}</strong>
                </div>
                <small>origin</small>
                <p>{origin}</p>
                <small>episodes where apper</small>
                <p>{episodes}</p>
            </div>
        </article>
    );
};

export default Residents;