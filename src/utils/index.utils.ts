
export const getSingleProductPath = (productId:string):string =>{
    return `/product/${productId}`;
  }

export const getFullDateFromIsostring = (isoDate:string) =>{
  const newDate = new Date(isoDate);
  return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`
}