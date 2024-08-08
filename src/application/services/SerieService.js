import { PrismaClient } from '@prisma/client';
import SerieRepository from '../../domain/repositories/SerieRepository.js';
import Serie from '../../domain/entities/serie.js';
const prisma = new PrismaClient();

class SeriesService {
  async createSerie({ repeticoes, peso, exercicioId }) {
    const serie = new Serie(null, repeticoes, peso, exercicioId)
    return SerieRepository.create(serie)
  }

  async listarSeries() {
    return SerieRepository.findAll()
  }

  async listarSeriesPorId(id) {
    const serie = await SerieRepository.findById(id)
    if (!serie) {
      throw new Error('Serie não encontrada');
    }
    return serie
  }

  async editarSerie(id, dadosAtualizados) {
    return SerieRepository.update(id, dadosAtualizados)
  }

  async deletarSerie(id) {
    await SerieRepository.delete(id)
  }
}

export default new SeriesService();