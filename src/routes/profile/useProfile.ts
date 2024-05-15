import { cookies } from 'next/headers';
import { queryKeys } from "@/constraints/queryKeys/queryKeys";
import axios from "axios";
import { useQuery } from "react-query";
import { endpoint } from '@/constraints/endpoints';

export default async function useProfile() {
    const { isLoading, isError, data } = useQuery(queryKeys.profile, () => axios.get("/api/me").then((res) => res.data));
    if (isLoading)
        return undefined;
    if (isError)
        return null;
    return data
}