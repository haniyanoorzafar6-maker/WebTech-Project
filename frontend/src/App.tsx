import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { AdminRoute, ProtectedRoute } from "@/routes/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { CoffeeDetailPage } from "@/pages/CoffeeDetailPage";
import { LocationsPage } from "@/pages/LocationsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AdminPage } from "@/pages/AdminPage";

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageShell><HomePage /></PageShell>} />
          <Route path="/login" element={<PageShell><LoginPage /></PageShell>} />
          <Route path="/signup" element={<PageShell><SignupPage /></PageShell>} />
          <Route path="/catalog" element={<PageShell><CatalogPage /></PageShell>} />
          <Route path="/catalog/:id" element={<PageShell><CoffeeDetailPage /></PageShell>} />
          <Route path="/locations" element={<PageShell><LocationsPage /></PageShell>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<PageShell><DashboardPage /></PageShell>} />
            <Route path="/profile" element={<PageShell><ProfilePage /></PageShell>} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<PageShell><AdminPage /></PageShell>} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
