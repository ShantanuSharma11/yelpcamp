const mongoose=require('mongoose');
const cities=require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});
const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 10);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
        //     //YOUR USER IDdb
            // author: '5f5c330c2cd79d538f2c66d9',
            author:'622ad426afb3912dab3078d4',

            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image:'https://source.unsplash.com/collection/483251',
            description: 'lorem lorem lorem lorem lorem',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
              {  
                url: 'https://res.cloudinary.com/yelpcamp1234/image/upload/v1654225271/YelpCamp/eglm0k4dplub1ztvk6v9.jpg',
                filename: 'yelpcamp2/zuyd6kpsn8ijrq1cbuwh'
               },
              {
                url: 'https://res.cloudinary.com/yelpcamp1234/image/upload/v1654225271/YelpCamp/eglm0k4dplub1ztvk6v9.jpg',
                filename: 'yelpcamp2/gks21w3j3iouo4k8htvi'
              }
            ]
        })
        await camp.save();
    }
   
    
}
seedDB().then(() => {
    mongoose.connection.close();
})