import { validationResult, body } from "express-validator"
import TreinoExercicioService from "../../application/services/TreinoExercicioService.js"
 


class TreinoExercicioController {
  async criarTreinoExercicio(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty) {
      return res.status(400).json({ erros: erros.array() })
    }

    try {
      const novoTreinoExercicio = await TreinoExercicioService.createTreinoExercicio(req.body)
      res.status(201).json(novoTreinoExercicio)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async listarTreinosExercicio(req, res) {
    try {
      const treinosExercicio = await TreinoExercicioService.listarTreinoExercicioPorId()
      res.status(200).json(treinosExercicio)
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarTreinoExercicioPorId(req, res) {
    const { id } = req.params

    try {
      const treinoExercicio = await TreinoExercicioService.listarTreinoExercicioPorId(parseIntid)
      res.status(200).json(treinoExercicio)
    } catch (error) {
      res.status(404).json({ mensagem: error.message })
    }
  }

  async editarTreinoExercicio(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body

    try {
      const treinoExercicioAtualizado = await TreinoExercicioService.editarTreinoExercicio(parseInt(id), dadosAtualizados)
      res.status(200).json(treinoExercicioAtualizado)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarTreinoExercicio(req, res) {
    const { id } = req.params

    try {
      await TreinoExercicioService.deletarTreinoExercicio(parseInt(id))
      res.status(200).send()
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

export const validateTreinoExercicio = [
  body('treinoId').notEmpty().withMessage('Treino é obrigatório'),
  body('exercicioId').notEmpty().withMessage('Exercicio é obrigatório')
]

 
export default new TreinoExercicioController();