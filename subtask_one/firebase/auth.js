const firebaseConfig = {
  apiKey: "AIzaSyBb6UPMyUZMZNQ1W0ngdKjUPhFKS4HOykY",
  authDomain: "firstproject-aedd3.firebaseapp.com",
  databaseURL: "https://firstproject-aedd3-default-rtdb.firebaseio.com",
  projectId: "firstproject-aedd3",
  storageBucket: "firstproject-aedd3.appspot.com",
  messagingSenderId: "201020881386",
  appId: "1:201020881386:web:09dd2b30b85849ae061a93",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const authPages = ["login", "signup"];

// Event listener for authentication state changes
firebase.auth().onAuthStateChanged(handleAuthStateChange);

// Function to handle user authentication state changes
function handleAuthStateChange(user) {
  const currentPage = getCurrentPage();
  if (!user && !isAuthPage(currentPage)) {
    redirectToSignup();
  } else {
    const userEmailElement = document.getElementById('userEmail');
    userEmailElement.innerText = 'Welcome, ' + user.email;
  }
}

// Function to get the current page
function getCurrentPage() {
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];
  return currentPage;
}

// Function to check if the current page is an authentication page
function isAuthPage(page) {
  return authPages.includes(page);
}

// Signup using email and password.
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(onAuthSuccess)
    .catch(onAuthError);
}

// Function for login and matching credentials.
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(onAuthSuccess)
    .catch(onAuthError);
}

// Logout function
function logout() {
  firebase.auth()
    .signOut()
    .then(() => { window.location.href = "./login.html" })
    .catch(onAuthError);
}

// Function to handle authentication success
function onAuthSuccess(userCredential) {
  const user = userCredential.user;
  const UID = user.uid;
  window.location = "./home.html";
}

// Function to handle authentication errors
function onAuthError(error) {
  const errorMessage = getErrorMessage(error.code);
  displayErrorMessage(errorMessage);
}

// Helper function to map Firebase error codes to user-friendly messages
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/internal-error":
      return "Invalid email or password.";
    default:
      return "An error occurred. Please try again.";
  }
}

// Function to redirect to signup page
function redirectToSignup() {
  window.location.href = "./signup.html";
}

// Function to display error message to the user
function displayErrorMessage(message) {
  const div = document.getElementById("alertBox");
  div.innerHTML = `<div class="alert alert-danger" role="alert" aria-hidden="true">${message}</div>`;
}
