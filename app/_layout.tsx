import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./navigation/navigation";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
