import { useEffect, useState } from 'react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {

    const [text,setReview] = useState('');
    const [disabled,setDisabled] = useState(true);
    const [rating,setRating]= useState(10);
    const [message,setMessage] = useState('');
    const {sendReview, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(()=>{
        if(feedbackEdit.edit === true)
        {
            setReview(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
            setDisabled(false);
        }
    },[feedbackEdit])

    const handleChange =(e)=>{
        setReview(e.target.value);
        if(text === '' || text.length > 10)
        {
            setDisabled(true);
            setMessage(text.length > 10 ? 'Text character should be 10':'');
        }
        else{
            setDisabled(false);
        }
    }

    const starChange =(e)=>{
        setRating(e.target.value);
    }
    const submitReview = (e)=>{
        e.preventDefault(); 
        const feedback = {
            text,rating
        }
        if(feedbackEdit.edit === true)
        {
            updateFeedback(feedbackEdit.item.id,feedback)
        }
        else{
            sendReview({text,rating});
        }
    }
    let arr = Array.apply(null, {length: 10}).map(Number.call, Number);

    return (
        <Card>
            <form onSubmit={submitReview}>
                <h2>How would you write our service?</h2>
                <ul className='rating'>
                    { 
                     arr.map(i=>(
                        <li>
                        <input
                            type='radio'
                            id={`num${i + 1}`}
                            name='rating'
                            value={i + 1}
                            onChange={starChange}
                            checked={rating === i + 1}
                            />    
                            <label htmlFor={`num${i + 1}`}>{i + 1}</label>
                        </li>
                     ))
                    }
                    </ul>
                <div className='input-group'>
                    <input type='text' onChange={handleChange} value={text} placeholder='Write your review' />
                    <Button disabled={disabled}  version={'secondary'} type={'text'}>Send</Button>
                </div>
                <div className='message'>{message}</div>
            </form>
        </Card>
    )
}

export default FeedbackForm