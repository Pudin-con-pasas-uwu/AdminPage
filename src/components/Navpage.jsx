import React from 'react';

import Link from 'next/link';



const Navpage = () => {
    return (
        <div>
            <div className="sectionavb">
    <header className="headernav">
    <Link href="/" className="logonav">Log Out</Link>
  
  <input className="menu-btn" type="checkbox" id="menu-btn" />
  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
  <ul className="menu">
    <li><Link href="/orders" className="mt-4">Orders</Link></li> 
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
