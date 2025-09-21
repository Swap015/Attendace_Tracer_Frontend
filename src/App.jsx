import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeDashboard from "./pages/EmployeeDasboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/static-pages/About";
import Contact from "./pages/static-pages/Contact";
import UserProvider from "./components/context/UserProvider.jsx";
import NotFound from "./pages/static-pages/NotFound.jsx";

function App() {

  return (
    <UserProvider>
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
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                <Route path="*" element={<NotFound />} />

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
    </UserProvider>
  );
}

export default App;
