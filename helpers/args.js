const getArgs = (args) => {
  const [_, __, ...rest] = args;

  const res = {};

  rest.forEach((i, idx, array) => {
    if (i.charAt(0) === "-") {
      if (idx === array.length - 1) {
        res[i.substr(1)] = true;
      } else if (array[idx + 1].charAt(0) !== "-") {
        res[i.substr(1)] = array[idx + 1];
      } else {
        res[i.substr(1)] = true;
      }
    }
  });

  return res;
};
export { getArgs };
