module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review_score: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {})

  return Product
}
