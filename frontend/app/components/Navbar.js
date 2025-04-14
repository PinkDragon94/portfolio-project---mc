"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">MC Project</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/get-involved">Get Involved</Link></li>
        </ul>
    </nav>
  );
}

