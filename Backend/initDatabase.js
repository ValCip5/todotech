const sequelize = require('./database');

async function initDatabase() {
  const Product = require('./models/Product');
  const Purchase = require('./models/Purchase');
  const Category = require('./models/Category');
  const User = require('./models/User');
  const Comment = require('./models/Comment');
  const ProductRecommendation = require('./models/ProductRecommendation');

  // Associations

  Comment.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(Comment, {
    as: 'comments',
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
  });
  
  Comment.belongsTo(Product, {
    as: 'product',
    foreignKey: {
      name: 'productId',
      allowNull: false
    }
  });

  Product.hasMany(Comment, {
    as: 'comments',
    foreignKey: {
      name: 'productId',
      allowNull: false
    }
  });
  
  Product.belongsTo(Category, {
    as: 'category'    
  });

  Category.hasMany(Product, {
    foreignKey: {
      name: 'categoryId',
      allowNull: false
    }
  });

  Purchase.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(Purchase, {
    as: 'purchases',
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
  });

  Purchase.belongsTo(Product, {
    as: 'product'
  });

  Product.hasMany(Purchase, {
    foreignKey: {
      name: 'productId',
      allowNull: false
    }
  });

  ProductRecommendation.belongsTo(Product, {
    as: 'product'
  });

  Product.hasMany(ProductRecommendation, {
    foreignKey: {
      name: 'productId',
      allowNull: false
    }
  });

  ProductRecommendation.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(ProductRecommendation, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
  });

  // ------------

  await sequelize.sync({ force: true });

  await User.bulkCreate([{
    username: 'admin',
    name: 'Admin',
    surname: 'Admin',
    email: 'admin@gmail.com',
    password: '$2b$10$TYP8VkJDZOJZx4tlRhEHb.08CvuM6J/sZ0pgBlpUrvIxiAIQbHDdO',
    isAdmin: true
  }, {
    username: 'comun',
    name: 'Valentin',
    surname: 'Cipriano',
    email: 'comun@gmail.com',
    password: '$2b$10$TYP8VkJDZOJZx4tlRhEHb.08CvuM6J/sZ0pgBlpUrvIxiAIQbHDdO',
    isAdmin: false
  }])

  await Category.bulkCreate([{
    name: 'Sonido'
  }, {
    name: 'Teclados'
  }])

  await Product.bulkCreate([{
    name: 'Auriculares RedDragon',
    description: 'Muy piolas',
    price: 5999.99,
    categoryId: 1,
    image: 'https://www.infopartes.com.ar/18723-thickbox_default/auriculares-gamer-redragon-pelops-h818-71-inalambrico-pcps4.jpg'
  }, {
    name: 'Teclado gamer Noga',
    description: 'Re villeros para ser verdat',
    price: 8500,
    categoryId: 2,
    image: 'https://sistema.langtecnologia.com.ar/img/qloud/4817/5151_1.jpg'
  }])

  await Comment.bulkCreate([{
    text: 'Una cagada estos reddragon la verdd, me cago en toda la reputisima madre qu elo parÍOOOOO',
    productId: 1,
    userId: 2
  }, {
    text: 'JAJjajajajajaaaaaaaaaaaaaaajajajajajaja wtf nah cachi',
    productId: 1,
    userId: 2
  }, {
    text: 'Todos putinguis',
    productId: 2,
    userId: 2
  }])

}

module.exports = initDatabase;