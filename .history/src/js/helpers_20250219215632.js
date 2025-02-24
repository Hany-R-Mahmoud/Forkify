// for functions used allover the project

import { API_URL } from './config';

export const getJSON = async function (url) {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  // if (data.status === 'fail') throw new Error(`${data.message}`);
};
