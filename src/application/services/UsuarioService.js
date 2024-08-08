import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs'


import Usuario from '../../domain/entities/usuario.js';
import UsuarioRepository from '../../domain/repositories/UsuarioRepository.js';
import { generateToken } from '../../utils/jwtUtils.js';



class UsuarioService {
  async createUsuario({ nome, email, telefone, senha, tipo = 'USUARIO' }) {
    if (!email.includes('@')) {
      throw new Error('Email inválido')
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const usuario = new Usuario(null, nome, email, telefone, hashedPassword, tipo, [])
    return UsuarioRepository.create(usuario)
  }

  async listUsuarios() {
    return UsuarioRepository.findAll()
  }

  async listarUsuarioPorId(id) {
    const usuario = await UsuarioRepository.findById(id)
    if (!usuario) {
      throw new Error('Usuário não encontrado')
    }
    return usuario
  }

  async editarUsuario(id, dadosAtualizados) {
    // Validação adicionar se necessário
    return UsuarioRepository.update(id, dadosAtualizados)
  }

  async deletarUsuario(id) {
    await UsuarioRepository.delete(id)
  }

  async login({ email, senha }) {
    const usuario = await UsuarioRepository.findByEmail(email)
    if (!usuario) {
      throw new Errro("Usuario não encontrado")
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      throw new Error('Senha incorreta')
    }

    const token = generateToken(usuario.id, usuario.tipo)
    return { token }
  }
}

export default new UsuarioService();