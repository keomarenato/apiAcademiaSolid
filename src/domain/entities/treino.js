class Treino {
  constructor(id, usuarioId, descricao, status, dataInicio, dataTermino, treinosExercicio = []) {
    this.id = id
    this.usuarioId = usuarioId
    this.descricao = descricao
    this.status = status
    this.dataInicio = dataInicio
    this.dataTermino = dataTermino
    this.treinosExercicio = treinosExercicio
  }
}

export default Treino