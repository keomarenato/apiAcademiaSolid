import { PrismaClient } from '@prisma/client';
import TreinoExercicioRepository from '../../domain/repositories/TreinoExercicioRepository.js';
const prisma = new PrismaClient();


class TreinoExercicioService {
  async createTreinoExercicio({ treinoId, exercicioId }) {
    const treinoExercicio = { treinoId, exercicioId }
    return TreinoExercicioRepository.create(treinoExercicio)
  }

  async listarTreinosExercicio() {
    return TreinoExercicioRepository.findAll()
  }

  async listarTreinoExercicioPorId(id) {
    const treinoExercicio = await TreinoExercicioRepository.findById(id)
    if (!treinoExercicio) {
      throw new Error('TreinoExercicio não encontrado');
    }
    return treinoExercicio
  }

  async editarTreinoExercicio(id, dadosAtualizados) {
    return TreinoExercicioRepository.update(id, dadosAtualizados)
  }

  async deletarTreinoExercicio(id) {
    await TreinoExercicioRepository.delete(id)
  }
}

export default new TreinoExercicioService();