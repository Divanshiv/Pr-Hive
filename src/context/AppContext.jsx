import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const onboardingSteps = [
  { id: 'browse', title: 'Browse Catalog', description: 'Explore our marketplace', completed: false },
  { id: 'filter', title: 'Apply Filters', description: 'Find your perfect platforms', completed: false },
  { id: 'save', title: 'Save Favorites', description: 'Bookmark interesting listings', completed: false },
  { id: 'cart', title: 'Add to Cart', description: 'Select platforms for your campaign', completed: false },
  { id: 'checkout', title: 'Complete Purchase', description: 'Finalize your campaign', completed: false }
];

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [onboardingProgress, setOnboardingProgress] = useState(35);
  const [onboardingHints, setOnboardingHints] = useState([]);
  const [dismissedHints, setDismissedHints] = useState([]);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const savedDismissed = localStorage.getItem('dismissedHints');
    if (savedDismissed) {
      setDismissedHints(JSON.parse(savedDismissed));
    }
  }, []);

  const updateOnboardingProgress = (stepId) => {
    const stepIndex = onboardingSteps.findIndex(s => s.id === stepId);
    if (stepIndex >= 0) {
      const newProgress = Math.min(100, (stepIndex + 1) * 20);
      setOnboardingProgress(newProgress);
    }
  };

  const addToCart = (item) => {
    if (!cart.find((i) => i.id === item.id)) {
      setCart([...cart, item]);
      updateOnboardingProgress('cart');
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  const toggleSave = (item) => {
    if (saved.find((i) => i.id === item.id)) {
      setSaved(saved.filter((i) => i.id !== item.id));
    } else {
      setSaved([...saved, item]);
      updateOnboardingProgress('save');
    }
  };

  const dismissHint = (hintId) => {
    const newDismissed = [...dismissedHints, hintId];
    setDismissedHints(newDismissed);
    localStorage.setItem('dismissedHints', JSON.stringify(newDismissed));
  };

  const getActiveHint = () => {
    const hints = [
      { id: 'filter', message: 'Use filters to find the perfect platforms for your niche', threshold: 0 },
      { id: 'save', message: 'Save listings you like by clicking the heart icon', threshold: 20 },
      { id: 'cart', message: 'Add items to cart to proceed with your campaign', threshold: 40 }
    ];
    
    for (const hint of hints) {
      if (onboardingProgress >= hint.threshold && !dismissedHints.includes(hint.id)) {
        return hint;
      }
    }
    return null;
  };

  const activeHint = getActiveHint();

  return (
    <AppContext.Provider value={{ 
      cart, saved, addToCart, removeFromCart, toggleSave, 
      theme, toggleTheme,
      onboardingProgress, activeHint, dismissHint, onboardingSteps 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
