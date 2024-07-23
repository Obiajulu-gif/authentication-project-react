import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import AuthContext from "./store/auth-context";
function App() {
	const authCtx = useContext(AuthContext);
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				{!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
				{authCtx.isLoggedIn && (
					<Route path="/profile" element={<UserProfile />} />
				)}
				{!authCtx.isLoggedIn && (
					<Route path="/profile" element={<Navigate to="/auth" replace />} />
				)}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Layout>
	);
}

export default App;
