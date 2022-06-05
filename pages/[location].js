import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/Location.module.css';

const Location = () => {
  const router = useRouter();
  const { location } = router.query;
  const [data, setData] = useState({});
  const [time, setTime] = useState(Date.now());
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!location) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3de61fcb355b6ce8649c71c56a75dec0&units=metric&lang=pl`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setStatus(err.response.status);
      });
  }, [location, refresh]);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setRefresh(refresh + 1), 1800000);
    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return (
    <>
      {Object.keys(data).length > 0 && (
        <div className={styles.Wrapper}>
          <div className={styles.Left}>
            <Image src={`${data.weather[0].icon}@2x.png`} width={82} height={82} alt='icon' />
            <div className={styles.Time}>
              {new Date(time + ((data.timezone || 0) - 7200) * 1000).toLocaleTimeString('pl-PL', {
                timeStyle: 'short',
              })}
            </div>
          </div>
          <div className={styles.Info}>
            <div className={styles.Location}>{data.name}</div>
            <div className={styles.Temperature}>{Math.round(data.main.temp)}°C</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Location;
