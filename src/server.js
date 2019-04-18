const path          = require( 'path' );
const express       = require( 'express' );
const hbs           = require( 'hbs' );

const geocode       = require('./utils/geocode.js');
const forecast      = require('./utils/forecast.js');

const app           = express();
const port          = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join( __dirname, '../templates/partials');

// setup handlebars engine and views location
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );
hbs.registerPartials( partialsPath );

// static directory to serve
app.use( express.static( publicDirPath ));

app.get( '/', ( req, res ) => {
    res.render( 'index', {
        title: 'Weather App',
        creator: 'Johnny Vineyard'
    });
});

app.get( '/about', ( req, res ) => {
    res.render( 'about', {
        title: "About",
        creator: 'Johnny Vineyard'
    });
});

app.get( '/help', ( req, res ) => {
    res.render( 'help', {
        title: 'Help',
        message: 'How can I assist you?',
        creator: 'Johnny Vineyard'
    });
});

app.get( '/weather', ( req, res ) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    // add default value for destructuring so code works without object
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({ location, forecastData });
        });
    });
});

app.get( '/help/*', ( req, res ) => {
    res.render( '404', {
        title: '404',
        creator: 'Johnny Vineyard',
        error: 'Help page not found.'
    });
});

app.get( '*', ( req, res ) => {
    res.render( '404', {
        title: '404',
        creator: 'Johnny Vineyard',
        error: 'Page not found.'
    });
});

app.listen( port, () => {
    console.log( `Server running on port ${port}.`);
});