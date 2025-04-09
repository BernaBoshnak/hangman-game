import { db } from '../api/firebase-config'
import { doc, getDoc } from './firestore'
import { NounListDoc } from '../api/response/nounList'

const NOUN_LIST_COLLECTION = 'noun_list'
const NOUN_LIST_DOCUMENT_ID = 'doc1'

export const getNounList = async () => {
  const nounDocRef = doc(db, NOUN_LIST_COLLECTION, NOUN_LIST_DOCUMENT_ID)
  const nounDocSnap = await getDoc(nounDocRef)

  if (nounDocSnap.exists()) {
    return nounDocSnap.data().words as NounListDoc['words']
  } else {
    console.error(
      `Document "${NOUN_LIST_DOCUMENT_ID}" in collection "${NOUN_LIST_COLLECTION}" does not exist.`,
    )
    return []
  }
}
