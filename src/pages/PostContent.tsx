import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { isPost } from '../functions/typeGuards';
import CommentList from '../partials/PostContent/CommentList';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { addComment } from '../slices/comments';
import { editPost, readPostAndComments } from '../slices/posts';

export default function PostContent() {
  const { postId } = useParams();
  const posts = useAppSelector((state) => state.posts);
  const post = useMemo(() => posts.entities[Number(postId)], [postId, posts.entities]);
  const dispatch = useAppDispatch();

  const [openAddCard, setOpenAddCard] = useState(false);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const [openEditCard, setOpenEditCard] = useState(false);
  const [author, setAuthor] = useState(post ? post.author : '');
  const [title, setTitle] = useState(post ? post.title : '');
  const [postContent, setPostContent] = useState(post ? post.content : '');

  const handleAddComment = async () => {
    await dispatch(addComment({ postId: Number(postId), username, content }));
    setOpenAddCard(false);
  };

  const handleEditPost = async () => {
    await dispatch(
      editPost({ postId: Number(postId), author, title, content: postContent }),
    );
    setOpenEditCard(false);
  };

  useEffect(() => {
    // just to show you that we can await a dispatch
    dispatch(readPostAndComments({ postId: Number(postId) }));
  }, [dispatch, postId]);

  // type guard
  if (isPost(post))
    // typeof post === 'Post' here
    return (
      <div className="flex flex-col bg-sky-200 p-6 rounded-l shadow-md">
        <div className="flex flex-row align-middle py-2 mb-2">
          <h2 className="text-3xl mb-2 font-bold w-3/4">{post.title}</h2>
          <div
            className={
              openAddCard
                ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
                : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
            }
            id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add Comment
                </h3>

                <div className="flex flex-row justify-center align-middle">
                  <div className=" text-sm mt-1 border-t-4 border-transparent mr-2 text-left">
                    Username
                  </div>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center align-middle">
                  <div className=" text-sm mt-1 border-t-4 border-transparent mr-4 text-left">
                    Content
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="Content"
                      name="content"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={handleAddComment}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              openEditCard
                ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
                : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
            }
            id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Post</h3>

                <div className="flex flex-row justify-center align-middle">
                  <div className=" text-sm mt-1 border-t-4 border-transparent mr-8 text-left">
                    Title
                  </div>
                  <div className="mt-1">
                    <input
                      id="Title"
                      name="Title"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center align-middle">
                  <div className=" text-sm mt-1 border-t-4 border-transparent mr-4 text-left">
                    Author
                  </div>
                  <div className="mt-1">
                    <input
                      id="Author"
                      name="Author"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center align-middle">
                  <div className=" text-sm mt-1 border-t-4 border-transparent mr-4 text-left">
                    Content
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="Content"
                      name="content"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Content"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={handleEditPost}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className="bg-yellow-700 text-white rounded-md shadow-md shadow-yellow-900 px-4 hover:bg-yellow-600 hover:cursor-pointer active:bg-yellow-800 transition-all"
            onClick={() => setOpenEditCard(true)}>
            Edit Post
          </button>
          <button
            className="bg-yellow-700 text-white rounded-md shadow-md shadow-yellow-900 px-4 hover:bg-yellow-600 hover:cursor-pointer active:bg-yellow-800 transition-all "
            onClick={() => setOpenAddCard(true)}>
            Add Comment
          </button>
        </div>
        <div>
          <span className="mr-1">{post.author}</span>
          <span className="text-sm">{moment(post.time).format('MMM DD, YYYY')}</span>
        </div>
        <span>{post.content}</span>
        <CommentList post={post} />
      </div>
    );
  else
    return (
      <div className="bg-sky-200 p-6 rounded-l shadow-md">
        <h2 className="text-xl font-bold">404 Not Found</h2>
      </div>
    );
}
