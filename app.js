const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Nombre de la ciudad para obtener clima',
        demand: true
    }
}).argv;

let getInfo = async(direccion) => {
    try {
        let coors = await lugar.getLugarLatLong(direccion);
        let temp = await clima.getClima(coors.lat, coors.long);

        return `el clima en: ${ direccion }, es de ${ temp }`;
    } catch (e) {
        return `no se pudo determinar el clima en ${ direccion }`
    }
}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));

// lugar.getLugarLatLong(argv.direccion)
//     .then(resp => {
//         console.log(resp);
//     })
//     .catch(e => {
//         console.log(e);
//     })

// clima.getClima(-33, -70)
//     .then(resp => {
//         console.log(resp);
//     })
//     .catch(e => {
//         console.log(e);
//     })