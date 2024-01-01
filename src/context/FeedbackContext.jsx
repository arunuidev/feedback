import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children})=>{
    const [feedbackDatas,setFeedback] = useState([
        {
            id: 1,
            rating: 10,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 2,
            rating: 9,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 3,
            rating: 8,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
    ]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
      })
    const sendReview = (val)=>{ 
            let obj = {
                id:feedbackDatas.length+1,
                text:val.text,
                rating:Number(val.rating)
              }
            setFeedback([obj,...feedbackDatas]);
      }
      const updateFeedback = (id,item)=>{
        setFeedback(feedbackDatas.map((val)=> (val.id === id ? {...val, ...item}:val)))}
    
      const deletedId = (id)=>{
        if(window.confirm('Are you want to delete')){
          setFeedback(feedbackDatas.filter((val)=> val.id !== id))
        }
      }

      const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit: true,
          })
      }

      
    return( 
        <FeedbackContext.Provider
        value={{
            feedbackDatas,
            sendReview,
            deletedId,
            editFeedback,
            feedbackEdit,
            updateFeedback
        }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;