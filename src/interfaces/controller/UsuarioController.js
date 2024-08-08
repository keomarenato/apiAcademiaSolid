import { body } from 'express-validator'
import UsuarioService from '../../application/services/UsuarioService.js'
import { createuserSchema } from '../../validação/validationSchemas.js'




class UsuarioController {
  async criarUsuario(req, res) {

    try {

      // Validar os dados do request
      createuserSchema.parse(req.body)

      const { nome, email, telefone, senha, tipo } = req.body
      const novoUsuario = await UsuarioService.createUsuario(nome, email, telefone, senha, tipo)

      res.status(201).json(novoUsuario)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Se o erro for de validação, retornar erro 400 com os detalhes
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({message: 'Erro ao criar usuário', error: error.message})
    }
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await UsuarioService.listUsuarios()
      res.status(201).json(usuarios)
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  async listarUsuarioPorId(req, res) {
    const { id } = req.params

    try {
      const usuario = await UsuarioService.listarUsuarioPorId(parseInt(id))
      res.status(200).json(usuario)
    } catch (error) {
      res.status(404).json({ mensagem: error.message });
    }
  }

  async editarUsuario(req, res) {
    const { id } = req.params
    const dadosAtualizados = req.body

    try {
      const usuarioAtualizado = await UsuarioService.editarUsuario(parseInt(id), dadosAtualizados)
      res.status(200).json(usuarioAtualizado)
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarUsuario(req, res) {
    const { id } = req.params

    try {
      await UsuarioService.deletarUsuario(parent(id))
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body
      const { token } = await UsuarioService.login({ email, senha })
      res.status(200).json({ token })
    } catch (error) {
      res.status(400).json({ mensagem: error.message });
    }
  }
}

export const validateUsuario = [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 3 }).withMessage('Senha deve ter pelo menos 3 caracteres')
]


export default new UsuarioController();