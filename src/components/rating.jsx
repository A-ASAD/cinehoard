import React, { useEffect } from 'react'
import { useState } from 'react';
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function Rating({value}) {
    const [rating, setRating] = useState(0);
    const colors = ['#f33', '#f33', 'yellow', '#1f1', '#1f1'];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRating(value);
        }, 300);
        return () => clearTimeout(timeout);
        //eslint-disable-next-line
    }, [])

    return (
        <CircularProgressbar
            value={rating*10}
            text={rating}
            strokeWidth={7}
            styles={buildStyles({
                textSize: '35px',
                pathTransitionDuration: 1.5,
                textColor: colors[Math.round(rating/2)-1],
                trailColor: '#888',
                pathColor: colors[Math.round(rating/2)-1],
            })}
        />
    )
}
