import React from 'react'
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardPen } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from '../components/UserInfo';
import { useGetDashboardStatsQuery } from '../redux/slices/api/taskApiSlice';
import {Loading} from '../components/Loading';
// import UserInfo from "../components/UserInfo";

const UserTable = ({users})=>{

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left '>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2 block md:hidden'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({user})=>(
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full flex items-center justify-center text-sm text-white bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>
          <div>
            <p>{user?.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p className={clsx("w-fit rounded px-3 py-1 text-sm",user.isActive?"bg-green-200":"bg-gray-300")}>
          {user?.isActive ? "Active":"Disabled"}
        </p>
      </td>

      <td className='py-2 text-sm block md:hidden'>
        <span>{moment(user?.createdAt).fromNow()}</span>
      </td>

    </tr>
  )


  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 rounded '>
      <table className='w-full mb-5'>
        <TableHeader/>
        <tbody>
          {
            users?.map((user,index)=>(
              <TableRow key={index + user?.id} user={user}/>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left '>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );
  const TableRow = ({task}) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10 '>
        <td className='py-2'>
          <div className='flex items-center gap-2'>
            <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
            <p className='text-base text-black'>{task.title}</p>
          </div>
        </td>
        <td className='py-2'>
          <div className='flex items-center gap-2'>
            <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
            <p className='text-base text-black capitalize'>{task.priority}</p>
          </div>
        </td>
        <td className='py-2'>
          <div className='flex'>
            {
              task.team.map((m,index)=>(
                <div 
                key={index} 
                className={clsx("rounded-full w-7 h-7 text-white flex items-center justify-center text-sm -mr-1",BGS[index%BGS.length])}>
                  
                  <UserInfo user={m}/>
                </div>
              ))
            }
          </div>
        </td>

        <td className='py-2'>
          <div className='flex'>
            <p className='text-base text-gray-600 ml-2'>{moment(task?.date).fromNow()}</p>
          </div>
        </td>

    </tr>
  )
  
  return (
    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <table className='w-full'>
        <TableHeader/>
        <tbody>
          {
            tasks?.map((task,id)=>(
              <TableRow 
               key={id}
               task = {task}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const Dashboard = () => {
  
  const {data,isLoading,error }= useGetDashboardStatsQuery();
  console.log(data);
  const totals = data?.tasks;
  if(isLoading){
    return (
      <div className='py-10'><Loading/></div>
    )
  }
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals?.["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals?.["in progress"] || 0,
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals?.["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  //Card Component
  const Card = ({icon,bg,label,count})=>{
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>

        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white",bg)}>
          {icon}
        </div>

      </div>
    );
  };

  return (
    <div className='h-full py-4'>
      {/* Card */}
      <div className='grid grid-cols-4 gap-5'>
        {
          stats.map(({icon,bg,label,total},index)=>(
            <Card
              key={index}
              icon = {icon}
              bg={bg}
              label={label}
              count={total}
            />
          ))
        }
      </div>

      {/* Charts */}
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-gray-600 text-xl font-semibold'>Chart by Priorty</h4>
        <Chart chartData={data?.graphData}/>
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
          {/* Left */}
            <TaskTable
            tasks = {data?.last10Task}/>
            
          {/* Right */}
          <UserTable users={data?.users}/>

      </div>

    </div>
  )
}

export default Dashboard