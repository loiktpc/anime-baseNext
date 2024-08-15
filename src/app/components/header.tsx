// "use client";
import Link from 'next/link'
import logoHeader from '../../../public/img/logo.png'
import {MenubarDemo} from './menubar'
import {  FaSearch } from 'react-icons/fa';
import Image from 'next/image'

function Header() {
    return ( <>
      <header className="header">
            <Link href="/">
              <Image  className="headerLogo" src={logoHeader} alt="" />
            </Link>
            <form action="" method="post" className="formSreach flex">
          
              <input type="text" className="sreach" placeholder="nhập từ khóa"/>
              <button type="submit" className="button btnsreach" >
              <FaSearch  />
              </button>
            </form>
            <div>
              <MenubarDemo/>
              
            </div>
          </header>
    </> );
}

export default Header;