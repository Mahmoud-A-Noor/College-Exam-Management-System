import { useState, useEffect, useRef } from "react"
import "../../../../assets/css/Dashboard/Student/CircularProgressBar.css"

export default function CircularProgressBar({progressValue = -1, progressValueColor = "#7d2ae8", progressBarColor = "#7d2ae8", remainingProgressBarColor = "#ededed", progressText = "", progressTextColor="#606060", speed=20}){

    const circular_progress = useRef(null)
    const progress_value = useRef(null)
    const [progressStartValue, setProgressStartValue] = useState(Math.round(progressValue / 2));

    if(progressValue >= 85){
        // eslint-disable-next-line
        progressValueColor = "rgb(27, 175, 106)";
    }
    else if(progressValue >= 50){
        // eslint-disable-next-line
        progressValueColor = "rgb(34, 50, 225)";
    }
    else{
        // eslint-disable-next-line
        progressValueColor = "rgba(219, 0, 36)";
    }
    
    const progress_text_style = {
        color: progressTextColor
    }

    const progress_value_style = {
        color: progressValueColor
    }

    useEffect(() => {

        if(progressValue >= 85){
            // eslint-disable-next-line
            progressBarColor = "rgb(27, 175, 106)";
        }
        else if(progressValue >= 50){
            progressBarColor = "rgb(34, 50, 225)";
        }
        else{
            progressBarColor = "rgba(219, 0, 36)";
        }

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

    return (
        <div className="circular-progress-bar">
            <div className="circular-progress" ref={circular_progress}>
                {
                    progressValue !== -1?
                    <span className="progress-value" ref={progress_value} style={progress_value_style}>{progressValue}%</span>
                    :
                    null
                }
                
            </div>
            {
                progressText &&
                <p className="circular-progress-text" style={progress_text_style}>{progressText}</p>
            }
        </div>
    )
}