"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename'],
      },
    });
    res.json(alunos);
  }

  // store

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  // show

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
  // delete

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      await aluno.destroy();
      return res.json(aluno);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
  // update

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Student does not exist'],
        });
      }
      const alunoAtualizado = await aluno.update(req.body);
      return res.json(alunoAtualizado);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new AlunoController();
