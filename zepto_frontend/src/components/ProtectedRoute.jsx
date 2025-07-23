import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({Children}) => {
    const {user} = useUser()
  return (
    <div>
        {
            user ? Children : <Navigate to='/'/>
        }
    </div>
  )
}
