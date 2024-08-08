import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


class TreinoExercicioRepository {
  async create(treinoExercicio) {
    return prisma.treinoExercicio.create({
      data: treinoExercicio
    })
  }

  async findAll() {
    return prisma.treinoExercicio.findMany()
  }

  async findById(id) {
    return prisma.treinoExercicio.findUnique({
      where: { id }
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.treinoExercicio.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.treinoExercicio.delete({
      where: { id }
    })
  }
}

export default new TreinoExercicioRepository();