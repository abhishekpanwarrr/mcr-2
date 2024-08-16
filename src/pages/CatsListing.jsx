import React, { useCallback, useEffect, useRef, useState } from 'react'
import Container from "../components/Container"
import { CATS_IMAGE_URL } from '../utils/utils'
import CatCard from '../components/CatCard'
import "../styles/cats.css";
import Loading from "../components/Loading"
import Chaicode from '../components/Chaicode';

const CatsListing = () => {
    const [loading, setLoading] = useState(false)
    const [cats, setCats] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const catsContainerRef = useRef(null);

    const fetchCats = useCallback(async () => {
        if (loading || !hasMore) return;
        try {
            setLoading(true);
            const response = await fetch(`https://api.freeapi.app/api/v1/public/cats?page=${page}&limit=5`);
            if (!response.ok) {
                return alert("Network error");
            }
            const { data } = await response.json();
            if (data?.data.length === 0) {
                setHasMore(false); // No more data
            } else {
                setCats(prevCats => [...prevCats, ...data?.data]);
                setPage(prevPage => prevPage + 1); // Increment page number
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    const handleScroll = useCallback(() => {
        const { scrollLeft, scrollWidth, clientWidth } = catsContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
            fetchCats();
        }
    }, [fetchCats]);

    useEffect(() => {
        fetchCats();
    }, []);

    useEffect(() => {
        const container = catsContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <Container imageUrl={CATS_IMAGE_URL}>
            <div className='cats-box'>
                <h1 className='cats-mainHeading'>Cats Around us</h1>
                <div className='chai_code chai-container'>
                    <Chaicode />
                </div>
                <div className='cat-scroll' ref={catsContainerRef}>
                    <section className='cats-container'>
                        {cats.length > 0 ? cats?.map((cat, index) => (
                            <CatCard cat={cat} key={index} />
                        )) : null}
                        {loading && <div className='cats-loadingContainer'>
                            <Loading fontSize={"2rem"} /></div>}
                    </section>
                </div>
            </div>
        </Container>
    )
}

export default CatsListing