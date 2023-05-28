const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bills', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    placeOfSupply: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    vendor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    billToAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    shipToAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false
    },
    poNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ""
    },
    supplierCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ""
    },
    Terms: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    DueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "0000-00-00"
    },
    gstInRupees: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0.00
    },
    totalPrice: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0.00
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
    tableName: 'bills',
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
