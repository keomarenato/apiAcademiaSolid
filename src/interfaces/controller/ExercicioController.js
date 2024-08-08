import { validationResult, body } from "express-validator"
import ExercicioService from "../../application/services/ExercicioService.js";
import { z } from "zod";


class ExercicioController {
  async criarExercicio(req, res) {

    try {
      createExercicioSchema.parse(req.body)

      const { nome, categoriaId } = req.body
      const novoExercicio = await ExercicioService.createExercicio({ nome, categoriaId })
      res.status(201).json(novoExercicio)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errros })
      }
    }



    try {
      const novoExercicio = await ExercicioService.createExercicio(req.body)
      res.status(201).json(novoExercicio)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async listarExercicios(req, res) {
    try {
      const exercicios = await ExercicioService.listarExercicios()
      res.status(200).json(exercicios)
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarExercicioPorId(req, res) {
    const { id } = req.params

    try {
      const exercicio = await ExercicioService.listarExercicioPorId(parseInt(id))
      res.status(200).json(exercicio)
    } catch (error) {
      res.status(404).json({ mensagem: error.message });
    }
  }

  async editarExercicio(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body

    try {
      const exercicioAtualizado = await ExercicioService.editarExercicio(parseInt(id, dadosAtualizados))
      res.status(200).json(exercicioAtualizado)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarExercicio(req, res) {
    const { id } = req.params

    try {
      await ExercicioService.deletarExercicio(parseInt(id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

const validateExercicio = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('categoriaId').notEmpty().withMessage('Categoria é orbigatória')
]

export { validateExercicio }
export default new ExercicioController();