import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <header className='header'>
            <div className="header-wrapper">
                <nav>
                    <Link to='/' className='header-home'> Home</Link>

                </nav>
                <nav>
                    <Link to='/sendInfo' className='header-home'> Add items</Link>
                </nav>
            </div>
        </header>
    )
}
