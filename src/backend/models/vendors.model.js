const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vendors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billToDoorNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billToCityPincode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    shipToDoorNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shipToCityPincode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    gstin: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'vendors',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
