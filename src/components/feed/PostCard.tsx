import { useState } from "react";
import type { FeedPost } from "../../types";

import { Badge } from "../common/Badge";
import { timeAgo } from "../../utils/formatters";
import Images from "../common/Images.tsx";
import { useFeedInteractions } from "../../context/FeedInteractionsProvider.tsx";

interface PostCardProps {
    post: FeedPost;
    onOpen: (post: FeedPost) => void;
}

const PostCard = ({ post, onOpen }: PostCardProps) => {
    const { isLiked, isSaved, toggleLike, toggleSave } = useFeedInteractions();
    const liked = isLiked(post.id);
    const saved = isSaved(post.id);

    const [avatarFailed, setAvatarFailed] = useState(false);
    const likeCount = post.likes + (liked ? 1 : 0);

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <button
                onClick={() => onOpen(post)}
                className="flex items-center gap-3 px-4 pt-4 pb-3 text-left"
            >
                {post.user.avatar && !avatarFailed ? (
                    <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        onError={() => setAvatarFailed(true)}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-bold text-white ring-2 ring-indigo-100">
                        {post.user.name.charAt(0)}
                    </div>
                )}

                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                        {post.user.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {timeAgo(post.createdAt)}
                    </p>
                </div>
            </button>

            <button
                onClick={() => onOpen(post)}
                className="relative block w-full overflow-hidden bg-gray-100"
            >
                <Images
                    src={post.image}
                    alt={post.caption}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
            </button>

            <div className="flex flex-1 flex-col gap-2.5 px-4 py-3">
                <div>
                    <Badge>{post.category}</Badge>
                </div>

                <p
                    className="line-clamp-2 cursor-pointer text-sm font-medium leading-snug text-gray-800 transition-colors hover:text-indigo-600"
                    onClick={() => onOpen(post)}
                >
                    {post.caption}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => toggleLike(post.id)}
                            className={[
                                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-200",
                                liked
                                    ? "bg-rose-50 text-rose-500"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-rose-400",
                            ].join(" ")}
                        >
                            <span aria-hidden="true" className="text-base">
                                {liked ? "❤️" : "🤍"}
                            </span>
                            <span>{likeCount}</span>
                        </button>

                        <button
                            onClick={() => onOpen(post)}
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-indigo-500"
                        >
                            <span aria-hidden="true" className="text-base">
                                💬
                            </span>
                            <span>{post.comments}</span>
                        </button>
                    </div>

                    <button
                        onClick={() => toggleSave(post.id)}
                        title={saved ? "Saved" : "Save post"}
                        className={[
                            "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-200",
                            saved
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-400 hover:bg-gray-100 hover:text-indigo-500",
                        ].join(" ")}
                    >
                        <span aria-hidden="true" className="text-base">
                            {saved ? "🔖" : "📑"}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PostCard;