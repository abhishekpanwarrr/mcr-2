import React from 'react'
import { Link } from 'react-router-dom';
import Container from './Container';

const NoMatch = () => {
    return (
        <Container>
            <div className='no-match'>
                <h2>Nothing to see here!</h2>
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </Container>
    );

}

export default NoMatch