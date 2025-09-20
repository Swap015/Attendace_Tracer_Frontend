import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeDashboard from "./pages/EmployeeDasboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-blac ">

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <div >
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          draggable
          theme="light"
          transition={Bounce}
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          progressClassName="custom-progress"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
