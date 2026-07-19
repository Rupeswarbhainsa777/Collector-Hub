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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                style={{ maxHeight: '90vh' }}
            >


                <div className="relative hidden w-[55%] flex-shrink-0 bg-gray-950 md:block">
                    <Images
                        src={post.image}
                        alt={post.caption}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>


                <div className="flex flex-1 flex-col overflow-y-auto">


                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div className="flex items-center gap-3">
                            {post.user.avatar ? (
                                <img
                                    src={post.user.avatar}
                                    alt={post.user.name}
                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-bold text-white">
                                    {post.user.name.charAt(0)}
                                </div>
                            )}

                            <div>
                                <p className="text-sm font-semibold text-gray-900">{post.user.name}</p>
                                <p className="text-xs text-gray-400">{timeAgo(post.createdAt)}</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>


                    <div className="block md:hidden">
                        <Images
                            src={post.image}
                            alt={post.caption}
                            className="aspect-video w-full object-cover"
                        />
                    </div>


                    <div className="flex flex-1 flex-col gap-4 px-5 py-5">
                        <Badge>{post.category}</Badge>
                        <p className="text-base leading-relaxed text-gray-800">{post.caption}</p>
                    </div>


                    <div className="border-t border-gray-100 px-5 py-4">
                        <div className="flex items-center gap-2">


                            <button
                                onClick={() => toggleLike(post.id)}
                                className={[
                                    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                                    liked
                                        ? "bg-rose-50 text-rose-500 ring-1 ring-rose-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500",
                                ].join(" ")}
                            >
                                <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
                                {post.likes + (liked ? 1 : 0)} likes
                            </button>


                            <span className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                                <span className="text-lg">💬</span>
                                {post.comments} comments
                            </span>


                            <button
                                onClick={() => toggleSave(post.id)}
                                className={[
                                    "ml-auto flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                                    saved
                                        ? "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600",
                                ].join(" ")}
                            >
                                <span className="text-lg">{saved ? "🔖" : "📑"}</span>
                                {saved ? "Saved" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>


                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:hidden"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
export default PostDetailModal;