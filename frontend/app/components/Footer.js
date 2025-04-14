"use client";

import Image from "next/image";
import styles from "./Footer.module.css"
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>

        <a href="/next-app" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Alumni
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Vendors
        </a>
      </div>

      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} My Site | All Rights Reserved
      </p>
    </footer>
  );
}
