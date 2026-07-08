import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from '../libs/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from 'lucide-react';

function NoteDetailPage() {
    const [note, setNote] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const params = useParams();
    const navigate = useNavigate();

    useEffect( () => {

        const fetchNote = async () => {

            try {
                const res = await api.get(`/notes/${params.id}`)
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching Note", error.message);
                toast.error("Failed to fetch the note")
            } finally {
                setLoading(false);
            }
    };
    
    fetchNote();
    
} ,[params.id])
    
console.log(note);

    const handleDelete = async () => {
        try {
            if(!window.confirm("Are you sure you want to delete this note?")) return;

            await api.delete(`/notes/${params.id}`);
            toast.success(' Note deleted succesfully');
            navigate('/');

        } catch (error) {
            console.log('Error deleting the note:', error.message);
            toast.error('Failed to delete note');
        }
    }

    const handleSave = async () => {
        if(!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content")
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${params.id}`, note);
            toast.success("Note updated successfully");
            navigate('/');
        } catch (error) {
            console.log('Error saving the note', error.message);
            toast.error('Failed to update note');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }
    
    return ( 
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label block mb-4">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered block"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label block mb-4">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 block"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
