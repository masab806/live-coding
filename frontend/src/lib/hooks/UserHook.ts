import { useQuery } from "@tanstack/react-query"
import authService from "../../services/auth.service"

interface User {
  _id: string;
  fullName: string;
}


export function getAllUsers(q: string) {
    return useQuery<User[]>({
        queryKey: ['get-users', q],
        queryFn: async () => await authService.getUsers(q),
        staleTime: 1000 * 5,
        enabled: q.trim().length > 0

    })
}