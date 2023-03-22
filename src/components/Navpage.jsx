import React from 'react';

import Link from 'next/link';



const Navpage = () => {
    return (
        <div>
            <div className="sectionavb">
    <header className="headernav">
    <Link href="/" className="logonav">inicio</Link>
  
  <input className="menu-btn" type="checkbox" id="menu-btn" />
  <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
  <ul className="menu">
    <li><Link href="/orders" className="mt-4">orders</Link></li> 
    <li><Link href="/Roles" className="mt-4">rols</Link></li>
    <li><Link href="/Categorias" className="mt-4">categories</Link></li>
    <li><Link href="/ProductsModule" className="mt-4">products</Link></li>
    <li><Link href="/Users" className="mt-4">users</Link></li>
  </ul>
</header>
</div>
        </div>
    );
}

export default Navpage;
