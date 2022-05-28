// Use for Controllers Plants

// To get All Plants
const getAllPlants = (req, res, next) => {
  //   const {user, content} = req.body;
  try {
    // await createBlogpost(user, content);
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.send("Get All Plants");
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

const getPlantBasedOnId = (req, res, next) => {
  //   const {id} = req.body;
  try {
    // await createBlogpost(user, content);
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.send("Get Plant Based on Id");
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

//Export All Methods
module.exports = {
  getAllPlants,
  getPlantBasedOnId,
};
