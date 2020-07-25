module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wishlist', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      product_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      review_score: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wishlist')
  }
}
