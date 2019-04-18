const request = require( 'request' );

const forecast = ( latitude, longitude, callback ) => {
    const url = `https://api.darksky.net/forecast/d8ea12e0cd5009817f2aace5a00b099e/${latitude},${longitude}`;

    request({ url, json: true }, ( error, { body } ) => {

        if ( error ) {
            callback( 'Unable to connect to weather service' );

        } else if ( body.error ) {
            callback( 'Unable to find location.' );

        } else {
            let temperature = body.currently.temperature;
            let chanceRain = body.currently.precipProbability;

            callback(undefined, body.daily.data[0].summary 
                + ` It is currently ${temperature} degrees out with a ${chanceRain}% chance of rain.`);

        }
    });
};

module.exports = forecast;