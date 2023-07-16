const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
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
    },
    supplierCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    terms: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    totalGstAmount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    totalAmount: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    grandTotal: {
      type: DataTypes.DOUBLE(12, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    isIGST: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    },
    version: {
      type: DataTypes.TINYINT(3),
      defaultValue: 1
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: false
    },
    isActive: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
    isDeleted: {
      type: DataTypes.DOUBLE(12, 2),
      defaultValue: 0
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
