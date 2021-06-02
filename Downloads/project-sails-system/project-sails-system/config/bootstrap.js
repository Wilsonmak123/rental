/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  if (await Person.count() > 0) {
    return;
  }

  await Person.createEach([
    {
      title: '酒店式靚裝，有泳池會所',
      estate:'Festival City',
      area: 700,
      rent: 18000,
      bedrooms: 3,
      tenants: 4,
      URL: 'https://img.rea-asia.com/hk-squarefoot/750x434-fit/y0lf1061e60f-9387-461b-955b-ad8346508a5c_1600x900.jpeg',
      highlighted:'Highlighted',
       } ,

    {
      title: '2房實用，交通方便',
      estate: 'Tin Ma Court',
      area: 550 ,
      rent: 12000,
      bedrooms: 2,
      tenants: 3,
      URL: 'http://www.home2.com.hk/interior-design/images/design_case/medium/4741/1538019340-a2de383775.jpg',
      highlighted: 'Highlighted',
    },
       {
      title: '沙田第一城 套3房剛翻新',
      estate: 'City One Shatin',
      area: 900,
      rent: 25000,
      bedrooms: 3,
      tenants: 5,
      URL: 'https://www.spaceplan.com.hk/getimage/index/action/admin/width/1200/name/5963551612d41.jpg',
      highlighted: 'Highlighted',
       },

       {
      title: '平絕同區',
      estate: 'Festival City',
      area: 700,
      rent: 15000,
      bedrooms: 3,
      tenants: 4,
      URL: 'http://www.ghg.com.hk/wp-content/uploads/festival_city2.jpg',
      highlighted: 'Highlighted',
       }

    // etc.
  ]);
    
 

  if (await User.count() == 0) {

    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([
      { username: "systemAdmin", role:"admin", password: hash },
      { username: "Jay", role: "client", password: hash }
      // etc.
    ]);

  }

  return;
  
};
