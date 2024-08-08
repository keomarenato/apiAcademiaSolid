import { validationResult, body } from "express-validator"
import TreinoService from "../../application/services/TreinoService.js";
import { createTreinoSchema } from "../../validação/validationSchemas.js";


class TreinoController {
  async criarTreino(req, res) {

    try {
      createTreinoSchema.parse(req.body)

      const { usuarioId, descricao, status, dataInicio, dataTermino, treinosExercicio } = req.body
      const novoTreino = await TreinoService.createTreino({ usuarioId, descricao, status, dataInicio, dataTermino, treinosExercicio })

      res.status(201).json(novoTreino)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({ message: 'Erro ao criar treino', error: error.message });
    }

  }

  async listarTreinos(req, res) {
    try {
      const treinos = await TreinoService.listarTreinos()
      res.status(200).json(treinos)
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarTreinoPorId(req, res) {
    const { id } = req.params

    try {
      const treino = await TreinoService.listarTreinoPorId(parseInt(id))
    } catch (error) {
      res.status(404).json({ mensagem: error.message });
    }
  }

  async editarTreino(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body

    try {
      const treinoAtualizado = await TreinoService.editarTreino(parseInt(id), dadosAtualizados)
      res.status(200).json(treinoAtualizado)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarTreino(req, res) {
    const { id } = req.params

    try {
      await TreinoService.deletarTreino(parseInt(id))
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

const validateTreino = [
  body('UsuarioId').notEmpty().withMessage("Usuario nao é obrigatório")
]

export { validateTreino }
export default new TreinoController();