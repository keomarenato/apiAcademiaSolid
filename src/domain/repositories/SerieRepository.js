import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


class SerieRepository {
  async create(serie) {
    return prisma.serie.create({
      data: {
        repeticoes: serie.repeticoes,
        peso: serie.peso,
        exercicio: {
          connect: {id: serie.exercicioId }
        }
      }
    })
  }

  async findAll() {
    return prisma.serie.findMany()
  }

  async findById(id) {
    return prisma.serie.findUnique({
      where: id
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.serie.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.serie.deleet({
      where: { id }
    })
  }
}

export default new SerieRepository();