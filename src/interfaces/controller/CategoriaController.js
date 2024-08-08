import { validationResult, body } from "express-validator";
import CategoriaService from "../../application/services/CategoriaService.js";

class CategoriaController {
  async criarCategoria(req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    try {
      const novaCategoria = await CategoriaService.createCategoria(req.body);
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async listarCategorias(req, res) {
    try {
      const categorias = await CategoriaService.listarCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarCategoriaPorId(req, res) {
    const { id } = req.params;

    try {
      const categoria = await CategoriaService.listarCategoriaPorId(parseInt(id));
      res.status(200).json(categoria);
    } catch (error) {
      res.status(404).json({ mensagem: error.message });
    }
  }

  async editarCategoria(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const categoriaAtualizada = await CategoriaService.editarCategoria(parseInt(id), dadosAtualizados);
      res.status(200).json(categoriaAtualizada);
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarCategoria(req, res) {
    const { id } = req.params;
 
    try {
      await CategoriaService.deletarCategoria(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

export const validateCatgoria = [
  body('nome').notEmpty().withMessage("Nome é obrigatório")
];

export default new CategoriaController();
