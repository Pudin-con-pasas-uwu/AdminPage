import React from 'react';

import Link from 'next/link';



const Navpage = () => {

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location= ('/');
    return false
  }

    return (
        <div>
            <div className="sectionavb">
    <header className="headernav">
    <button onClick={handleLogout}  className="logonav">Log Out</button>
  
  <input className="menu-btn" type="checkbox" id="menu-btn" />
  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
  <ul className="menu">
    <li><Link href="/OrdersModule/orders" className="mt-4">Orders</Link></li> 
    <li><Link href="/Roles" className="mt-4">Roles</Link></li>
    <li><Link href="/Categorias" className="mt-4">Categories</Link></li>
    <li><Link href="/ProductsModule" className="mt-4">Products</Link></li>
    <li><Link href="/Users" className="mt-4">Users</Link></li>
  </ul>
</header>
</div>
        </div>
    );
}

export default Navpage;
