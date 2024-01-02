import { createContext, useEffect, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children})=>{
    const [isLoading, setIsloading] = useState(true);
    const [feedbackDatas,setfeedbackDatas] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
      });

    useEffect(()=>{
      fetchFeedback();
    },[])

    const fetchFeedback = async()=>{
      const res = await fetch(`/feedback`);
      const data = await res.json();
      setfeedbackDatas(data);
      setIsloading(false);
    }

    const sendReview = async (val)=>{ 
            let obj = {
                text:val.text,
                rating:Number(val.rating)
              }
            const response = await fetch('/feedback',{
              method:'POST',
              headers:{
                'Content-type':'application/json'
              },
              body: JSON.stringify(obj)
            });

            const data  = await response.json();
            setfeedbackDatas([data,...feedbackDatas]);
      }
      const updateFeedback = async (id,item)=>{
        const res = await fetch(`/feedback/${id}`, {
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(item)
        });

        const data = await res.json();
        setfeedbackDatas(feedbackDatas.map((val)=> (val.id === id ? {...val, ...data}:val)))}
    
      const deletedId =async (id)=>{
        if(window.confirm('Are you want to delete')){
          await fetch(`/feedback/${id}`, {method:'DELETE'})
          setfeedbackDatas(feedbackDatas.filter((val)=> val.id !== id))
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
            updateFeedback,
            isLoading
        }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;