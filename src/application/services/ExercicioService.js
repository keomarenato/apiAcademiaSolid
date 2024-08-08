import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import ExercicioRepository from '../../domain/repositories/ExercicioRepository.js';
import Exercicio from '../../domain/entities/exercicio.js';


class ExercicioService {
  async createExercicio({ nome, categoriaId }) {
    const exercicio = new Exercicio(null, nome, categoriaId, [], [])
    return ExercicioRepository.create(exercicio)
  }

  async listarExercicios() {
    return ExercicioRepository.findAll()
  }

  async listarExercicioPorId(id) {
    const exercicio = await ExercicioRepository.findById(id)
    if (!exercicio) {
      throw new Error('Exercicio não encontrado')
    }
    return exercicio
  }

  async editarExercicio(id, dadosAtualizados) {
    return ExercicioRepository.update(id, dadosAtualizados)
  }

  async deletarExercicio(id) {
    await ExercicioRepository.delete(id)
  }
}

export default new ExercicioService();