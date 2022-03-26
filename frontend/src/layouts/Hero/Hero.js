import React from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
    const lisImage = useSelector(state => state.image.images);
    var images = [];
    if(lisImage.Images){
        images = lisImage.Images.filter((value) => value.position === '0');
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    return (
        <section className="hero-section">
            <div>
                <Slider {...settings}>
                    {images.length !== 0
                        ? images.map(value => {
                            return (
                                <div key={value._id} className="hero-items owl-carousel">
                                    <div
                                        className="single-hero-items set-bg"
                                        style={{ backgroundImage: `url(http://localhost:5000/images/${value.image})` }}
                                    >
                                    </div>
                                </div>
                            )
                        })
                        : <></>}
                </Slider>
            </div>
        </section>
    );
}

export default Hero
