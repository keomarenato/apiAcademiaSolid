import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs'
import PersonalTrainer from '../../domain/entities/personalTrainer';


class PersonalTrainerService {
  async createPersonalTrainer({ nome, email, telefone, senha, tipo = 'PERSONAL' }) {
    if (!email.includes('@')) {
      throw new Error('Email inválido')
    }

    const hashedPassword = await bcrypt.hash(senha, 10)
    const personalTrainer = await PersonalTrainer(null, nome, email, telefone, hashedPassword, tipo, [])
    return Per
  }
}