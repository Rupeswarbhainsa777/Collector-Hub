import type {FeedPost} from "../../types";
import {useFeedInteractions} from "../../context/FeedInteractionsProvider.tsx";
import {Badge} from "../common/Badge.tsx";
import {timeAgo} from "../../utils/formatters.ts";
import {useState} from "react";
import Images from "../common/Images.tsx";


interface PostCardProps {
    post: FeedPost;
    onOpen: (post: FeedPost) => void;
}


const PostCard =({ post, onOpen }: PostCardProps)=>{

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
                    <div>
                        {post.user.name.charAt(0)}
                    </div>
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
                            <span>{liked ? "❤️" : "🤍"}</span> {likeCount}
                        </button>

                        <button onClick={() => onOpen(post)}>
                            <span>💬</span> {post.comments}
                        </button>
                    </div>

                    <button
                        onClick={() => toggleSave(post.id)}
                        title={saved ? "Saved" : "Save post"}
                    >
                        <span>{saved ? "🔖" : "📑"}</span>
                    </button>
                </div>
            </div>
        </article>
    );
}
export default PostCard;