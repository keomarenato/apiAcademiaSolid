import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TreinoRepository {
  async create(treino) {
    const data = {
      usuarioId: treino.usuarioId,
      descricao: treino.descricao,
      treino: treino.treino,
      status: treino.status,
      dataInicio: treino.dataInicio,
      dataTermino: treino.dataTermino
    }

    if (treino.treinosExercicio && treino.treinosExercicio.length > 0) {
      data.treinosExercicio = {
        create: treino.treinosExercicio.map(te => ({
          exercicioId: te.exercicioId
        }))
      }
    }

    return prisma.treino.create({
      data
    })
  }

  async findAll() {
    return prisma.treino.findMany({
      include: {
        treinosExercicio: {
          include: {
            exercicio: true
          }
        }

      }
    })
  }

  async findById(id) {
    return prisma.treino.findUnique({
      where: { id },
      include: {
        treinosExercicio: {
          include: {
            exercicio: true
          }
        }
      }
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.treino.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.treino.delete({
      where: { id }
    })
  }
}

export default new TreinoRepository();