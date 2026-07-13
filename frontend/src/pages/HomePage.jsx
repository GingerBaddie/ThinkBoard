import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios'
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NoteDetailPage from './NoteDetailPage';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';
import api from '../libs/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';


function HomePage() {

    const {user, loading: authLoading} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
    
        const fetchNotes = async () => {
            try {
               const res = await api.get('/notes');
               setNotes(res.data);
               setIsRateLimited(false);

            } catch (error) {
                console.error('Error fetching notes', error);
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                }
                else {
                    toast.error("Failed to load notes");
                }
            }

            finally{
                setLoading(false);
            }
        }
    
    if (authLoading) {
        return;
    }

    if (!user) {
        navigate("/login");
        return;
    }

    fetchNotes();
}, [authLoading, user, navigate]);

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    if (authLoading) {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10" />
        </div>
    );
}

    return (
        <div>
            
            <Navbar />

            {isRateLimited && <RateLimitedUI />}


            <div className='max-w-7xl mx-auto p-4 mt-6'>
                
                {loading && <div className="min-h-screen bg-base-200 flex items-center justify-center"><LoaderIcon className="animate-spin size-10" /></div>}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />} 

                {notes.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map((note) => (
                          <div key={note._id}>
                            
                            <NoteCard note={note} setNotes={setNotes}/>
                          </div>  
                        ))}
                    </div>
                )} 
            </div>
        </div>
        
    )
}

export default HomePage;
