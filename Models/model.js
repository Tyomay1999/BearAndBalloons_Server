const sequelize = require( '../db' )
const { INTEGER, STRING } = require( "sequelize" );

// { id: 'me', time: '30-12-2022 || 23:36:20' }
const Customer_info = sequelize.define( 'customer_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: STRING, allowNull: false },
    time: { type: STRING, allowNull: false },
} )

module.exports = {
    Customer_info
}