const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DIAS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const format = (dateString) => {
  var date = new Date(dateString);

  return `${DIAS[date.getDay()]}, ${
    MESES[date.getMonth()]
  } ${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;
};
