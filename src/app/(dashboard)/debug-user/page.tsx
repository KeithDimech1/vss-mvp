import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session');

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token.value, JWT_SECRET);
    return payload as { userId: string };
  } catch (error) {
    return null;
  }
}

export default async function DebugUserPage() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug: User Info</h1>
        <p className="text-red-600">No session found - not logged in</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
      createdAt: true
    }
  });

  const MANAGEMENT_TEAM = ['keith', 'fabian', 'wayne', 'moritz', 'vinko'];
  const isManager = user ? MANAGEMENT_TEAM.includes(user.username) : false;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: User Info</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4">Current User</h2>
        {user ? (
          <div className="space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Created:</strong> {user.createdAt.toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-red-600">User not found in database</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Management Team Check</h2>
        <p><strong>Management Team:</strong> {MANAGEMENT_TEAM.join(', ')}</p>
        <p className="mt-2">
          <strong>Is Manager:</strong>{' '}
          <span className={isManager ? 'text-green-600' : 'text-red-600'}>
            {isManager ? 'YES ✓' : 'NO ✗'}
          </span>
        </p>
        {!isManager && user && (
          <p className="mt-4 text-amber-700 bg-amber-50 p-4 rounded">
            ⚠️ Your username "{user.username}" is not in the management team list.
            <br />
            Action pages are restricted to management team members only.
          </p>
        )}
      </div>
    </div>
  );
}
