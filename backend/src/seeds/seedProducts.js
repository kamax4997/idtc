const mongoose = require('mongoose');

const productsMockData = [
  {
    name: 'Boss Revolution',
    description: 'Enjoy cheap calls to more than 200 countries and send international mobile top-ups to your friends and family back home.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bossrevolutionlogo.svg',
    overall: 4,
    link: 'https://bossrevolution.com',
  },
  {
    name: 'Boss Wireless',
    description: 'Flexible talk, text, and data plans for big savings. Get the best value on domestic and international calling.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/bosswirelesslogo.svg',
    overall: 5,
    link: 'https://bosswireless.com',
  },
  {
    name: 'Idt Global',
    description: 'Leading provider of international voice and SMS termination and strategic outsource partnerships for fixed and mobile operators globally.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/idtgloballogo.svg',
    overall: 2,
    link: 'https://idtglobal.com',
  },
  {
    name: 'Idt Express',
    description: 'IDT Express is a market leader in global Voice & DIDs servicing UCaaS, CPaaS, CCaaS and other industry segments.',
    img: 'https://cdn.bossrevolution.com/cms-content/idt_net/images/new/idtexpresslogo.svg',
    overall: 3,
    link: 'https://idtexpress.com',
  },
]

const ReviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  content: { type: String },
  rating: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
  overall: { type: Number, required: true },
  link: { type: String },
  reviews: [ReviewSchema]
});

const connectDB = () => {
  mongoose.connect(
    'mongodb+srv://baymax:1226@cluster0.u1cyj.mongodb.net/idt-test?retryWrites=true&w=majority',
    {
      dbName: 'idt-test',
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    }
  ).then(
    async () => {
      console.log('DB connected!');
      const Product = mongoose.model('Product', ProductSchema);
      const Review = mongoose.model('Review', ReviewSchema);
      const productCollection = Product.collection;
      const reviewCollection = Review.collection;

      // Destroys all data from a collection
      await productCollection.drop();
      await reviewCollection.drop();

      await productCollection.insertMany(productsMockData);

      // Close the connection
      await mongoose.disconnect();
      console.log("DB disconnected!");

      process.exit();
    },
    (err) => {
      if (err) {
        console.log('Mongoose connection error:', err, 'Retrying to connect...');
        setTimeout(connectDB, 5000);
      }
    },
  )
};

connectDB();
