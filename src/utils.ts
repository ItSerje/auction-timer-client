export const getFormattedMinutesAndSeconds = (time: number): string => {
  // let h = time / 3600;
  const hs = time % 3600;
  let m: number | string = parseInt((hs / 60).toString());
  let s: number | string = hs % 60;
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }

  // return { h, m, s };
  return `${m}:${s}`;
};

export const getUid = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get('uid');
  return uid;
};
