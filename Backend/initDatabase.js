const sequelize = require('./database');

async function initDatabase(reset = false) {
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

  if (reset) {
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
    }, {
      username: 'camila',
      name: 'Camila',
      surname: 'Marcos',
      email: 'camila@gmail.com',
      password: '$2a$12$2sHJcaGIittCy11PHn0J1.9nj8IGwVgX6cNMh6Ob6Qtg.9oWVxKee',
      isAdmin: false
    }])
  
    await Category.bulkCreate([{
      name: 'Audio'
    }, {
      name: 'Celulares'
    }, {
      name: 'Notebooks'
    }, {
      name: 'Heladeras y Freezers'
    }, {
      name: 'Lavado'
    }, {
      name:'Televisores'
    }, {
      name: 'Climatización'
    }, {
      name: 'Tablets'
    }
  ])
  
    await Product.bulkCreate([{
      name: 'Auriculares RedDragon',
      description: 'Estos auriculares son muy buenos, se escuchan muy pero muy bien de verdad.',
      price: 100000,
      categoryId: 1,
      image: 'https://www.infopartes.com.ar/18723-thickbox_default/auriculares-gamer-redragon-pelops-h818-71-inalambrico-pcps4.jpg'
    }, {
      name: 'Samsung Galaxy A35 5G 256GB Negro',
      description: 'El Galaxy A35 5G cuenta con una pantalla Super AMOLED de 6.6 pulgadas con resolución Full HD+ (1080 × 2340 píxeles) y una tasa de refresco de 120 Hz, lo que proporciona una experiencia visual fluida y vibrante. El diseño incluye un frontal de vidrio Gorilla Glass Victus+, una parte trasera de vidrio y un marco de plástico. Además, posee certificación IP67, lo que lo hace resistente al polvo y al agua hasta 1 metro de profundidad durante 30 minutos.',
      price: 800000,
      categoryId: 2,
      image: 'https://sistema.langtecnologia.com.ar/img/qloud/4817/5151_1.jpg'
    }, {
      name: 'Notebook Lenovo 15.6 Pulgadas Intel Core i3 8 GB RAM 256 SSD',
      description: 'Equipado con un procesador Intel Core i3 de octava generación, 8 GB de RAM DDR4 y un SSD de 256 GB, el S540 proporciona un rendimiento fluido en tareas diarias como navegación web, procesamiento de textos y consumo de multimedia. El SSD mejora los tiempos de arranque y la rapidez en la apertura de aplicaciones.',
      price: 600000,
      categoryId: 3,
      image: 'https://http2.mlstatic.com/D_NQ_NP_2X_665725-MLA78557967468_082024-F.webp'
    }, {
      name: 'Heladera Sigma 2F1200BA 239 Litros',
      description: 'La Heladera Sigma 2F1200BA es un electrodoméstico eficiente y funcional, ideal para hogares que buscan optimizar el espacio sin sacrificar capacidad. A continuación, se detallan sus principales características.',
      price: 600000,
      categoryId: 4,
      image: 'https://www.tiendaclic.com.ar/81498315/heladera-sigma-2f1200ba-239l.jpg'
    }, {
      name: 'Lavarropas Carga Frontal Inverter Whirlpool 8kg 1200 RPM',
      description: 'El Lavarropas Whirlpool WNQ80AB es un electrodoméstico de carga frontal que combina eficiencia y tecnología avanzada para ofrecer un lavado óptimo.',
      price: 950000,
      categoryId: 5,
      image: 'https://tse1.mm.bing.net/th?id=OIP.GKXqxbj83y6rtT6Nl645qwHaHa&w=474&h=474&c=7'
    }, {
      name: 'Smart TV UHD 4K Samsung 65 Pulgadas',
      description: 'Samsung ofrece una variedad de televisores Smart TV UHD 4K de 65 pulgadas que combinan tecnología avanzada y diseño elegante. A continuación, se destacan algunos modelos disponibles en el mercado argentino',
      price: 1000000,
      categoryId: 6,
      image: 'https://tse3.mm.bing.net/th?id=OIP.o87Eg03YT-Kj7oVPXId5KQHaF7&w=379&h=379&c=7'
    }, {
      name: 'Aire Acondicionado Inverter Admiral 2300F 2700W',
      description: 'El Aire Acondicionado Inverter Admiral AD09AGINV es una opción eficiente y versátil para climatizar espacios de tamaño pequeño a mediano.',
      price: 780000,
      categoryId: 7,
      image: 'https://images.fravega.com/f1000/94a4d4496c1fad0a52fb6733e60ded72.jpg'
    }, {
      name: 'Tablet Philco 4GB RAM 64GB HDD',
      description: 'Este modelo es ideal para quienes buscan una tablet compacta y funcional para tareas básicas como navegación web, lectura y uso de aplicaciones ligeras.',
      price: 160000,
      categoryId: 8,
      image: 'https://www.megatone.net/images/Articulos/zoom2x/249/MKT0880PIL-2.jpg'
    }])
  
    await Comment.bulkCreate([{
      text: 'Me pareció algo bastante loco este auricular, me recuerda a mis viejos auris, buenos tiempos.',
      productId: 1,
      userId: 2
    }, {
      text: 'Este celu es re flama pero mal, comprenlo',
      productId: 2,
      userId: 2
    }, {
      text: 'Con esta compu finalmente me puedo poner las pilas para aprender a programar',
      productId: 3,
      userId: 3
    }])
  }


}

module.exports = initDatabase;