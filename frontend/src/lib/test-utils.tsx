import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { MemoryRouter } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
function AppProviderWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const providerRenderer = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AppProviderWrapper, ...options });

export { providerRenderer as render };
