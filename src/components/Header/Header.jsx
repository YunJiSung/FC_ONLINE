import Link from 'next/link'
import Nav from './Nav'

export default function Header() {
  return (
    <header id="header">
        <div className='container'>
            <h1 className='logo'>LOGO</h1>
            <Nav />
        </div>
    </header>
  )
}
