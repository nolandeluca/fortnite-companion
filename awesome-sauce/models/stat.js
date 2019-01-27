module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define("Stat", {
    userid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    kills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    matchesplayed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    kd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    loginid: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gamemode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Stat;
};
