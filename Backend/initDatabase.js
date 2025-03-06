const sequelize = require('./database');

async function initDatabase() {
  const Product = require('./models/Product');
  const Category = require('./models/Category');
  const User = require('./models/User');
  const Comment = require('./models/Comment');
  const ProductLike = require('./models/ProductLike');

  // Associations

  Comment.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(Comment, {
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

  Product.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(Product, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
  });

  ProductLike.belongsTo(Product, {
    as: 'product'
  });

  Product.hasMany(ProductLike, {
    foreignKey: {
      name: 'productId',
      allowNull: false
    }
  });

  ProductLike.belongsTo(User, {
    as: 'user'
  });

  User.hasMany(ProductLike, {
    foreignKey: {
      name: 'userId',
      allowNull: false
    }
  });

  // ------------

  await sequelize.sync({ force: true });

  await User.bulkCreate([{
    username: 'admin',
    email: 'admin@gmail.com',
    password: '$2b$10$TYP8VkJDZOJZx4tlRhEHb.08CvuM6J/sZ0pgBlpUrvIxiAIQbHDdO',
    isAdmin: true
  }, {
    username: 'comun',
    email: 'comun@gmail.com',
    password: '$2b$10$TYP8VkJDZOJZx4tlRhEHb.08CvuM6J/sZ0pgBlpUrvIxiAIQbHDdO',
    isAdmin: false
  }])

  await Category.bulkCreate([{
    name: 'Sonido',
    description: 'Artículos de entrada/salida de sonido'
  }, {
    name: 'Teclados',
    description: 'Teclados de todo tipo, facheros, feitos, maleducados, etc.'
  }])

  await Product.bulkCreate([{
    name: 'Auriculares Red Dragon',
    description: 'Muy piolas',
    price: 5999.99,
    categoryId: 1,
    userId: 2
  }, {
    name: 'Teclado gamer Noga',
    description: 'Re villeros para ser verdat',
    price: 8500,
    categoryId: 2,
    userId: 2
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