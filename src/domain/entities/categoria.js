class Categoria {
  constructor(id, nome, exercicios = []) {
    this.id = id
    this.nome = nome;
    this.exercicios = exercicios
  }
}

export default Categoria