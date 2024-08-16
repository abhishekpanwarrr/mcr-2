import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import Chaicode from "../components/Chaicode";
import Loading from '../components/Loading';
import { USER_API_URL, USER_IMAGE_URL } from '../utils/utils';

const RandomUser = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchRandomUser = async () => {
        try {
            setLoading(true)
            const response = await fetch(USER_API_URL);
            if (!response.ok) {
                return alert("Network error")
            }
            const { data } = await response.json()
            setUser(data)
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { fetchRandomUser() }, [])
    return (
        <Container imageUrl={USER_IMAGE_URL}>
            <section className='random-user-container'>
                <ProfilHeader loading={loading} fetchRandomUser={fetchRandomUser} />
                {loading ? <div style={{
                    minHeight: "600px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Loading fontSize={"2rem"} />
                </div> :
                    <>
                        <ProfileImageContainer user={user} />
                        <LocationContainer user={user} />
                        <UserInfo user={user} />
                        <Chaicode />
                    </>}
            </section>
        </Container>
    )
}
export default RandomUser

function ProfilHeader({ loading, fetchRandomUser }) {
    return <div className='user__header'>
        <span className='header__icon'>&larr;</span>
        <p>Profil Overview</p>
        {loading ? <div>
            <Loading />
        </div> : <span className='header__icon' role='buton' onClick={fetchRandomUser}>&#8635;</span>}
    </div>
}

function ProfileImageContainer({ user }) {
    return (
        <div className='image__container'>
            <div className="image">
                <img src={user?.picture?.medium} alt={user?.name?.first} />
                <span>{user?.name?.title}</span>
            </div>
            <div className="image__name">{`${user?.name?.first} ${user?.name?.last}`}</div>
            <div className="image__username">@{user?.login?.username}</div>
        </div>
    )
}

function LocationContainer({ user }) {
    return (
        <section className='location__container'>
            <div className='location__container_inner'>
                <a href={`https://www.google.com/maps?q=${user?.location?.coordinates?.latitude},${user?.location?.coordinates?.longitude}`}
                    className='location_link_container'
                    target='_blank'
                >
                    <div className='location_link_container_inner'>
                        <FaLocationDot size={18} />
                    </div>
                    <span className='location_link_span'>Location</span>
                </a>
                <a href={`tel:${user?.cell}`} target='_blank'
                    className='location_link_container'>
                    <div className='location_link_container_inner'>
                        <FaPhone size={18} />
                    </div>
                    <span className='location_link_span'>Call</span>
                </a>
            </div>
        </section>
    )
}

function UserInfo({ user }) {
    function changeDate(string) {
        const date = new Date(string);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate
    }
    return (
        <section className='user__info'>
            <p className='user__infoBox'>
                <span className='user__infoKey'>City</span>
                <span className='user__infoValue'>{user?.location?.city}</span>
            </p >
            <p className='user__infoBox'>
                <span className='user__infoKey'>Nationality</span>
                <span className='user__infoValue'>{user?.nat}</span>
            </p>
            <p className='user__infoBox'>
                <span className='user__infoKey'>D.O.B</span>
                <span className='user__infoValue'>{changeDate(user?.dob?.date)}</span>
            </p>
            <p className='user__infoBox'>
                <span className='user__infoKey'>Phone No.</span>
                <span className='user__infoValue'>{user?.phone}</span>
            </p>
            <p className='user__infoBox'>
                <span className='user__infoKey'>Time Zone</span>
                <span className='user__infoValue'>{user?.location?.timezone?.offset} {user?.location?.timezone?.description}</span>
            </p>
            <p className='user__infoBox'>
                <span className='user__infoKey'>Registered Since</span>
                <span className='user__infoValue'>{changeDate(user?.registered?.date)}</span>
            </p>
        </section>
    )
}