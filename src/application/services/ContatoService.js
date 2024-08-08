import { PrismaClient } from '@prisma/client';
import ContatoRepository from '../../domain/repositories/ContatoRepository.js';
import Contato from '../../domain/entities/contato';
const prisma = new PrismaClient();


class ContatoService {
  async createContato({ tipo, numero, usuarioId }) {
    const contato = new Contato(null, tipo, numero, usuarioId)
    return ContatoRepository.create(contato)
  }

  async listarContatos() {
    return ContatoRepository.findAll()
  }

  async listarContatoPorId(id) {
    const contato = await ContatoRepository.findById(id)
    if (!contato) {
      throw new Error("Contato não encontrado")
    }
    return contato
  }

  async editarContato(id, dadosAtualizados) {
    return ContatoRepository.update(id, dadosAtualizados)
  }

  async deletarContato(id) {
    await ContatoRepository.delete(id)
  }
}

export default new ContatoService();