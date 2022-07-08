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

    let name = residentData?.name
    let image = residentData.image
    let status = residentData.status
    let origin = residentData.origin?.name
    let episodes = residentData.episode?.length
    let specie = residentData.species

    const dotColor = (color) => {
        if (color == 'Dead') {
            return 'red';
        } else {
            return 'green'
        }
    }

    console.log(residentData)

    return (
        <div className='resident-card'>
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
        </div>
    );
};

export default Residents;