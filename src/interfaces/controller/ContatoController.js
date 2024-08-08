import { validationResult } from "express-validator";



class ContatoController {
  async criarContato(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    try {
      const novoContato = await ContatoRepository.cr
    } catch (error) {

    }
  }
}