import { useState } from "react";
import type { FeedPost } from "../../types";

import { Badge } from "../common/Badge";
import { timeAgo } from "../../utils/formatters";
import Images from "../common/Images.tsx";
import {useFeedInteractions} from "../../context/FeedInteractionsProvider.tsx";


interface PostCardProps {
    post: FeedPost;
    onOpen: (post: FeedPost) => void;
}

const PostCard=({ post, onOpen }: PostCardProps)=> {
    const { isLiked, isSaved, toggleLike, toggleSave } = useFeedInteractions();
    const liked = isLiked(post.id);
    const saved = isSaved(post.id);

    const [avatarFailed, setAvatarFailed] = useState(false);
    const likeCount = post.likes + (liked ? 1 : 0);

    return (
        <article>
            <button onClick={() => onOpen(post)}>
                {post.user.avatar && !avatarFailed ? (
                    <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        onError={() => setAvatarFailed(true)}
                    />
                ) : (
                    <div>{post.user.name.charAt(0)}</div>
                )}

                <div>
                    <p>{post.user.name}</p>
                    <p>{timeAgo(post.createdAt)}</p>
                </div>
            </button>

            <button onClick={() => onOpen(post)}>
                <Images
                    src={post.image}
                    alt={post.caption}
                />
            </button>

            <div>
                <div>
                    <Badge>{post.category}</Badge>
                </div>

                <p>{post.caption}</p>

                <div>
                    <div>
                        <button onClick={() => toggleLike(post.id)}>
                            <span aria-hidden="true">{liked ? "❤️" : "🤍"}</span>
                            {" "}
                            {likeCount}
                        </button>

                        <button onClick={() => onOpen(post)}>
                            <span aria-hidden="true">💬</span>
                            {" "}
                            {post.comments}
                        </button>
                    </div>

                    <button
                        onClick={() => toggleSave(post.id)}
                        title={saved ? "Saved" : "Save post"}
                    >
                        <span aria-hidden="true">{saved ? "🔖" : "📑"}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default PostCard;