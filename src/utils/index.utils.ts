
export const getSingleProductPath = (productId:string):string =>{
    return `/product/${productId}`;
  }

export const getFullDateFromIsostring = (isoDate:string) =>{
  const newDate = new Date(isoDate);
  if(!isoDate || !newDate){ return "" }
  return newDate.toLocaleDateString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric'})
}

