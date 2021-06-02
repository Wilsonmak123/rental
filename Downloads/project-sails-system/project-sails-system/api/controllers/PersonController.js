/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - home
  index: async function (req, res) {
 var models = await Person.find({ highlighted: 'Highlighted' }).limit(4);

  //  var models = await Person.find();

    return res.view('person/index', { persons: models});

  },

    // action - create
  create: async function (req, res) {

    if (req.method == "GET")
      return res.view('person/create');

   // if (!req.body.Person)
    if (typeof req.body.Person === "undefined")
      return res.badRequest("Form-data not received.");
    if (!req.body.Person.highlighted) req.body.Person.highlighted = "Not highlighted";
    await Person.create(req.body.Person);
    return res.ok("Successfully created!");
 
  },
  // json function
  json: async function (req, res) {

    var persons = await Person.find();

    return res.json(persons);
  },

  // action - index
  admin: async function (req, res) {

    var models = await Person.find();
   return res.view('person/admin', { persons: models });

  },

  // action - view
  view: async function (req, res) {

    var models = await Person.findOne(req.params.id);

    if (!models) return res.notFound();

    return res.view('person/view', { persons: models });


  },

  // action - delete 
  delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var models = await Person.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    if (req.wantsJSON) {
      return res.json({ message: "Detail deleted.", url: '/person/admin' });    // for ajax request
      
    } else {
      return res.redirect('/person/admin');           // for normal request
    }

  },

  update: async function (req, res) {

    if (req.method == "GET") {

      var model = await Person.findOne(req.params.id);

      if (!model) return res.notFound();

      return res.view('person/update', { person: model });

    } else {

      if (!req.body.Person)
        return res.badRequest("Form-data not received.");

      var models = await Person.update(req.params.id).set({
        title: req.body.Person.title,
        estate: req.body.Person.estate,
        area: req.body.Person.area,
        rent: req.body.Person.rent,
        URL: req.body.Person.URL,
        bedrooms: req.body.Person.bedrooms,
        tenants: req.body.Person.tenants,
        highlighted: req.body.Person.highlighted || "Not highlighted",

        
      }).fetch();

      if (models.length == 0) return res.notFound();

      return res.ok("Record updated");
      //return res.redirect('/person/admin');  

    }
  },

  //search: async function (req, res) {
  //},




  search: async function (req, res) {
    const qPage = Math.max(req.query.page - 1, 0) || 0;
    const numOfItemsPerPage = 2, Qmin = parseInt(req.query.minarea), Qmax = parseInt(req.query.maxarea);
    const qEstate = req.query.estate || "";
    const qBedrooms = parseInt(req.query.bedrooms), min_rent = parseInt(req.query.minrent), max_rent = parseInt(req.query.maxrent);

    if (isNaN(qBedrooms) || isNaN(min_rent) || isNaN(Qmin)) {

      var models = await Person.find({
        where: {
          estate: { contains: qEstate }
        },
        limit: numOfItemsPerPage,
        skip: numOfItemsPerPage * qPage,
        sort: 'rent',
      });

    } else {

      var models = await Person.find({
        where: { estate: { contains: qEstate }, rent: { '>=': min_rent, '<=': max_rent }, area: { '>=': Qmin, '<=': Qmax } },
        sort: 'rent',
        limit: numOfItemsPerPage,
        skip: numOfItemsPerPage * qPage,
      });

    }

   // var models = await Person.find({
     // limit: numOfItemsPerPage,
     // skip: numOfItemsPerPage * qPage
   // });
    var numOfPage = Math.ceil(await Person.count() / numOfItemsPerPage);
    return res.view('person/search', { persons: models, count: numOfPage,});
  },

  populate: async function (req, res) {

    var model = await Person.findOne(req.params.id).populate("worksFor");

    if (!model) return res.notFound();

    return res.json(model);

  },
};

