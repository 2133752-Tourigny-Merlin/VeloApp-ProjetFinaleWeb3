import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
apiKey: 'AIzaSyAhiJj3elTVHhAuS1H1nC7azvi-mUdqDX4',
authDomain: 'velosecurisee.firebaseapp.com',
projectId: 'velosecurisee',
storageBucket: 'velosecurisee.appspot.com',
messagingSenderId: '281716731550',
appId: '1:281716731550:web:790bd7f64960a7bb39558f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logout = () => {
    signOut(auth);
};

export const logInWithEmailAndPassword = async (
email: string,
password: string
) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (err: any) {
    console.error(err);
    alert(err.message);
}
};