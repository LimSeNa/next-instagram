'use client';
import {ClientSafeProvider, signIn} from "next-auth/react";
import ColorButton from "@/components/ui/ColorButton";

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};

export default function SignIn({providers, callbackUrl}: Props) {
    console.log(callbackUrl);
    return (
        <>
            {Object.values(providers).map(({name, id}) => (
                <ColorButton key={id}
                             text={`Sign In with ${name}`}
                             onClick={() => signIn(id, {callbackUrl})}
                             size='big'
                />
            ))}
        </>
    );
}
