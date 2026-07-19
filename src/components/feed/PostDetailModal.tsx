import type {FeedPost} from "../../types";
import {useFeedInteractions} from "../../context/FeedInteractionsProvider.tsx";
import {useEffect} from "react";
import Images from "../common/Images.tsx";
import {timeAgo} from "../../utils/formatters.ts";
import {Badge} from "../common/Badge.tsx";


interface PostDetailModalProps {
    post: FeedPost;
    onClose: () => void;
}


const PostDetailModal = ({ post, onClose }: PostDetailModalProps) => {
    const { isLiked, isSaved, toggleLike, toggleSave } = useFeedInteractions();
    const liked = isLiked(post.id);
    const saved = isSaved(post.id);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);
    return (
        <div
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <Images
                        src={post.image}
                        alt={post.caption}
                    />
                </div>

                <div>
                    <div>
                        <div>
                            {post.user.avatar ? (
                                <img
                                    src={post.user.avatar}
                                    alt={post.user.name}
                                />
                            ) : (
                                <div />
                            )}

                            <div>
                                <p>{post.user.name}</p>
                                <p>{timeAgo(post.createdAt)}</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    <Badge>{post.category}</Badge>

                    <p>{post.caption}</p>

                    <div>
                        <button onClick={() => toggleLike(post.id)}>
                            <span>{liked ? "❤️" : "🤍"}</span>
                            {post.likes + (liked ? 1 : 0)} likes
                        </button>

                        <span>
            <span>💬</span>
                            {post.comments} comments
          </span>

                        <button onClick={() => toggleSave(post.id)}>
                            <span>{saved ? "🔖" : "📑"}</span>
                            {saved ? "Saved" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostDetailModal;