import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import CategoriaRepository from '../../domain/repositories/CategoriaRepository.js';


class CategoriaService {
  async createCategoria({ nome }) {
    const categoria = { nome }
    return CategoriaRepository.create(categoria)
  }

  async listarCategorias() {
    return CategoriaRepository.findAll()
  }

  async listarCategoriaPorId(id) {
    const categoria = await CategoriaRepository.findById(id)

    if (!categoria) {
      throw new Error("Categoria não encontrada")
    }
    return categoria
  }

  async editarCategoria(id, dadosAtualizados) {
    return CategoriaRepository.update(id, dadosAtualizados)
  }

  async deletarCategoria(id) {
    await CategoriaRepository.delete(id)
  }
}

export default new CategoriaService();