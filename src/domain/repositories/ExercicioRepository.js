import { PrismaClient } from '@prisma/client';
import Exercicio from '../entities/exercicio.js';
const prisma = new PrismaClient();


class ExercicioRepository {
  async create(exercicio) {
    const createdExercicio = await prisma.exercicio.create({
      data: {
        nome: exercicio.nome,
        categoria: {
          connect: { id: exercicio.categoriaId }
        },
        series: {
          create: exercicio.series.map(serie => ({
            repeticoes: serie.repeticoes,
            peso: serie.peso
          }))
        },
        treinos: {
          create: exercicio.treinos.map(treinoExercicio => ({
            treino: { connect: { id: treinoExercicio.treinoId } }
          }))
        }
      }
    })
    return new Exercicio(
      createdExercicio.id,
      createdExercicio.nome,
      createdExercicio.categoriaId,
      createdExercicio.series,
      createdExercicio.treinos
    )
  }

  async findAll() {
    const exercicios = await prisma.exercicio.findMany({
      include: {
        categoria: true,
        series: true,
        treinos: true
      }
    })
    return exercicios.map(exercicio => new Exercicio(
      exercicio.id,
      exercicio.nome,
      exercicio.categoriaId,
      exercicio.series,
      exercicio.treinos
    ))
  }

  async findById(id) {
    const exercicio = await prisma.exercicio.findUnique({
      where: { id },
      include: {
        categoria: true,
        series: true,
        treinos: true
      }
    })
    if (!exercicio) return null
    return new Exercicio(
      exercicio.id,
      exercicio.nome,
      exercicio.categoriaId,
      exercicio.series,
      exercicio.treinos
    )
  }

  async update(id, dadosAtualizados) {
    return prisma.exercicio.update({
      where: { id },
      data: dadosAtualizados
    })
    return new Exercicio(
      updatedExercicio.id,
      updatedExercicio.nome,
      updatedExercicio.categoriaId,
      updatedExercicio.series,
      updatedExercicio.treinos
    )
  }

  async delete(id) {
    return prisma.exercicio.delete({
      where: { id }
    })
  }
}

export default new ExercicioRepository();