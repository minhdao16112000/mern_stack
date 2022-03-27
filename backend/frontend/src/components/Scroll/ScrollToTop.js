import React, { useEffect, useState } from 'react'
import './style.scss'

export const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }

    }, [])

    return (
        <div style={{ display: 'block' }}>
            <button type='button' onClick={scrollToTop} className='scroll_top' style={{ display: visible ? 'inline' : 'none' }}>
                {/* <i className='fa-solid fa-arrow-up-to-line'></i> */}
                <i className='fas fa-chevron-up'></i>
            </button>
        </div>
    )
}
