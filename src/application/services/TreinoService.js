import { PrismaClient } from '@prisma/client';
import TreinoRepository from '../../domain/repositories/TreinoRepository.js';
import Treino from '../../domain/entities/treino.js';
const prisma = new PrismaClient();


class TreinoService {
  async createTreino({ usuarioId, descricao, status, dataInicio, dataTermino, treinosExercicio = [] }) {
    const treino = new Treino(null, usuarioId, descricao, status, dataInicio, dataTermino, treinosExercicio)
    return TreinoRepository.create(treino)
  }

  async listarTreinos() {
    return TreinoRepository.findAll()
  }

  async listarTreinoPorId(id) {
    const treino = await TreinoRepository.findById(id)
    if (!treino) {
      throw new Error('Treino não encontrado')
    }
    return treino
  }

  async editarTreino(id, dadosAtualizados) {
    return TreinoRepository.update(id, dadosAtualizados)
  }

  async deletarTreino(id) {
    await TreinoRepository.delete(id)
  }
}

export default new TreinoService();