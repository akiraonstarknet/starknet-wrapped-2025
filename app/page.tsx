import App from '../src/app/App';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return <App session={session} />;
}
