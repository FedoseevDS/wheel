import { useCallback, useEffect, useState } from "react";
import { useGetItemsQuery } from "../../store/requests";

import styles from './styles.module.scss';

export const Main = () => {
  const [pokemons, setPokemons] = useState([])
  const [details, setDetails] = useState(null)

  console.log('details', details);

  const { data=[] } = useGetItemsQuery({ pageSize: 2, page: 1 })

  // console.log('data', data);

  const LoadPokemons = useCallback(async () => {
    for (var i = 0; i < data?.results?.length; i++) {
      await fetch(data.results[i].url)
        .then((res) => res.json())
        .then((res) => {
          console.log('res', res);
          const pokemonInfo = {
            name: res.name,
            id: res.id,
            types: res.types,
            number: res.id,
            species: res.species.name,
            image:
              res.sprites.front_default,
          };
          setPokemons((prev) => [...prev, pokemonInfo])
        });
    }
  }, [data]);

  useEffect(() => {
      LoadPokemons();
  }, [LoadPokemons])

  // console.log('pokemons', pokemons);
  
  return (
    <div className={styles.wrapper}>
      <div>
        {pokemons.map(({ image, name, species }) => {
          return (
            <div key={name} className={styles.card} onClick={(v) => setDetails(!v)}>
              <div>
                <img src={image} alt='покемон' />
                <div>
                  <div>
                    <span>Название:</span>
                    <span>{name}</span>
                  </div>
                  <div>
                    <span>Специализация:</span>
                    <span>{species}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
        {details && <div>Проверка связи</div>}
    </div>
  )
}