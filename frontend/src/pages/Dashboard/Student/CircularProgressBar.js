import { useState, useEffect, useRef } from "react"
import "../../../assets/css/Dashboard/Student/CircularProgressBar.css"

export default function CircularProgressBar({progressValue = 50, progressValueColor = "#7d2ae8", progressBarColor = "#7d2ae8", remainingProgressBarColor = "#ededed", progressText = "", progressTextColor="#606060", speed=20}){

    const circular_progress = useRef(null)
    const progress_value = useRef(null)
    const [progressStartValue, setProgressStartValue] = useState(progressValue / 2);

    useEffect(() => {
        const progress = setInterval(() => {
            setProgressStartValue(prevValue => {
                const newValue = prevValue + 1;
                if (newValue <= progressValue) {
                    progress_value.current.innerHTML = newValue;
                    circular_progress.current.style.background = `conic-gradient(from 0deg at 50% 50%, ${progressBarColor} ${newValue}%, ${remainingProgressBarColor} 0deg)`;
                }
                return newValue;
            });

            if (progressStartValue >= progressValue)
                clearInterval(progress);
        }, speed);

        return () => clearInterval(progress);
    }, [progressValue, progressBarColor, remainingProgressBarColor, speed, progressStartValue]);

    const progress_text_style = {
        color: progressTextColor
    }

    const progress_value_style = {
        color: progressValueColor
    }

    return (
        <div className="circular-progress-bar">
            <div className="circular-progress" ref={circular_progress}>
                <span className="progress-value" ref={progress_value} style={progress_value_style}>{progressValue}%</span>
            </div>
            <p className="circular-progress-text" style={progress_text_style}>{progressText}</p>
        </div>
    )
}