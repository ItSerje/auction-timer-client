export const formatTimer = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};

export const getUid = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get('uid');
  return uid;
};
