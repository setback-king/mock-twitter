import SignIn from "./components/main-components/SignIn";
import Sidebar from "./components/main-components/Sidebar";
import Menu from "./components/main-components/Menu";
import Profile from "./components/main-components/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/firebase.config";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Timeline from "./components/main-components/Timeline";
import News from "./components/main-components/News";
import Likes from "./components/main-components/Likes";
import Notifications from "./components/main-components/Notifications";
import Messages from "./components/main-components/Messages";
import { UserTweets } from "./components/main-components/UserTweets";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
      <div className="app">
        {user && <Menu />}
        <Routes>
          {!user && <Route path="/" element={<SignIn user={user} />} />}
          <Route path="/" element={<Timeline user={user} />} />
          <Route path="/profile" element={<Profile user={user} />}>
            <Route path="likes" element={<Likes />} />
            <Route path="/profile" element={<UserTweets />} />
          </Route>
          <Route path="/news" element={<News />} />

          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", fontSize: "50px" }}>
                <p>There's nothing here! Incorrect Link.</p>
              </main>
            }
          />
        </Routes>

        {user && <Sidebar />}
      </div>
    </Router>
  );
}

export default App;
