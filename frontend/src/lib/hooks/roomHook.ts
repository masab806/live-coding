import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import api from '../../api/api'
import liveService from '../../services/live.service'


export const getMyRoom = () => {
    return useQuery({
        queryKey: ["room"],
        queryFn: ()=> liveService.fetchRoomId(),
    })
}

export const fetchAllRooms = ()=> {
    return useQuery({
        queryKey: ['allRooms'],
        queryFn: ()=> liveService.fetchAllRooms()
    })
}