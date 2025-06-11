import { useLocation } from "wouter";
import { categories } from "@/lib/calculatorData";

export default function Navigation() {
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          <button 
            className={`nav-tab flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              isActive("/") ? "active" : ""
            }`}
            onClick={() => setLocation("/")}
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`nav-tab flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                isActive(`/category/${category.id}`) ? "active" : ""
              }`}
              onClick={() => setLocation(`/category/${category.id}`)}
            >
              <i className={`fas ${category.icon}`}></i>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
