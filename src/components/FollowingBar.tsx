'use client';
import useSWR from "swr";
import {DetailUser} from "@/model/user";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import {SyncLoader} from "react-spinners";
import ScrollBar from "@/components/ui/ScrollBar";

export default function FollowingBar() {
    const {data, isLoading: loading, error} = useSWR<DetailUser>('/api/me');
    // const users = data?.following;
    // const users = undefined;
    const users = data?.following && [...data?.following, ...data?.following, ...data?.following];

    return (
        <section
            className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
            {loading
                ? <SyncLoader size={8} color='red'/>
                : (!users || users.length === 0) && <p>{`You don't have following.`}</p>
            }
            {users && users.length > 0 && (
                <ScrollBar>
                    {users.map(({image, username}) => (
                        <Link className='flex flex-col items-center w-20'
                              href={`/user/${username}`}
                              key={username}
                        >
                            <Avatar image={image} highlight/>
                            <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>{username}</p>
                        </Link>
                    ))}
                </ScrollBar>
            )}
        </section>
    );
}