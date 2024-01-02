import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './Spinner';

function FeedbackList({deleteId}) {
    const {feedbackDatas,isLoading}= useContext(FeedbackContext);

    if(!isLoading && !feedbackDatas || feedbackDatas.length === 0)
    {
        return <div className="feedback-list">No Data</div>
    }
    return isLoading ? (<Spinner />):(
        <div className="feedback-list">
            <AnimatePresence>
            {
                feedbackDatas.map((val,index)=>(
                    <motion.div
                    key={val.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                    <FeedbackItem key={index} item={val} handleDelete={(id)=>deleteId(id)} />
                    </motion.div>
                ))
            }
            </AnimatePresence>
        </div>
        )
}

 

export default FeedbackList