require( "dotenv" ).config()
const express = require( "express" )
const app = express()
const { ServiceUtils } = require( "./Services/serviceUtils" )
const sequelize = require( './db' )
const cors = require( "cors" )
const path = require( "path" );
const { Customer_info } = require( "./Models/model" );
const PORT = ServiceUtils.getPort()
const HOST = ServiceUtils.getHost()


app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

app.post( '/user', async ( req, res ) => {
    try {
        const date = new Date()
        console.log( {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            minute: date.getMinutes(),
            seconds: date.getSeconds()
        } )
        const user_info = {
            text: req.body.id,
            time: `${ date.getDate() }-${ date.getMonth() + 1 }-${ date.getFullYear() } || ${ date.getHours() + 1 }:${ date.getMinutes() }:${ date.getSeconds() }`
        }
        console.log( "<------user_info", user_info, "<------user_info" )
        const add_new_text = await Customer_info.create( {
            text: user_info.text,
            time: user_info.time
        } )
        console.log( add_new_text )
        return res.status( 201 ).json( { message: "success" } )
    } catch ( error ) {
        throw error
    }
} )
app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, '/index.html' ) );
} );
app.post( "/hunter", async ( req, res ) => {
    const key = process.env.HUNTER_KEY
    try {
        if ( key === req.body.key ) {
            const all_info = await Customer_info.findAll()
            return res.status( 201 ).json( { message: all_info } )
        }
            return res.status( 201 ).json( { message: "Wrong password" } )
    } catch ( error ) {
        throw error
    }
} )

// app.listen(PORT, () => {
//     console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
// })

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen( PORT, () => console.log( `Server has been started in ${ PORT }...` ) )
    } catch ( error ) {
        console.log( error )
    }
}

start()