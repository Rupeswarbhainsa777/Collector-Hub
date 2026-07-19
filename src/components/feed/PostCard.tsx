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
            {/* User header — hidden on mobile, shown on sm+ */}
            <button
                onClick={() => onOpen(post)}
                className="hidden sm:flex items-center gap-3 px-4 pt-4 pb-3 text-left"
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

            {/* Image — with overlaid user info on mobile */}
            <button
                onClick={() => onOpen(post)}
                className="relative block w-full overflow-hidden bg-gray-100"
            >
                <Images
                    src={post.image}
                    alt={post.caption}
                    className="aspect-square sm:aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 sm:h-12 bg-gradient-to-t from-black/50 sm:from-black/30 to-transparent" />

                {/* Mobile-only: user info overlaid on image */}
                <div className="absolute top-0 inset-x-0 flex items-center gap-2 px-2.5 pt-2.5 sm:hidden">
                    <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2 py-1 min-w-0">
                        {post.user.avatar && !avatarFailed ? (
                            <img
                                src={post.user.avatar}
                                alt={post.user.name}
                                onError={() => setAvatarFailed(true)}
                                className="h-5 w-5 rounded-full object-cover ring-1 ring-white/50 shrink-0"
                            />
                        ) : (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white shrink-0">
                                {post.user.name.charAt(0)}
                            </div>
                        )}
                        <p className="truncate text-[11px] font-semibold text-white leading-none">
                            {post.user.name}
                        </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[10px] text-white/70 font-medium">
                        {timeAgo(post.createdAt)}
                    </span>
                </div>
            </button>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3">
                <div>
                    <Badge>{post.category}</Badge>
                </div>

                <p
                    className="line-clamp-2 cursor-pointer text-xs sm:text-sm font-medium leading-snug text-gray-800 transition-colors hover:text-indigo-600"
                    onClick={() => onOpen(post)}
                >
                    {post.caption}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-2 sm:pt-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        <button
                            onClick={() => toggleLike(post.id)}
                            className={[
                                "flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all duration-200",
                                liked
                                    ? "bg-rose-50 text-rose-500"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-rose-400",
                            ].join(" ")}
                        >
                            <span aria-hidden="true" className="text-sm sm:text-base">
                                {liked ? "❤️" : "🤍"}
                            </span>
                            <span>{likeCount}</span>
                        </button>

                        <button
                            onClick={() => onOpen(post)}
                            className="flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-indigo-500"
                        >
                            <span aria-hidden="true" className="text-sm sm:text-base">💬</span>
                            <span>{post.comments}</span>
                        </button>
                    </div>

                    <button
                        onClick={() => toggleSave(post.id)}
                        title={saved ? "Saved" : "Save post"}
                        className={[
                            "flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-all duration-200",
                            saved
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-400 hover:bg-gray-100 hover:text-indigo-500",
                        ].join(" ")}
                    >
                        <span aria-hidden="true" className="text-sm sm:text-base">
                            {saved ? "🔖" : "📑"}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PostCard;