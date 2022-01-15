export const convertIntWithCommas = (x:number | string): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const isFloatNumber = (n:number): boolean => {
  return Number(n) === n && n % 1 !== 0;
}