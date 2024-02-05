import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import {getProviders} from "next-auth/react";
import SignIn from "@/components/SignIn";

type Props = {
    searchParams: {
        callbackUrl: string;
    };
};

export default async function SignInPage({searchParams: {callbackUrl},}: Props) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/');
    }

    const providers = (await getProviders()) ?? {};

    return (
        <section className='flex justify-center mt-[24px]'>
            <SignIn providers={providers}
                    callbackUrl={callbackUrl ?? '/'}
            />
        </section>
    );
}
