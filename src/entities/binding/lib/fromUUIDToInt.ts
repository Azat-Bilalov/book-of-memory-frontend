export const fromUUIDToInt = (id: string): number => {
  const bn = BigInt(`0x${id.replace(/-/g, "")}`);
  // в четырех значное число
  const str = bn.toString();
  return Number(str.slice(0, 4));
};
