import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import PersonalTrainer from '../entities/personalTrainer'

class PersonalTrainerRepository {
  async create(personalTrainer) {
    const createdPersonalTrainer = await prisma.usuario.create({
      data: {
        nome: personalTrainer.nome,
        email: personalTrainer.email,
        telefone: personalTrainer.telefone,
        senha: personalTrainer.senha,
        tipo: personalTrainer.tipo,
        treinos: { connect: personalTrainer.treinos.map(treino => ({ id: treino.id })) }
      }
    })
    return new PersonalTrainer(
      createdPersonalTrainer.id,
      createdPersonalTrainer.nome,
      createdPersonalTrainer.email,
      createdPersonalTrainer.telefone,
      createdPersonalTrainer.senha,
      createdPersonalTrainer.tipo,
      createdPersonalTrainer.treinos
    )
  }

  async findAll() {
    const personalTrainers = await prisma.usuario.findMany({
      where: { tipo: 'PERSONAL' },
      include: { treinos: true }
    })
    return personalTrainers.map(pt => new PersonalTrainer(
      pt.id,
      pt.nome,
      pt.email,
      pt.telefone,
      pt.senha,
      pt.tipo,
      pt.treinos
    ))
  }

  async findById(id) {
    const personalTrainer = await prisma.usuario.findUnique({
      where: { id },
      include: { treinos: true }
    })
    if (!personalTrainer || personalTrainer.tipo !== 'PERSONAL') {
      return null
    }
    return new PersonalTrainer(
      personalTrainer.id,
      personalTrainer.nome,
      personalTrainer.email,
      personalTrainer.telefone,
      personalTrainer.senha,
      personalTrainer.tipo,
      personalTrainer.treinos
    )
  }

  async update(id, dadosAtualizados) {
    const updatedPersonalTrainer = await prisma.usuario.update({
      where: { id },
      data: dadosAtualizados
    })
    return new PersonalTrainer(
      updatedPersonalTrainer.id,
      updatedPersonalTrainer.nome,
      updatedPersonalTrainer.email,
      updatedPersonalTrainer.telefone,
      updatedPersonalTrainer.senha,
      updatedPersonalTrainer.tipo,
      updatedPersonalTrainer.treinos
    )
  }

  async delete(id) {
    await prisma.usuario.delete({
      where: { id }
    })
  }

}

export default new PersonalTrainerRepository();