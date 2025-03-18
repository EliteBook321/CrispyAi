import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import History from './History';

export default async function HistoryPage() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  if (!userEmail) {
    return <div className="text-center text-red-500 mt-5">User not found.</div>;
  }

  const historyList = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, userEmail))
    .orderBy(desc(AIOutput.id));

  return <History historyList={historyList} />;
}