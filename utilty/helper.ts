export const getElapsedHMS = (timestamp: number) => {
  const elapsedSec = (Date.now() - timestamp * 1000) / 1000 || 0;

  const elapsedHour = Math.floor(elapsedSec / 3600);
  const elaspedMinute = Math.floor((elapsedSec % 3600) / 60);
  const elaspedSecond = Math.floor((elapsedSec % 3600) % 60);

  return `${elapsedHour}h : ${elaspedMinute}m : ${elaspedSecond}s`;
};
