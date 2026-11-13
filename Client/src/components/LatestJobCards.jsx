import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({ job }) {

  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-lg bg-white border border-gray-100 dark:bg-card dark:border-white/10 dark:shadow-black/40 dark:hover:border-[#a78bfa]/40 cursor-pointer hover:scale-110 transition-all duration-600 '>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold dark:text-blue-400" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold dark:text-[#ff6a3d]" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold dark:text-[#c77dff]" variant="ghost">
          {job?.salary} LPA
        </Badge>

      </div>



    </div>

  )
}

export default LatestJobCards