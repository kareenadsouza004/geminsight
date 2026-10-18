import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without specifying firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export interface SessionUser {
  uid: string;
  isAnonymous: boolean;
  email?: string | null;
}

export function getSessionUserId(): string {
  if (auth.currentUser?.uid) {
    return auth.currentUser.uid;
  }
  try {
    let stored = localStorage.getItem('geminsight_visitor_uid');
    if (!stored) {
      stored = 'visitor_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('geminsight_visitor_uid', stored);
    }
    return stored;
  } catch {
    return 'visitor_guest';
  }
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || getSessionUserId(),
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous ?? true,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Seamlessly guarantee a visitor session without forcing the user to sign in
export async function ensureAnonymousAuth(): Promise<SessionUser> {
  if (auth.currentUser) {
    return {
      uid: auth.currentUser.uid,
      isAnonymous: auth.currentUser.isAnonymous,
      email: auth.currentUser.email,
    };
  }

  try {
    const cred = await signInAnonymously(auth);
    return {
      uid: cred.user.uid,
      isAnonymous: cred.user.isAnonymous,
      email: cred.user.email,
    };
  } catch {
    // When anonymous auth is disabled on Google Cloud project, seamlessly use guest visitor session
    return {
      uid: getSessionUserId(),
      isAnonymous: true,
      email: null,
    };
  }
}

// Test connection on app load as per skill guidelines
export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: client is offline.');
    }
  }
}

// Trigger initial connection test immediately
testConnection();
