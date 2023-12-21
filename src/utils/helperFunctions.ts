export const isObjectInArray = (arr: any, obj: any) => {
  return arr.find((el: any) => el.phone === obj.phone) !== undefined;
};

export const findObjectInArray = (arr: any, obj: any) => {
  return arr.find((el: any) => el.phone === obj.phone);
};
