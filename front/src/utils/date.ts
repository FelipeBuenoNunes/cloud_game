function adicionaZero(numero){
  if (numero <= 9)
      return "0" + numero;
  else
      return numero;
}

export function parseDate(date_raw: string){
  const data = new Date(date_raw);
  return (adicionaZero(data.getDate() )) + '/' + adicionaZero((data.getMonth() + 1)) + '/' + adicionaZero(data.getFullYear());
}
