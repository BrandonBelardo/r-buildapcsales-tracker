import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Landing/Navbar";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { storeLatestPost } from "@/backend/Database";
import Link from "next/link";
import { notifyUser } from "@/backend/Telegram";

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
            .then((data) => {
                setPosts(data.data.children); 
                storeLatestPost(data.data.children); 
            })
            .catch((error) => console.error("Error fetching Reddit posts:", error));
    }, []);
    
    return (
        <>
            <Navbar />
            <TitleContainer>
                <h1>r/buildapcsales - Recent Deals</h1>
                <h3>Configure Notifications with Telegram:</h3>
                <ConfigureContainter>
                    <ConfigureButton href="/dashboard/notifications">
                    <TelegramIcon/>
                    Configure
                    </ConfigureButton>
                </ConfigureContainter>
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

const ConfigureContainter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ConfigureButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; 
    background-color: #179cde;
    padding: 0.5rem 0.875rem;
    margin: 1rem;
    font-weight: 750;
    font-size: 1.1rem;
    border: none;
    border-radius: 0.2rem;
    width: 7rem;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color:rgb(15, 123, 177);
    }
    
    svg {
        width: 20px;
        height: 20px;
        fill: white

    }
`;

const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="20" height="20">
        <path fill="white" d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
    </svg>
);