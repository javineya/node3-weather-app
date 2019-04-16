const request = require( 'request' );

const geocode = ( address, callback ) => {
    const token = "pk.eyJ1IjoiamF2aW5leWEiLCJhIjoiY2p0Y2U3Y3RqMGp0YjQ0cWp6Mnd5b29xOCJ9.ygHxEysGuftueVJHwZqkHw";
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
        + address + ".json?access_token=" + token + "&limit=1";

    request({ url, json: true }, ( error, { body }) => {
        if ( error ) {
            callback( 'Unable to connect to location services.' );
        } else if ( body.features.length === 0 ) {
            callback( 'Unable to find location. Try another search.' );
        } else {
            callback( undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;