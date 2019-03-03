const axios = require('axios');

const getLugarLatLong = async(direccion) => {
    let encodedUrl = encodeURI(direccion);
    let resp = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=SRCaPl9UMYKYIzOZ3zho&app_code=4ECA0G__vSmKYS0P9GNiuA&searchtext=${ encodedUrl}`)

    if (resp.data.Response.View[0] === undefined) {
        throw new Error(`No hay resultados para la ciudad: ${ direccion }`);
    }

    let location = resp.data.Response.View[0].Result[0].Location.Address.Label
    let latitude = resp.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
    let longitude = resp.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude

    return {
        direccion: location,
        lat: latitude,
        long: longitude
    }
}

module.exports = {
    getLugarLatLong
}