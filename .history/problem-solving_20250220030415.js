// const promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
// const promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
export const addTwoPromises = async function (promise1, promise2) {
  try {
    // // promise1 = new Promise(resolve => setTimeout(() => resolve(num1), 20)).
    // // // const data1 = await promise1.json();
    // // promise2 = new Promise(resolve => setTimeout(() => resolve(num2), 20));
    // // const data2 = await promise1.json();
    // const data1 = await promise1.then(data => data);
    // const data2 = await promise2.then(data => data);
    // return data1 + data2;
    // console.log(data1);
    // console.log(data2);
    return Promise.all([promise1, promise2]).then(
      ([res1, res2]) => res1 + res2
    );
  } catch (err) {
    console.log(Error(err));
  }
};

addTwoPromises(Promise.resolve(10), Promise.resolve(2)).then(console.log); // 4
