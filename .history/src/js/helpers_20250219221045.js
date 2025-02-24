// for functions used allover the project

import { API_URL } from './config';

export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // if (data.status === 'fail') throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};
