import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth, ensureAnonymousAuth, handleFirestoreError, OperationType } from '../lib/firebase';
import { PersonaType, StrategyItem, ChatMessage, ActionItem } from '../types';
import { PERSONA_DATA } from '../data/personaData';

const STRATEGIES_COLLECTION = 'strategies';
const CHAT_COLLECTION = 'chatMessages';

/**
 * Sanitize document ID for Firestore
 */
function cleanDocId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
}

/**
 * Subscribe to strategies for a specific persona from Firestore.
 * Automatically seeds default strategies for the persona if not yet in database.
 */
export function subscribeToStrategies(
  persona: PersonaType,
  onUpdate: (strategies: StrategyItem[]) => void
): () => void {
  let unsubscribe: (() => void) | null = null;
  let isCancelled = false;

  ensureAnonymousAuth().then((currentUser) => {
    if (isCancelled) return;

    try {
      const q = query(
        collection(db, STRATEGIES_COLLECTION),
        where('persona', '==', persona)
      );

      unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            // Seed initial strategies for this persona
            const defaultStrats = PERSONA_DATA[persona]?.strategies || [];
            if (defaultStrats.length > 0) {
              try {
                for (const strat of defaultStrats) {
                  const docId = cleanDocId(strat.id);
                  await setDoc(doc(db, STRATEGIES_COLLECTION, docId), {
                    ...strat,
                    id: docId,
                    persona,
                    userId: currentUser.uid,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  });
                }
              } catch (seedErr) {
                console.warn('Seeding initial strategies error:', seedErr);
                // Return default in memory while write completes
                onUpdate(defaultStrats);
              }
            } else {
              onUpdate([]);
            }
          } else {
            const list: StrategyItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                id: data.id || docSnap.id,
                headline: data.headline || data.title || 'Executive Strategic Directive',
                twoSentenceDetail: data.twoSentenceDetail || '',
                tag: data.tag || 'Good',
                percentCompleted: typeof data.percentCompleted === 'number' ? data.percentCompleted : 0,
                actions: Array.isArray(data.actions) ? data.actions : [],
              });
            });

            // Sort by creation or ID to preserve consistent order
            onUpdate(list);
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, STRATEGIES_COLLECTION);
        }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, STRATEGIES_COLLECTION);
    }
  });

  return () => {
    isCancelled = true;
    if (unsubscribe) {
      unsubscribe();
    }
  };
}

/**
 * Save or create a strategy in Firestore
 */
export async function saveStrategyToFirestore(
  strategy: StrategyItem,
  persona: PersonaType
): Promise<void> {
  const user = await ensureAnonymousAuth();
  const docId = cleanDocId(strategy.id);
  const path = `${STRATEGIES_COLLECTION}/${docId}`;

  try {
    await setDoc(
      doc(db, STRATEGIES_COLLECTION, docId),
      {
        ...strategy,
        id: docId,
        persona,
        userId: user.uid,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Update progress or action items for a strategy in Firestore
 */
export async function updateStrategyProgressInFirestore(
  strategyId: string,
  percentCompleted: number,
  actions?: ActionItem[]
): Promise<void> {
  await ensureAnonymousAuth();
  const docId = cleanDocId(strategyId);
  const path = `${STRATEGIES_COLLECTION}/${docId}`;

  try {
    const updatePayload: Record<string, any> = {
      percentCompleted,
      updatedAt: new Date().toISOString(),
    };
    if (actions) {
      updatePayload.actions = actions;
    }
    await updateDoc(doc(db, STRATEGIES_COLLECTION, docId), updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Subscribe to Talk to Data chat history for a persona in Firestore
 */
export function subscribeToChatMessages(
  persona: PersonaType,
  onUpdate: (messages: ChatMessage[]) => void
): () => void {
  let unsubscribe: (() => void) | null = null;
  let isCancelled = false;

  ensureAnonymousAuth().then(() => {
    if (isCancelled) return;

    try {
      const q = query(
        collection(db, CHAT_COLLECTION),
        where('persona', '==', persona)
      );

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: (ChatMessage & { createdAt?: string })[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: data.id || docSnap.id,
              role: data.role || 'user',
              text: data.text || '',
              timestamp: data.timestamp || '',
              followUps: data.followUps || [],
              actionCandidate: data.actionCandidate || null,
              createdAt: data.createdAt || '',
            });
          });

          // Sort chronologically by createdAt or ID
          list.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return a.createdAt.localeCompare(b.createdAt);
            }
            return a.id.localeCompare(b.id);
          });

          onUpdate(list);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, CHAT_COLLECTION);
        }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, CHAT_COLLECTION);
    }
  });

  return () => {
    isCancelled = true;
    if (unsubscribe) {
      unsubscribe();
    }
  };
}

/**
 * Save a chat message turn to Firestore
 */
export async function saveChatMessageToFirestore(
  message: ChatMessage,
  persona: PersonaType
): Promise<void> {
  const user = await ensureAnonymousAuth();
  const docId = cleanDocId(message.id);
  const path = `${CHAT_COLLECTION}/${docId}`;

  try {
    await setDoc(doc(db, CHAT_COLLECTION, docId), {
      id: docId,
      role: message.role,
      text: message.text,
      timestamp: message.timestamp,
      followUps: message.followUps || [],
      actionCandidate: message.actionCandidate || null,
      persona,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Clear chat history for a persona in Firestore
 */
export async function clearChatHistoryInFirestore(persona: PersonaType): Promise<void> {
  await ensureAnonymousAuth();

  try {
    const q = query(
      collection(db, CHAT_COLLECTION),
      where('persona', '==', persona)
    );
    const snap = await getDocs(q);
    const deletes = snap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletes);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, CHAT_COLLECTION);
  }
}
