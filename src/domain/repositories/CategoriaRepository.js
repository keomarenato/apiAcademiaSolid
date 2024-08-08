import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CategoriaRepository {
  async create(categoria) {
    return prisma.categoria.create({
      data: categoria
    })
  }

  async findAll() {
    return prisma.categoria.findMany()
  }

  async findById(id) {
    return prisma.categoria.findUnique({
      where: { id }
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.categoria.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.categoria.delete({
      where: { id }
    })
  }
}

export default new CategoriaRepository();