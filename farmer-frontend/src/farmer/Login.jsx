import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db, auth } from '../Firebase'
import { LoginContext } from '../context/LoginContext'
import { useEffect } from 'react'
import jwtEncode from 'jwt-encode'
import { deleteDoc, doc } from 'firebase/firestore'

function Login() {
  const navigate = useNavigate();
  const { flag, setFlag } = useContext(LoginContext);
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  // ---------------------
  // DELETE OLD TOKENS
  // ---------------------
  const findUserToken = async (uid) => {
    const q = query(collection(db, "user_token"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return false;

    // delete old tokens
    for (const doc1 of querySnapshot.docs) {
      await deleteDoc(doc(db, "user_token", doc1.id));
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // ---------------------
  // CHECK USER ROLE AND REDIRECT
  // ---------------------
  const checkUserRoleAndRedirect = (userData, userId) => {
    // Check if user is admin (you might have a role field in your user data)
    if (userData.role === 'admin' || userData.email.includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
    
    // Update login flag
    setFlag(1);
  };

  // ---------------------
  // EMAIL + PASSWORD LOGIN
  // ---------------------
  const handleClick = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email),
        where("pwd", "==", user.pwd)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Invalid email or password");
        return;
      }

      querySnapshot.forEach(async (userDoc) => {
        const userData = userDoc.data();
        const userId = userDoc.id;

        await findUserToken(userId);

        // Create JWT using browser-safe library
        const secret = "tops";
        const jwt = jwtEncode(userData, secret);

        // Store token in Firestore
        await addDoc(collection(db, "user_token"), {
          uid: userId,
          token: jwt,
        });

        // Store in localStorage
        localStorage.setItem("firebaseUID", userId);
        localStorage.setItem("firebaseTOKEN", jwt);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Check role and redirect
        checkUserRoleAndRedirect(userData, userId);
      });
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed: " + error.message);
    }
  };

  // ---------------------
  // GOOGLE LOGIN
  // ---------------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if email exists in Firestore
      const loggedDocRef = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const loggedUser = await getDocs(loggedDocRef);

      if (loggedUser.docs.length > 0) {
        const userDoc = loggedUser.docs[0];
        const userData = userDoc.data();
        const userId = userDoc.id;

        await findUserToken(userId);

        // Store token in Firestore
        await addDoc(collection(db, "user_token"), {
          uid: userId,
          token: user.accessToken,
        });

        // Store in localStorage
        localStorage.setItem("firebaseUID", userId);
        localStorage.setItem("firebaseTOKEN", user.accessToken);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Check role and redirect
        checkUserRoleAndRedirect(userData, userId);

        alert(`Welcome ${user.displayName}!`);
      } else {
        // Create new user for Google login
        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          role: 'user', // Default role
          createdAt: new Date().toISOString()
        };

        const userDoc = await addDoc(collection(db, "users"), userData);
        const userId = userDoc.id;

        // Store token in Firestore
        await addDoc(collection(db, "user_token"), {
          uid: userId,
          token: user.accessToken,
        });

        // Store in localStorage
        localStorage.setItem("firebaseUID", userId);
        localStorage.setItem("firebaseTOKEN", user.accessToken);
        localStorage.setItem("role",userData.role)
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to profile for new users
        setFlag(1);
        navigate("/profile");

        alert(`Welcome ${user.displayName}! Account created successfully.`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Google login failed: " + error.message);
    }
  };

  // ---------------------
  // CHECK EXISTING LOGIN
  // ---------------------
  useEffect(() => {
    const token = localStorage.getItem("firebaseTOKEN");
    const userData = localStorage.getItem("userData");
    
    if (token && userData) {
      setFlag(1);
      const parsedUserData = JSON.parse(userData);
      
      // Redirect based on role if already logged in
      if (parsedUserData.role === 'admin' || parsedUserData.email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [navigate, setFlag]);

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in</h2>

          <form className="space-y-6 mt-6" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="pwd"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              type="button"
              onClick={handleClick}
              className="w-full bg-green-600 text-white p-2 rounded mt-2"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full border p-2 rounded mt-4 flex justify-center items-center gap-2"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="" className="w-5" />
            Login with Google
          </button>

          <p className="text-center mt-4">
            Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block flex-1 bg-gradient-to-r from-green-400 to-green-600"></div>
    </div>
  )
}

export default Login