import { z } from 'zod'

export const createuserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email é inválido'),
  telefone: z.string().min(5, 'Telefone deve ter no minimo 5 caracteres'),
  senha: z.string().min(3, 'Senha deve ter no minimo 3 caracteres'),
  tipo: z.enum(['USUARIO', 'ADMINISTRADOR', 'PERSONAL'])
})

export const createExercicioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  categoriaId: z.number().min(1, 'ID da categoria é obrigatorio')
})

export const createTreinoSchema = z.object({
  usuarioId: z.number().min(1, 'ID do usuario é obrigatorio'),
  status: z.enum(['ATIVO', 'CONCLUIDO', 'CANCELADO']),
  dataInicio: z.string().optional(),
  dataTermino: z.string().optional(),
  treinosExercicio: z.array(z.object({
    exercicioId: z.number().min(1, 'ID do exercicio é obrigatorio')
  })).optional()
})