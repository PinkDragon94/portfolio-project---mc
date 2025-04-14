import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {<Image
  className={styles.logo}
  src="/your-logo.png"
  alt="Your custom logo"
  width={180}
  height={38}
  priority
/>}
          <ul>
          <li>
            Welcome to the Home Page 
          </li>
          <li>Currently Under Construction</li>
        </ul>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Log-In
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Register
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Alumni
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Vendors
        </a>
      </footer>
    </div>
  );
}
 