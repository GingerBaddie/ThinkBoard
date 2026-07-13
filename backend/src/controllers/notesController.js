import Note from "../models/Note.js";


export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({user: req.user._id}).sort({createdAt: -1}); // for getting newest first -1 will sort in desc. order
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error in get All notes controller', error.message);
        res.status(500).json({message: "Internal server error"});
    }

}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content, user: req.user._id});
        
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
        
    } catch (error) {
        console.error('Error in createNote controller', error.message);
        res.status(500).json({message: "Internal server error"});
    }

}

export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, {title, content},
            {
                new: true
            }
        );

        if(!updatedNote) return res.status(404).json({message: 'Note not found'});

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error('Error in updateNote controller', error.message);
        res.status(500).json({message: "Internal server error"});
    }

}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: 'note not found'});

        res.status(200).json({message: 'message deleted successfully'})
    } catch (error) {
        console.error('Error in deleteNote controller', error.message);        
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: 'note not found'});

        res.status(200).json(note)
    } catch (error) {
        console.error('Error in getNoteById controller', error.message);        
    }
}