import React, { useEffect, useState } from 'react'
import Container from "../components/Container";
import { JOKES_API_URL, JOKES_IMAGE_URL } from '../utils/utils';
import "../styles/jokes.css";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { RiShare2Line } from "react-icons/ri";
import Loading from "../components/Loading"
import { getRandomFloat } from '../utils/facade';
import { MdVerified } from "react-icons/md";
import Chaicode from "../components/Chaicode";

const tweetData = [
    {
        id: 1,
        text: `${getRandomFloat(7.0, 2.0, 1)}k`,
        icon: <FaRegComment />
    },
    {
        id: 2,
        text: `${getRandomFloat(7.0, 2.0, 1)}k`,
        icon: <FaRetweet />
    },
    {
        id: 3,
        text: `${getRandomFloat(7.0, 2.0, 1)}k`,
        icon: <FaRegHeart />
    },
    {
        id: 4,
        text: `${getRandomFloat(7.0, 2.0, 1)}k`,
        icon: <FaRegBookmark />
    },
    {
        id: 5,
        text: `${getRandomFloat(7.0, 2.0, 1)}k`,
        icon: <RiShare2Line />
    },
]

const RandomJokes = () => {
    return (
        <Container imageUrl={JOKES_IMAGE_URL}>
            <section className='joke_container'>
                <JokeHeader />
                <JokeUser />
                <Joke />
                <JokeAnalytics />
            </section>
            <div className='chai_code'>
                <Chaicode />
            </div>
        </Container>
    )
}

export default RandomJokes

const JokeHeader = () => {
    return <div className='joke_header'>
        <span className='header__icon'>&larr;</span>
        <p>Post</p>
    </div>
}

function JokeUser() {
    return <div className='joke_user_container'>
        <div className='joke_inner'>
            <img src='https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
            <div className='joke_user_info'>
                <p className='joke_name'>Elon musk <MdVerified color='#1c99ed' /></p>
                <p className='joke_username'>@elonmusk</p>
            </div>
        </div>
        <HiDotsHorizontal />
    </div>
}

function JokeAnalytics() {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return (
        <section className='joke_analytics'>
            <p >{currentTime} | {currentDate} | {getRandomFloat(9.0, 2.8, 2)}M Views</p>
            <div className='joke_analytics_iconContainer'>
                {tweetData.map(tweet => (
                    <div key={tweet.id} className='joke_analytics_icon'>
                        <p>{tweet.icon}</p>
                        <p>{tweet.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function Joke() {
    const [joke, setJoke] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await fetch(JOKES_API_URL);
                if (!response.ok) {
                    return alert("Network error!")
                }
                const { data } = await response.json()
                setJoke(data?.content)
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        })()
    }, [])
    return (
        <div className='joke'>
            {loading ? <div className='joke-loading'>
                <Loading fontSize={"1.5rem"} />
            </div> : joke}
        </div>

    )
}