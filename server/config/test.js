const promise = new Promise((res, rej) => {
  res("a");
});

await promise;
