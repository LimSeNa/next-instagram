import {FullPost, SimplePost} from "@/model/post";
import useSWR from "swr";
import Image from "next/image";
import PostUserAvatar from "@/components/PostUserAvatar";
import ActionBar from "@/components/ActionBar";
import CommentForm from "@/components/CommentForm";
import Avatar from "@/components/Avatar";

type Props = {
    post: SimplePost;
};

export default function PostDetail({post}: Props) {
    const {id, userImage, username, image, createdAt, likes} = post;
    const {data} = useSWR<FullPost>(`/api/posts/${id}`);
    const comments = data?.comments;

    return (
        <section className='flex w-full h-full'>
            <div className='relative basis-3/5'>
                <Image className='object-cover'
                       src={image}
                       alt={`photo by ${username}`}
                       sizes='650px'
                       priority
                       fill
                />
            </div>
            <div className='w-full basis-2/5 flex flex-col'>
                <PostUserAvatar image={userImage} username={username}/>
                <ul className='border-t border-gray-200 h-full overflow-y-auto p-4 mb-1'>
                    {comments && comments.map(({image, username: commentUsername, comment}, index) => (
                        <li className='flex items-center mb-1'
                            key={index}
                        >
                            <Avatar image={image}
                                    size='small'
                                    highlight={commentUsername === username}
                            />
                            <div className='ml-2'>
                                <span className='font-bold mr-1'>{commentUsername}</span>
                                <span>{comment}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <ActionBar likes={likes} username={username} createdAt={createdAt}/>
                <CommentForm/>
            </div>
        </section>
    );
}
