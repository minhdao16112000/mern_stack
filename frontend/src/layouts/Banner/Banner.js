import React from 'react'
import { Link } from 'react-router-dom';

const Banner = (props) => {
    var listCate = []
    if(props.listCate){
        listCate = props.listCate.filter((value) => value.parentCate === "");
    }

    return (
        <div className="banner-section spad">
            <div className="container-fluid">
                <div className="row">
                    {listCate.map((value, key) => {
                        return (
                            <div key={key} className="col-lg-4">
                                <Link to={`category/${value.slug}`}>
                                    <div className="single-banner">
                                        <img src={`http://localhost:5000/categories/${value.image}`} alt="" />
                                        <div className="inner-text">
                                            <h4>{value.name}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Banner
