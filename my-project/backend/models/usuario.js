const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: false
});

module.exports = Usuario;
