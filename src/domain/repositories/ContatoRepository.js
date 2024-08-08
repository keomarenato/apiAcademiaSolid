import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ContatoRepository {
  async create(contato) {
    return prisma.contato.create({
      data: contato
    })
  }

  async findAll() {
    return prisma.contato.findMany()
  }

  async findById(id) {
    return prisma.contato.findUnique({
      where: { id }
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.contato.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.contato.delete({
      where: { id }
    })
  }
}

export default new ContatoRepository();