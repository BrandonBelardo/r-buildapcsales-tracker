import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Landing/Navbar";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";

export default function Dashboard() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const { user } = useStateContext();

    useEffect(() => {
        if (!user) {
            alert("You can only access the dashboard once you have signed in.");
            router.push('/');
        }
    }, []);

    useEffect(() => {
        fetch("https://www.reddit.com/r/buildapcsales/new.json")
            .then((res) => res.json())
            .then((data) => setPosts(data.data.children));
    }, []);
    
    return (
        <>
            <Navbar />
            <TitleContainer>
                <h1>r/buildapcsales - Recent Deals</h1>
            </TitleContainer>
            <CenterDiv>
                <PostsContainer>
                    {posts.map((post) => (
                        <PostItem key={post.data.id}>
                            <PostLink href={`https://www.reddit.com${post.data.permalink}`} target="_blank">
                                {post.data.title}
                            </PostLink>
                        </PostItem>
                    ))}
                </PostsContainer>
            </CenterDiv>
        </>

    );
}

const CenterDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const TitleContainer = styled.div`
    margin-top: 100px;
    text-align: center;
    margin-bottom: 20px;
`

const PostsContainer = styled.ul`
    list-style: none;
    padding: 0;
    max-width: 1000px;
    margin: 50px; 
`;

const PostItem = styled.li`
    background: #201d24;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 7px;
    box-shadow: 0px 3px 10px -2px black;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }
`;

const PostLink = styled.a`
    color: #5193e7;
    text-decoration: none;
    display: block;
    transition: color 0.2s;
    
    &:hover {
        color: #ae76e6;
    }
`;