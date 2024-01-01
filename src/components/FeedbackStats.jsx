import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
    const {feedbackDatas} = useContext(FeedbackContext);

    const avgRating = feedbackDatas.reduce((acc,cur)=>{
        return acc+cur.rating;
    },0)/feedbackDatas.length

  return (
    <div className='feedback-stats'>
        <h4>{feedbackDatas.length} Reviews</h4>
        <h4>Average Rating: {isNaN(avgRating)?0:avgRating.toFixed(2)}</h4>
    </div>
  )
}

export default FeedbackStats;