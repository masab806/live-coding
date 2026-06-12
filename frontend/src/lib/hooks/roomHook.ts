import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import api from '../../api/api'
import liveService from '../../services/live.service'

type User = {
    _id: string,
    fullName: string
}

export const getMyRoom = (userId: string) => {
    console.log(userId)
    return useQuery({
        queryKey: ["room", userId],
        queryFn: ()=> liveService.fetchRoomId(userId),
        enabled: !!userId
    })
}