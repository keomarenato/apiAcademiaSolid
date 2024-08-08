import { Router } from "express";
import { body } from "express-validator";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import CategoriaController from "./interfaces/controller/CategoriaController.js";
import ExercicioController from "./interfaces/controller/ExercicioController.js";
import SerieController from "./interfaces/controller/SerieController.js";
import TreinoController from "./interfaces/controller/TreinoController.js";
import TreinoExercicioController from "./interfaces/controller/TreinoExercicioController.js";
import UsuarioController from "./interfaces/controller/UsuarioController.js";



const categoriaController = CategoriaController
const exercicioController = ExercicioController
const serieController = SerieController
const treinoController = TreinoController
const treinoExercicioController = TreinoExercicioController
const usuarioController = UsuarioController


const router = Router();

router.post('/users', usuarioController.criarUsuario);
router.get('/users', authMiddleware, usuarioController.listarUsuarios);

router.post('/login', usuarioController.login);


router.post('/categorias', categoriaController.criarCategoria)
router.get('/categorias', categoriaController.listarCategorias)
router.get('/categorias/:id', categoriaController.listarCategoriaPorId)
router.put('/categorias/:id', categoriaController.editarCategoria)
router.delete('/categorias/:id', categoriaController.deletarCategoria)


router.post('/exercicios', exercicioController.criarExercicio)
router.get('/exercicios', exercicioController.listarExercicios)
router.get('/exercicios/:id', exercicioController.listarExercicioPorId)
router.put('/exercicios/:id', exercicioController.editarExercicio)
router.delete('/exercicios/:id', exercicioController.deletarExercicio)

router.post('/series', serieController.criarSerie)
router.get('/series', serieController.listarSeries)
router.get('/series/:id', serieController.listarSeriePorId)
router.put('/series/:id', serieController.editarSerie)
router.delete('/series/:id', serieController.deletarSerie)

router.post('/treinos', treinoController.criarTreino)
router.get('/treinos', treinoController.listarTreinos)
router.get('/treinos/:id', treinoController.listarTreinoPorId)
router.put('/treinos/:id', treinoController.editarTreino)
router.delete('/treinos/:id', treinoController.deletarTreino)

router.post('/treinosExercicio', treinoExercicioController.criarTreinoExercicio)
router.get('/treinosExercicio', treinoExercicioController.listarTreinosExercicio)
router.get('/treinosExercicio/:id', treinoExercicioController.listarTreinoExercicioPorId)
router.put('/treinosExercicio/:id', treinoExercicioController.editarTreinoExercicio)
router.delete('/treinosExercicio/:id', treinoExercicioController.deletarTreinoExercicio)


export { router };