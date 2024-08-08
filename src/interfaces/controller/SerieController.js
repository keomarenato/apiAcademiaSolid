import { validationResult, body } from "express-validator"
import SerieService from "../../application/services/SerieService.js";


class SerieController {
  async criarSerie(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() })
    }

    try {
      const novaSerie = await SerieService.createSerie(req.body)
      res.status(201).json(novaSerie)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async listarSeries(req, res) {
    try {
      const series = await SerieService.listarSeries()
      res.status(200).json(series)
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarSeriePorId(req, res) {
    const { id } = req.params

    try {
      const serie = await SerieService.listarSeriesPorId(parseInt(id))
      res.status(200).json(serie)
    } catch (error) {
      res.status(404).json({ mensagem: error.message });
    }
  }

  async editarSerie(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body

    try {
      const serieAtuaslizada = await SerieService.editarSerie(parseInt(id), dadosAtualizados)
      res.status(200).json(serieAtuaslizada)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarSerie(req, res) {
    const { id } = req.params

    try {
      await SerieService.deletarSerie(parseInt(id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

export const validateSerie = [
  body('repeticoes').isInt({ min: 1 }).withMessage('Repeticoes deve ser um numero inteiro'),
  body('peso').optional().isFloat({ min: 0 }).withMessage('Peso deve ser um numero inteiro'),
  body('exercicioId').notEmpty().withMessage('Exercício é obrigatorio')
]
 
export default new SerieController();