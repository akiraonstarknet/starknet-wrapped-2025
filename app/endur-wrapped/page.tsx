import App from './App';
import { auth } from '@/auth';

export default async function EndurWrapped() {
  const session = await auth();
  return <App session={session} />;
}

