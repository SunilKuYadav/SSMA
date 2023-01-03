const getFormatedTimeByMiliSecond = (second: number) => {
  let mili: string | number = second % 10;

  let sec: string | number = Math.floor(Math.floor(second / 10) % 60);

  let min: string | number = Math.floor(Math.floor(second / 600) % 60);

  let hour: string | number = Math.floor(
    Math.floor(Math.floor(second / 600) / 60),
  );

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  return `${hour}:${min}:${sec}:${mili}`;
};

export {getFormatedTimeByMiliSecond};
