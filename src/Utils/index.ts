/***
 * 返回start到end之间的随机数（左闭右开区间）
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (start + (end - start)));
};
