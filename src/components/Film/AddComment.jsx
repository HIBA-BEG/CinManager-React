import React, { useState } from 'react';
import { createCommentaire } from '../../services/CommentaireServices';
import { getUser } from '../../services/AuthServices';


const AddComment = ({ filmId, onAddComment }) => {
  const [contenu, setContent] = useState('');
  const currentUser = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('filmId:', filmId);
      const newComment = await createCommentaire({ film: filmId, contenu });
      console.log('New comment:', newComment);

      console.log('currentUser',currentUser);
      const profilePicUrl = `${process.env.REACT_APP_MINIO_PATH}${currentUser.profilePic}`;

      console.log('profilePicUrl',profilePicUrl);
      const commentWithUser = {
        ...newComment,
        user: {
          _id: currentUser._id,
          nom: currentUser.nom,
          prenom: currentUser.prenom,
          profilePic: profilePicUrl,
        }
      };
      console.log('commetn with user',commentWithUser);
      
      setContent('');
      onAddComment(commentWithUser);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h3 className="text-xl font-bold mb-2">Add a Comment</h3>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center w-full md:max-w-2xl">
        <textarea
          value={contenu}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="w-full text-black font-semibold p-4 mb-4 border rounded-xl bg-none shadow-lg md:max-w-2xl"
          rows="3"
        />
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>
    </div>

  );
};

export default AddComment;
