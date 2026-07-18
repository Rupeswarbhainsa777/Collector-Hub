import type {FeedPost} from "../../types";


interface PostCardProps {
    post: FeedPost;
    onOpen: (post: FeedPost) => void;
}


const PostCard =({ post, onOpen }: PostCardProps)=>{
    return (
        <></>
    );
}
export default PostCard;