import React, { useEffect, useState } from 'react';

import PostListItem from '../partials/PostList/PostListItem';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { addPost, browseAllPosts } from '../slices/posts';

export default function PostListItemList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);

  const [openAddCard, setOpenAddCard] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    await dispatch(addPost({ title, author, content }));
    setOpenAddCard(false);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  useEffect(() => {
    dispatch(browseAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-sky-200 p-6 rounded-l shadow-md">
      <div className="flex flex-row justify-between align-middle py-2 mb-2">
        <h1 className="text-3xl font-bold mb-3">Posts</h1>
        {/* TODO: Add post */}
        <div
          className={
            openAddCard
              ? 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
              : 'fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
          }
          id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Post</h3>
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
                    name="Author"
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
                  onClick={handleAddPost}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-yellow-700 text-white rounded-md shadow-md shadow-yellow-900 px-4 hover:bg-yellow-600 hover:cursor-pointer active:bg-yellow-800 transition-all"
          onClick={() => setOpenAddCard(true)}>
          Add
        </button>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.ids.map((id) => (
          <PostListItem key={id.toString()} postId={Number(id)} />
        ))}
      </ul>
    </div>
  );
}
