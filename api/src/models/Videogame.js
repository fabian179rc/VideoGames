const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4  // para poder generar id nuevos uuidv4( que no choquen con los ID de la api)
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.INTEGER
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

  },{ timestamps: false });
};


