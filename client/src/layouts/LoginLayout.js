import React from 'react'
import { Outlet } from 'react-router-dom'

function LoginLayout() {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default LoginLayout