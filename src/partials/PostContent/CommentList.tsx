import React from 'react';

import { Post } from '../../slices/posts';
import CommentListItem from './CommentListItem';

interface ParamsType {
  post: Post;
}

export default function CommentList({ post }: ParamsType) {
  return (
    <div className="mt-10">
      <h1 className="text-xl mb-3">Comments</h1>
      <ul className="flex flex-col gap-3">
        {post.commentIds.map((id) => (
          <CommentListItem key={id} commentId={id} />
        ))}
      </ul>
    </div>
  );
}
