import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header id="header">
      <div className="container">
        <Link href="/">
          <h1 className="logo">FC.GG</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
}