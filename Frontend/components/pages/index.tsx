import Head from 'next/head';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our website" />
      </Head>

      <main>
        <h1>Welcome to our application</h1>
        <p>Current theme: {theme}</p>
        <p>User is {isAuthenticated ? 'logged in' : 'not logged in'}</p>
      </main>
    </div>
  );
}
