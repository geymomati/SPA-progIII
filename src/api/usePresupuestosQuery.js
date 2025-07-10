import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from './axios';

const fetchPresupuestos = async (datasend) => {
  const { data } = await axiosInstance.post('/api/Auth/login', datasend);
  return data;
};

export function usePresupuestosQuery() {
  return useMutation({
    mutationKey: ['presupuestos'],
    mutationFn: async (datasend) => {
      const data = await fetchPresupuestos(datasend);
      return data;  
  }});
}

