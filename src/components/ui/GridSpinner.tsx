import dynamic from "next/dynamic";

const ClipLoader = dynamic(
    () => import('react-spinners').then(lib => lib.ClipLoader),
    {
        ssr: false,
    }
);

type Props = {
    color?: string;
};

export default function GridSpinner({color = 'red'}: Props) {
    return (
        <ClipLoader color={color}/>
    );
}
