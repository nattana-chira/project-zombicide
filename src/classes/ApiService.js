import { db } from './../firebase'
import { collection, addDoc, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore"
import { DEV_MODE } from './_InitSetting'
import { initState } from './DataInit'

const COLLECTION = "zombicide"
export const EMOJI_DOC = "XXXXXXXX"

export const fetchInitData = async ({ docId }) => {
	return getDocs(collection(db, COLLECTION))
		.then((querySnapshot) => {
			const newData = querySnapshot.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
 
			return newData.find(data => data.id === docId)
		})
}

export const updateData = async (data = {}, { docId }) => {
	try {
		const update = {
			...data
		}

		console.log("BEFORE UPDATE ", update)
		if (!DEV_MODE) updateDoc(doc(collection(db, COLLECTION), docId), { ...update })
		console.log('Document successfully updated!');
	} catch (error) {
		console.error('Error updating document: ', error);
	}
};

export const subscribeData = async (callback, { docId }) => {
  onSnapshot(doc(collection(db, COLLECTION), docId), (snapshot) => {
    console.log({ snapshot })
    console.log(snapshot.data())
    const data = snapshot.data()

    callback(data)
  })
}

export const addInit = async () => {
  try {
    const jsonData = JSON.parse(JSON.stringify(initState))
    console.log('addInit', jsonData)

    const docRef = await addDoc(collection(db, COLLECTION), {
      ...jsonData
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const resetInit = async ({ docId, sessionId }) => {
  try {
    const _initState = { ...initState, rule: { ...initState.rule, turnSessionId: sessionId } }

    const jsonData = JSON.parse(JSON.stringify(_initState))
    console.log("BEFORE RESET: ", jsonData)

    await updateDoc(doc(collection(db, COLLECTION), docId), { ...jsonData })

    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}


export const subscribeEmojiData = async (callback) => {
  onSnapshot(doc(collection(db, COLLECTION), EMOJI_DOC), (snapshot) => {
    console.log({ snapshot })
    console.log(snapshot.data())
    const data = snapshot.data()

    callback(data)
  })
}
