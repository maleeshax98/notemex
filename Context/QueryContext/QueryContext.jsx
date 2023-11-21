"use client"
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

import React from 'react'

export default function QueryContextProvider({ children }) {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    </div>
  )
}
