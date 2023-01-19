const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length - 1) + '...';
  } else {
    return str;
  }
};

export default truncate;
