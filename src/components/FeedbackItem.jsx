import Card from "../shared/Card";
import PropTypes from 'prop-types';
import {FaTimes, FaEdit} from 'react-icons/fa';
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({key,item}){

    const {deletedId,editFeedback} = useContext(FeedbackContext);
    
    return(
        <Card key={key} reverse={false}>
            <div className="num-display">{item.rating}</div>
            <button className="close" onClick={()=>deletedId(item.id)}>
                <FaTimes color="purple"/>
            </button>
            <button className="edit">
                <FaEdit color="purple" onClick={()=>editFeedback(item)}/>
            </button>
            <div className="text-display">
                {item.text}
            </div>
        </Card>
    )
}

FeedbackItem.propType = {
    item:PropTypes.object,
    reverse:PropTypes.bool
}

export default FeedbackItem;