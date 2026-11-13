
import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get(
                    `${JOB_API_END_POINT}/get`,
                    {
                        params: {
                            keyword: searchedQuery || '',
                            _t: Date.now()
                        },
                        withCredentials: true,
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        }
                    }
                );

                console.log('Jobs API response:', response.data);
                console.log('Jobs received:', response.data.jobs);

                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs || []));
                }
            } catch (error) {
                console.error(
                    'Jobs API error:',
                    error.response?.status,
                    error.response?.data || error.message
                );
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
