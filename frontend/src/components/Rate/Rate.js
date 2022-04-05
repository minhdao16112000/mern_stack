import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Rate = ({ count, rating, onRating }) => {
    const [hoverRating, setHoverRating] = useState(5);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getStar = (index) => {
        if (hoverRating >= index) {
            return 'fa fa-star';
        } else if (!hoverRating && rating >= index) {
            return 'fa fa-star';
        }

        return 'fa fa-star-o';
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <i
                    key={idx}
                    className={getStar(idx)}
                    onClick={() => onRating(idx)}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ));
    }, [count, getStar, onRating]);

    return <div className="rating vote-star">{starRating}</div>;
};

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
};

Rate.defaultProps = {
    count: 5,
    rating: 5,
};

export default Rate;
