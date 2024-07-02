import Home from "./Home";
import { useIsMobile } from "./utils/isMobile";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import CrushSender from "./CrushSender";

function App() {
	const isMobile = useIsMobile();

	return (
		<div>
			{isMobile ? (
				<div className="h-screen w-screen fixed bg-gradient-to-b from-yellow-500 via-amber-300 to-yellow-500">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/crush" element={<CrushSender />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			) : (
				<div>
					<h1>Desktop View Not Supported</h1>
				</div>
			)}
		</div>
	);
}

export default App;
