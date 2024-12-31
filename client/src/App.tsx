import { Switch, Route } from "wouter";
import { Home } from "@/pages/home";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  // Initialize default items
  useEffect(() => {
    fetch("/api/init", { method: "POST" });
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
