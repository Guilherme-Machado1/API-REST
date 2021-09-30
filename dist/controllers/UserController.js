"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;
      res.json({ id, nome, email });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);
      const { id, nome, email } = user;
      if (!user) {
        return res.status(400).json({
          errors: ['This user does not exist.'],
        });
      }
      return res.json({ id, nome, email });
    } catch (error) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          errors: ['This user does not exist.'],
        });
      }
      const newData = await user.update(req.body);
      return res.json(newData);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (!user) {
        return res.status(400).json({
          user: 'This user does not exist.',
        });
      }
      await user.destroy();
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.json(null);
    }
  }
}
exports. default = new UserController();
