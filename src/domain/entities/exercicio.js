class Exercicio {
  constructor(id, nome, categoriaId, series = [], treinos = []) {
    this.id = id
    this.nome = nome
    this.categoriaId = categoriaId
    this.series = series
    this.treinos = treinos
  }
}

export default Exercicio