import express from 'express'
import { createNote, getAllNotes, updateNote, deleteNote, getNoteById} from '../controllers/notesController.js';
import isLoggedIn from '../middleware/isLoggedIn.js';
import rateLimiter from '../middleware/rateLimiter.js';

const router = express.Router();


router.get('/', isLoggedIn, rateLimiter, getAllNotes);
router.get('/:id', isLoggedIn, rateLimiter, getNoteById);
router.post('/', isLoggedIn, rateLimiter, createNote);
router.put('/:id', isLoggedIn, rateLimiter, updateNote);
router.delete('/:id', isLoggedIn, rateLimiter, deleteNote);

export default router;