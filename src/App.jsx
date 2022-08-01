import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import Location from './components/Location';
import Residents from './components/Residents';




function App() {

  const [location, setLocation] = useState({});


  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1
    axios.get(`https://rickandmortyapi.com/api/location/${random}`)
      .then(res => setLocation(res.data))
      .catch((error) => console.log(error));
  }, []);

  const name = location?.name;
  const type = location?.type
  const dimension = location?.dimension
  const population = location?.residents?.length
  const residents = location?.residents


  const searchLocation = (location) => {
    setLocation(location)
  };

  const [page, setPage] = useState(1);


  const lastIndex = page * 5;
  const firstIndex = lastIndex - 5;
  const residentsPagination = residents?.slice(firstIndex, lastIndex)

  const numbers = [];

  let lastPage = Math.ceil(residents?.length / 5)
  let initialPage = page < 5 ? 1 : (page - 4)
  if (page < (lastPage - 5)) {
    if (page > 5) {
      lastPage = (page + 4)
    } else {
      lastPage = 9;
    }
  }

  for (let i = initialPage; i <= lastPage; i++) {
    numbers.push(i)
  }

  const active = (num) => {
    if (num == page)
      return "#062226"
  }
  const activeNum = (num) => {
    if (num == page)
      return "white"
  }

  const disableFButton = (p) => {
    if (p == 1) {
      return "start-button"
    } else {
      return "vaca "
    }
  }
  const enebleFButton = (p) => {
    if (p !== 1) {
      return "button"
    } else {
      return " vaca"
    }
  }
  const disableLButton = (p) => {
    if (p == lastPage) {
      return "finall-button"
    } else {
      return "vaca "
    }
  }

  const noResidents = (residentsLenght) =>{
    if(residentsLenght == 0){
      return "Hmm.. Seems to be empty this place!"
    }

  }

  return (
    <div className="App">
      <Location
        location={location}
        searchLocation={searchLocation}
        name={name}
        type={type}
        dimension={dimension}
        population={population}
      />
      {noResidents(population)}
      <aside className='residents-container'>
        {residentsPagination?.map(url => (
          <Residents residentsUrl={url} key={url} />
        ))}
      </aside>
      <footer>
        <button onClick={() => setPage(page - 1)}
          disabled={page == 1}
          id={disableFButton(page)}
          className={enebleFButton(page)}><i className="fa-solid fa-angles-left"></i></button>
        {
          numbers.map(number => (
            <button key={number} onClick={() => setPage(number)} style={{ background: active(number), color: activeNum(number) }}>{number}</button>
          ))
        }
        <button onClick={() => setPage(page + 1)}
          disabled={page == lastPage}
          id={disableLButton(page)}
          className="button"><i className="fa-solid fa-angles-right"></i></button>
      </footer>
    </div>

  )
}

export default App
