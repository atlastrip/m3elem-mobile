import { firestore } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const createOrRetrieveConversation = async (orderId, artisanId, userId) => {
    
  const conversationId = `${orderId}~~${artisanId}~~${userId}`;
  const conversationRef = doc(firestore, 'conversations', conversationId);
  console.log({conversationRef})
  const conversationSnapshot = await getDoc(conversationRef);

  if (!conversationSnapshot.exists()) {
    // Create a new conversation if it doesn't exist
    await setDoc(conversationRef, {
      orderId,
      artisanId,
      userId,
      createdAt: new Date(),
      messages: [],
    });
  }
  // setLoading(false)
  return conversationId;
};
