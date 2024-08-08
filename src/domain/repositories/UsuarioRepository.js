import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UsuarioRepository {
  async create({ nome, email, telefone, senha, tipo }) {
    return prisma.usuario.create({
      data: { nome, email, telefone, senha, tipo }
    })
  }

  async findAll() {
    return prisma.usuario.findMany()
  }

  async findById(id) {
    return prisma.usuario.findUnique({
      where: { id }
    })
  }

  async findByEmail(email) {
    return prisma.usuario.findUnique({
      where: { email }
    })
  }

  async update(id, dadosAtualizados) {
    return prisma.usuario.update({
      where: { id },
      data: dadosAtualizados
    })
  }

  async delete(id) {
    return prisma.usuario.delete({
      where: { id }
    })
  }
}

export default new UsuarioRepository