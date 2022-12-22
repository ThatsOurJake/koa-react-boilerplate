import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Main = () => {
  const [data, setData] = useState({});

  const fetch = async () => {
    const { data } = await axios.get('/api/ping');
    setData(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <p>Hello World</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Main;
