import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs,  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy1NsTCKpTlW-100Scq9Taxpy-Ldd7VUM",
  authDomain: "crwn-clothing-db-497f5.firebaseapp.com",
  projectId: "crwn-clothing-db-497f5",
  storageBucket: "crwn-clothing-db-497f5.appspot.com",
  messagingSenderId: "948082366976",
  appId: "1:948082366976:web:be99be56158dc83de456e5",
};

// initailizes the firebase app
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// "signInWithPopup" method does the job of displaying the google pop up and sign in
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // set the object for that dofRef
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // gets the reference of a particular document whose id is 'userAuth.uid' in the 'users' collection
  // it just creates a reference even tho none of these are created yet
  const userDocRef = doc(db, "users", userAuth.uid);

  // userDocRef is just the reference in some sense the address to the document
  // Its just that, we havent tried going to that address

  // userSnapshot is actually going and trying to find the document present at that address
  const userSnapshot = await getDoc(userDocRef);

  // checks if the document actually exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // saves the document at that address(userDocRef)
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() => {
  await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {

  if(!callback)
    return;

  return onAuthStateChanged(auth, callback);
}