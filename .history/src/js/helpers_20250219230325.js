// for functions used allover the project

import { API_URL } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // creating a race between ARRAY of 2 promises
    // shortcut circuit if fetch is taking too long.
    const res = await Promise.race([fetch(url), timeout(0.5)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // if (data.status === 'fail') throw new Error(`${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};
