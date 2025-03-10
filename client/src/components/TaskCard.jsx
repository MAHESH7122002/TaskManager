import React, { useState } from 'react';
import { TASK_TYPE, PRIOTITYSTYELS, formatDate, getInitials, BGS } from '../utils';
import { MdAttachFile, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import {useSelector} from 'react-redux';
import clsx from 'clsx';
import TaskDialog from './task/TaskDialog';
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from 'react-icons/fa';
import UserInfo from '../components/UserInfo';
import {IoMdAdd, IoMdAddCircle} from 'react-icons/io';
import AddSubTask from './task/AddSubTask';

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

                {/* Sub Task */} 
                {
                    task?.subTasks?.length>0 ? 
                    <div className='py-4 border-t border-gray-200'>
                        <h5 className='text-base line-clamp-1'>
                            {
                                task?.subTasks[0].title
                            }
                        </h5>
                        <div className='p-4 space-x-8 '>
                            <span className='text-sm text-gray-600'>
                                {formatDate(new Date(task?.subTasks[0]?.date))}
                            </span>
                            <span className='bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium'>{task?.subTasks[0]?.tag}</span>
                        </div>

                    </div>
                    :
                    (
                        <div className='py-4 border-t border-gray-200'>
                            <span className='text-gray-400'>No Sub Task</span>
                        </div>
                    )
                }
                {/* Add SubTask */}
                <div className='w-full'>
                    <button 
                    onClick={()=>setOpen(true)}
                    className='w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'>        
                        <IoMdAdd className='text-lg' />
                        <span>Add SubTask</span>
                    </button>
                </div>
                <AddSubTask open={open} setOpen={setOpen} id={task._id} />
        </>
        </div>

    </>
  )
}

export default TaskCard