import React from 'react'
import Sidebar from '../components/sidebar'
import Table from '../components/Table'
import Edit from '../components/Bulk/Edit'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
<div className="d-flex w-100 ">
 <div className="" style={{width:"fit-content"}}><Sidebar/></div>
 <div className=" p-4  " style={{width:"80%"}}>
    <Outlet/>
 </div>
</div>
    )
}
