const adminModel = require(`../models/index`).admin;
const md5 = require(`md5`);
const Op = require(`sequelize`).Op;
exports.getAlladmin = async (_request, response) => {
  let admin = await adminModel.findAll();
  return response.json({
    success: true,
    data: admin,
    message: `All admin have been loaded`,
  });
};
exports.findadmin = async (request, response) => {
  let keyword = request.params.key;
  let admin = await adminModel.findAll({
    where: {
      [Op.or]: [
        { admin_id: { [Op.substring]: keyword } },
        { name: { [Op.substring]: keyword } },
        { email: { [Op.substring]: keyword } },
        { password: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: admin,
    message: `All Users have been loaded`,
  });
};
exports.addadmin = (request, response) => {
  let newadmin = {
    name: request.body.name,
    email: request.body.email,
    password: md5(request.body.password)
  };
  adminModel
    .create(newadmin)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New user has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
exports.updateadmin = (request, response) => {
  let dataadmin = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  };
  if (request.body.password) {
    dataadmin.password = md5(request.body.password);
  }
  let admin_id = request.params.id;
  adminModel
    .update(dataadmin, { where: { admin_id: admin_id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
exports.deleteadmin = (request, response) => {
  let admin_id = request.params.id;
  adminModel
    .destroy({ where: { admin_id: admin_id } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
