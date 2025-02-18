import React, { useState } from 'react';
import { TASK_TYPE, PRIOTITYSTYELS, formatDate, getInitials, BGS } from '../utils';
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import {useSelector} from 'react-redux';
import clsx from 'clsx';
import TaskDialog from './TaskDialog';
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from 'react-icons/fa';
import UserInfo from '../components/UserInfo';

const ICONS = {
high: <MdKeyboardDoubleArrowUp />,
medium: <MdKeyboardArrowUp />,
low: <MdKeyboardArrowDown />,
};
const TaskCard = ({task}) => {
    const {user} = useSelector((state)=>state.auth);
    const [open, setOpen] = useState(false);
  return (
    <>
        <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
            <div className='w-full justify-between flex'>
                <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYELS[task?.priority])}>
                    <span className='text-lg'>{ICONS[task?.priority]}</span>
                    <span className='uppercase'>{task?.priority} Priority</span>
                </div>
                {
                    user?.isAdmin && <TaskDialog task={task}/>
                }
            </div>
            <>
            <div className='flex items-center gap-2 mt-2'>
                <div className={clsx("w-4  h-4 rounded-full",TASK_TYPE[task.stage])}/>
                {/* Line-clamp-1 it will adjust text content to keep in 1 line and remaining as ... */}
                <h4 className='line-clamp-1'>{task?.title}</h4>
                
            </div>
            
            <span className='text-sm text-gray-600'>
                {formatDate(new Date(task?.date))}
            </span>
            <div className='w-full border-t border-gray-200 my-2'/>
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex gap-1 items-center text-gray-600'>
                            <BiMessageAltDetail/>
                            <span>{task?.activities?.length}</span>
                        </div>
                        <div className='flex gap-1 items-center text-gray-600'>
                            <MdAttachFile/>
                            <span>{task?.assets?.length}</span>
                        </div>                        <div className='flex gap-1 items-center text-gray-600'>
                            <FaList/>
                            <span>{task?.subTasks?.length}</span>
                        </div>
                </div>
                
                <div className='flex flex-row-reverse'>
                            {task?.team?.map((m,index)=>(
                                <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length])}>
                                    <UserInfo user={m}/>
                                </div>
                            ))}
                </div>
            </div>
        </>
        </div>

    </>
  )
}

export default TaskCard