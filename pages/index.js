import Link from 'next/link';

export default function Home() {
    return(
        <>
            <h1>
                Go to <Link href="/posts/first-post">my first post!</Link>
            </h1>
            <h1>
                <Link href="/list">Go to list!</Link>
            </h1>
        </>
    );
}
