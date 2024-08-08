import { PrismaClient } from '@prisma/client';
import Comentario from '../../domain/entities/comentario';
import ComentarioRepository from '../../domain/repositories/ComentarioRepository.js';
const prisma = new PrismaClient();


class ComentarioService {
  async createComentario({ texto, usuarioId, treinoId, exercicioId }) {
    const comentario = new Comentario(null, texto, usuarioId, treinoId, exercicioId)
    return ComentarioRepository.create(comentario)
  }

  async listarComentarios() {
    return ComentarioRepository.findAll()
  }

  async listarComentarioPorId(id) {
    const comentario = await ComentarioRepository.findById(id)
    if (!comentario) {
      throw new Error('Comentario não encontrado')
    }
    return comentario
  }

  async editarComentario(id, dadosAtualizados) {
    return ComentarioRepository.update(id, dadosAtualizados)
  }

  async deletarComentario(id) {
    await ComentarioRepository.delete(id)
  }
}

export default new ComentarioService();