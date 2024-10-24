import React from 'react';
import { deleteCommentaire } from '../../services/CommentaireServices';
import { isAuthenticated as AuthCheck, getUser } from '../../services/AuthServices';

const AllComments = ({ comments, setComments }) => {
  const isAuthenticated = AuthCheck();
  const currentUser = isAuthenticated ? getUser() : null;

  const handleDelete = async (commentId) => {
    try {
      await deleteCommentaire(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold my-6">Comments</h3>
      {comments.length === 0 ? (
        <p className='text-red-600 text-2xl italic text-center font-bold mb-6'>No comments yet. <br></br> Be the first to comment! ❤️</p>
      ) : (
        comments.map((comment) => {
          const profilePicUrl = `${process.env.REACT_APP_MINIO_PATH}${comment.user.profilePic}`
          // console.log(comment.user);

          const isCurrentUserComment = currentUser && currentUser.id === comment.user._id;
          console.log(currentUser);
          


          return (
            <div key={comment._id} className="relative flex flex-col gap-4 p-4 mb-8 border rounded-xl shadow-lg w-full md:max-w-2xl">
              <div className="relative flex gap-4">
                <img
                  src={profilePicUrl}
                  className="relative rounded-lg bottom-8 bg-white border h-20 w-20"
                  alt={comment.user.nom}
                  loading="lazy"
                />
                  <div className="flex flex-col md:flex-row justify-between w-full">
                    <p className="relative text-2xl whitespace-nowrap truncate overflow-hidden">
                      {comment.user.nom} {comment.user.prenom}
                    </p>
                    <p className="text-gray-400 text-sm">{new Date(comment.created_at).toLocaleString()}</p>
                  </div>
              </div>
              <div className="flex flex-row justify-between">

                <p className="md:-mt-4 ">{comment.contenu}</p>
                {isCurrentUserComment && (
                  <button
                    className="text-red-500 hover:bg-red-500 hover:text-white rounded-md px-1"
                    onClick={() => handleDelete(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllComments;
