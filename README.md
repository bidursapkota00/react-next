# Course: Building a Next.js Task Management App

## Table of Contents

1. [Project Overview](#project-overview)
2. [Initializing the Next.js Application](#initializing-the-nextjs-application)

---

## Project Overview

This course will guide you through creating a full-featured task management application. We'll cover everything from project setup to deployment, focusing on modern best practices and a top-tier technology stack.

### Learning Objectives

- Build a complete Tasks Management frontend application
- Integrate with RESTful API backend
- Implement authentication and authorization
- Master modern React patterns and state management
- Create responsive UI with shadcn/ui and Tailwind CSS

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **State Management**: Redux Toolkit
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Features to Build

- User registration and authentication
- Task CRUD operations
- Task filtering and pagination
- Priority management
- Due date handling
- Responsive design
- Dark/Light theme support

## Initializing the Nextjs Application

First, let's create a new Next.js project using the App Router, TypeScript, and Tailwind CSS. Open your terminal and run:

```bash
npx create-next-app@latest task-manager-ui
```

You'll be prompted with a few questions. Choose the following options:

- **Would you like to use TypeScript?** Yes
- **Would you like to use ESLint?** Yes
- **Would you like to use Tailwind CSS?** Yes
- **Would you like to use `src/` directory?** Yes
- **Would you like to use App Router?** Yes
- **Would you like to customize the default import alias?** No (or set to `@/*`)

This command creates a new directory called `task-manager-ui` with a boilerplate Next.js application.

### Clean Initial Setup

1. **Update `src/app/page.tsx`**

```typescript
export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold text-center text-foreground">
        Tasks Management App
      </h1>
    </main>
  );
}
```

2. **Clean `src/app/globals.css`**

```css
@import "tailwindcss";
```

---

### Integrating shadcn/ui for Components

**shadcn/ui** is a collection of reusable components built on top of Radix UI and Tailwind CSS. It's not a traditional component library; instead, you use a CLI to add individual components to your project.

1.  **Initialize shadcn/ui:**
    Run the following command in your project's root directory:
    ```bash
    npx shadcn@latest init
    ```
2.  **Configure `components.json`:**
    You'll be asked a few questions to configure your `components.json` file. Here are some recommended settings:
    - **Which color would you like to use as base color?** Slate

This will automatically add a `cn` utility function in `src/lib/utils.ts` and `components.json`.

### Environment Variables Setup

- Create `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── tasks/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── auth/         # Authentication components
│   ├── tasks/        # Task-related components
│   ├── layout/       # Layout components
│   └── common/       # Shared components
├── lib/
│   ├── utils.ts      # Utility functions
│   ├── validations.ts # Form validations
│   └── constants.ts  # App constants
├── services/
│   ├── api.ts        # API client setup
│   ├── auth.ts       # Auth services
│   └── tasks.ts      # Task services
├── store/
│   ├── index.ts      # Store configuration
│   ├── authSlice.ts  # Auth state
│   └── taskSlice.ts  # Task state
├── types/
│   ├── auth.ts       # Auth types
│   ├── task.ts       # Task types
│   └── api.ts        # API types
├── hooks/
│   ├── useAuth.ts    # Auth hooks
│   └── useTasks.ts   # Task hooks
└── constants/
    └── index.ts      # App constants
```

### Installing Core Libraries

Now, let's install the other key dependencies for our application.

### Dependencies Installation

#### Core Dependencies

```bash
# HTTP Client and Data Fetching
npm install axios @tanstack/react-query

# State Management
npm install @reduxjs/toolkit react-redux

# Form Handling
npm install react-hook-form @hookform/resolvers zod

# Utilities
npm install date-fns js-cookie

# For dark mode
npm install next-themes
```

#### Development Dependencies

```bash
# Type definitions
npm install -D @types/js-cookie
```

- **axios**: For making HTTP requests to our API.
- **@tanstack/react-query**: For managing server state (fetching, caching, updating data).
- **@reduxjs/toolkit & react-redux**: For managing global client state (like the theme).
- **react-hook-form**: For building performant and flexible forms.
- **zod & @hookform/resolvers**: For robust form validation.

---

## Dark Mode

### Theme Provider Setup

- Create `src/components/theme/theme-provider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Wrap your root layout

- Add the ThemeProvider to your root layout and add the suppressHydrationWarning prop to the html tag.

```diff
+import { ThemeProvider } from "@/components/theme/theme-provider";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
+      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
+          <ThemeProvider
+            attribute="class"
+            defaultTheme="system"
+            enableSystem
+            disableTransitionOnChange
+          >
            {children}
+          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
```

### Create Theme Toggle Component (`src/components/theme/theme-toggle.tsx`)

```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

```bash
npx shadcn@latest add dropdown-menu
```

### Create Navbar with Theme Toggle (`src/components/layout/navbar.tsx`)

```tsx
import { ModeToggle } from "@/components/theme/theme-toggle";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 h-16 flex justify-between items-center px-3">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <CheckSquare className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">TaskFlow</span>
      </Link>

      <ModeToggle />
    </nav>
  );
};
```

### Create client Layout (`src/app/(client)/layout.tsx`)

```typescript
import { Navbar } from "@/components/layout/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
    </div>
  );
}
```

### Move `src/app/page.tsx` to (`src/app/(client)/page.tsx`)

## Module 2: API Layer & Global State

Here, we'll set up a centralized way to communicate with our API and manage our application's theme.

### Step 2.1: Setting Up the Axios Client

It's a best practice to create a centralized Axios instance.

1.  Create a new file at `src/lib/api.ts`.
2.  Add the following code to configure a base URL and an interceptor to automatically add the auth token to requests.

<!-- end list -->

```typescript
// src/lib/api.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
```

Remember to create a `.env.local` file in your root directory to store your API URL:
`NEXT_PUBLIC_API_URL=http://localhost:3000/api`

### Step 2.2: Implementing Theming with Redux Toolkit

We'll use Redux Toolkit to handle our light/dark mode theme.

1.  **Create the Theme Slice:**
    Create a file at `src/store/themeSlice.ts`.

    ```typescript
    // src/store/themeSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    type Theme = "light" | "dark" | "system";

    interface ThemeState {
      theme: Theme;
    }

    const initialState: ThemeState = {
      theme: "system",
    };

    const themeSlice = createSlice({
      name: "theme",
      initialState,
      reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
          state.theme = action.payload;
        },
      },
    });

    export const { setTheme } = themeSlice.actions;
    export default themeSlice.reducer;
    ```

2.  **Configure the Store:**
    Create a file at `src/store/store.ts`.

    ```typescript
    // src/store/store.ts
    import { configureStore } from "@reduxjs/toolkit";
    import themeReducer from "./themeSlice";

    export const store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
    ```

### Step 2.3: Creating a Global Layout and Theme Provider

We need providers for both Redux and React Query.

1.  **Create a Providers Component:**
    Create a new file at `src/app/providers.tsx`. This must be a client component.

    ```typescript
    // src/app/providers.tsx
    "use client";

    import { useState } from "react";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { Provider as ReduxProvider } from "react-redux";
    import { store } from "@/store/store";

    export function Providers({ children }: { children: React.ReactNode }) {
      const [queryClient] = useState(() => new QueryClient());

      return (
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ReduxProvider>
      );
    }
    ```

2.  **Update Root Layout:**
    Modify `src/app/layout.tsx` to include the `Providers`.

    ```typescript
    // src/app/layout.tsx
    import type { Metadata } from "next";
    import { Inter } from "next/font/google";
    import "./globals.css";
    import { Providers } from "./providers";

    const inter = Inter({ subsets: ["latin"] });

    export const metadata: Metadata = {
      title: "Task Manager",
      description: "A simple task management app",
    };

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <Providers>{children}</Providers>
          </body>
        </html>
      );
    }
    ```

---

## Module 3: Authentication 🔐

This module focuses on user registration and login functionality, using React Hook Form for form management and React Query for API mutations.

### Step 3.1: Building the Registration Page

1.  **Create the Page Route:**
    Create a new file at `src/app/register/page.tsx`.

2.  **Add Components with shadcn/ui:**
    In your terminal, add the components we'll need for our forms:

    ```bash
    npx shadcn-ui@latest add card form input button
    ```

3.  **Implement the Registration Form:**
    Here's the code for `src/app/register/page.tsx`. It uses `useForm` for state management and `useMutation` from React Query to handle the API call.

    ```typescript
    // src/app/register/page.tsx
    "use client";

    import { useForm } from "react-hook-form";
    import { useMutation } from "@tanstack/react-query";
    import { useRouter } from "next/navigation";
    import apiClient from "@/lib/api";

    import { Button } from "@/components/ui/button";
    import {
      Card,
      CardContent,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
    } from "@/components/ui/form";

    // Define the form schema
    // (We'll add Zod validation in Module 5)
    type RegisterFormValues = {
      name: string;
      email: string;
      password: string;
    };

    // API call function
    const registerUser = async (data: RegisterFormValues) => {
      const response = await apiClient.post("/auth/register", data);
      return response.data;
    };

    export default function RegisterPage() {
      const router = useRouter();
      const form = useForm<RegisterFormValues>();

      const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
          // Save token and user data, then redirect
          localStorage.setItem("authToken", data.data.token);
          router.push("/dashboard");
        },
        onError: (error) => {
          console.error("Registration failed:", error);
          // Here you would show an error message to the user
        },
      });

      const onSubmit = (data: RegisterFormValues) => {
        mutation.mutate(data);
      };

      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="user@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      );
    }
    ```

### Step 3.2: Building the Login Page

The login page is very similar to the registration page. Create `src/app/login/page.tsx` and adapt the form to have only `email` and `password` fields, and point the mutation to the `/auth/login` endpoint.

### Step 3.3: Managing Authentication State

For a better user experience, we can store the user information and token in a Redux slice.

1.  **Create an Auth Slice:**
    Create `src/store/authSlice.ts`.

    ```typescript
    // src/store/authSlice.ts
    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface User {
      id: string;
      name: string;
      email: string;
    }

    interface AuthState {
      token: string | null;
      user: User | null;
    }

    const initialState: AuthState = {
      token: null,
      user: null,
    };

    const authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
        setCredentials: (
          state,
          action: PayloadAction<{ token: string; user: User }>
        ) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
        },
        logOut: (state) => {
          state.token = null;
          state.user = null;
          localStorage.removeItem("authToken");
        },
      },
    });

    export const { setCredentials, logOut } = authSlice.actions;
    export default authSlice.reducer;
    ```

2.  **Update the Store:**
    Add the `authReducer` to `src/store/store.ts`.

    ```typescript
    // src/store/store.ts
    // ...
    import authReducer from "./authSlice";

    export const store = configureStore({
      reducer: {
        theme: themeReducer,
        auth: authReducer, // Add this
      },
    });
    // ...
    ```

3.  **Dispatch on Login/Register Success:**
    In your `onSuccess` callback in `RegisterPage` and `LoginPage`, dispatch the `setCredentials` action.

---

## Module 4: Core Task Functionality (CRUD) ✅

This is the heart of our application. We'll build the interface for creating, reading, updating, and deleting tasks.

### Step 4.1: Creating the Tasks Dashboard Page

Create the main page for viewing tasks at `src/app/dashboard/page.tsx`.

### Step 4.2: Displaying a List of Tasks (`GET`)

We'll use `useQuery` to fetch and cache the tasks.

1.  **Define API Functions:**
    It's good practice to co-locate your React Query keys and fetcher functions. Let's create `src/hooks/useTasks.ts`.

    ```typescript
    // src/hooks/useTasks.ts
    import { useQuery } from "@tanstack/react-query";
    import apiClient from "@/lib/api";

    // Define the Task type based on your OpenAPI spec
    export interface Task {
      _id: string;
      title: string;
      description?: string;
      completed: boolean;
      priority?: "low" | "medium" | "high";
      // ... other fields
    }

    const fetchTasks = async (): Promise<Task[]> => {
      const { data } = await apiClient.get("/tasks");
      return data;
    };

    export const useTasks = () => {
      return useQuery<Task[], Error>({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
      });
    };
    ```

2.  **Render the Tasks:**
    Now use this hook in `src/app/dashboard/page.tsx`.

    ```typescript
    // src/app/dashboard/page.tsx
    "use client";

    import { useTasks, Task } from "@/hooks/useTasks";

    // You can create a separate TaskItem component for better structure
    function TaskItem({ task }: { task: Task }) {
      return (
        <div className="border p-4 rounded-lg my-2">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <span
            className={`text-sm ${
              task.completed ? "text-green-500" : "text-yellow-500"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      );
    }

    export default function DashboardPage() {
      const { data: tasks, isLoading, isError, error } = useTasks();

      if (isLoading) return <div>Loading tasks...</div>;
      if (isError) return <div>Error: {error.message}</div>;

      return (
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <div>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => <TaskItem key={task._id} task={task} />)
            ) : (
              <p>No tasks found. Create one!</p>
            )}
          </div>
        </main>
      );
    }
    ```

### Step 4.3: Creating New Tasks (`POST`)

We'll use `useMutation` and invalidate the `['tasks']` query to automatically refresh the list.

1.  **Update `useTasks.ts` with a creation mutation:**

    ```typescript
    // src/hooks/useTasks.ts
    import { useMutation, useQueryClient } from "@tanstack/react-query";
    // ... other imports

    // ... useTasks hook

    type CreateTaskInput = Omit<Task, "_id" | "createdAt" | "updatedAt">;

    const createTask = async (newTask: CreateTaskInput): Promise<Task> => {
      const { data } = await apiClient.post("/tasks", newTask);
      return data;
    };

    export const useCreateTask = () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
          // Invalidate and refetch the tasks query
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
      });
    };
    ```

2.  **Add a "Create Task" Form/Button:**
    In your `DashboardPage`, add a button that opens a dialog (using shadcn's `Dialog` component) with a form to create a new task. When the form is submitted, call the `mutate` function from `useCreateTask`.

### Step 4.4 & 4.5: Updating and Deleting Tasks (`PUT` & `DELETE`)

The pattern is the same as creating a task.

1.  **Add `updateTask` and `deleteTask` mutations** to your `useTasks.ts` hook file.
2.  **The `updateTask` mutation** will take an object with the task `id` and the `payload` to update.
3.  **The `deleteTask` mutation** will take the task `id`.
4.  **Crucially, in the `onSuccess` callback** for both mutations, call `queryClient.invalidateQueries({ queryKey: ['tasks'] })` to ensure the UI updates automatically.
5.  Add "Edit" and "Delete" buttons to your `TaskItem` component that trigger these mutations.

---

## Module 5: Advanced Features & Refinements ✨

Let's polish our app with some professional touches.

### Step 5.1: Implementing Protected Routes with Middleware

We want to prevent unauthenticated users from accessing the `/dashboard`.

1.  Create a file at `src/middleware.ts` in the root of your project (next to `src` folder).

2.  Add logic to check for a token and redirect if it's missing.

    ```typescript
    // src/middleware.ts
    import { NextResponse } from "next/server";
    import type { NextRequest } from "next/server";

    export function middleware(request: NextRequest) {
      const authToken = request.cookies.get("authToken")?.value; // Example: using cookies

      // If you use localStorage, middleware can't access it directly.
      // A common pattern is to set a cookie on login.
      // For this example, we'll assume a token check.
      // If there's no token and the user is trying to access a protected route
      if (!authToken && request.nextUrl.pathname.startsWith("/dashboard")) {
        // Redirect them to the login page
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      return NextResponse.next();
    }

    // See "Matching Paths" below to learn more
    export const config = {
      matcher: "/dashboard/:path*",
    };
    ```

### Step 5.2: Adding Form Validation with Zod

Let's make our registration form more robust.

1.  **Define the Schema:**
    Create a Zod schema that matches your form's requirements.

2.  **Use the Zod Resolver:**
    Update your `RegisterPage` component.

    ```typescript
    // src/app/register/page.tsx
    import { zodResolver } from "@hookform/resolvers/zod";
    import { z } from "zod";
    // ...

    const registerFormSchema = z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters." }),
      email: z.string().email({ message: "Please enter a valid email." }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    });

    type RegisterFormValues = z.infer<typeof registerFormSchema>;

    // ...

    export default function RegisterPage() {
      // ...
      const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });
      // ...
    }
    ```

    React Hook Form will now automatically display validation messages defined in your schema.

### Step 5.3: Filtering and Pagination for Tasks

Your API supports filtering by `completed` status and `priority`.

1.  **Modify the `useTasks` Hook:**
    Update it to accept filters as arguments.

    ```typescript
    // src/hooks/useTasks.ts
    // ...
    interface TaskFilters {
      completed?: boolean;
      priority?: "low" | "medium" | "high";
      page?: number;
      limit?: number;
    }

    const fetchTasks = async (filters: TaskFilters): Promise<Task[]> => {
      const { data } = await apiClient.get("/tasks", { params: filters });
      return data;
    };

    export const useTasks = (filters: TaskFilters) => {
      return useQuery<Task[], Error>({
        // The query key must include the filters to ensure queries are cached separately
        queryKey: ["tasks", filters],
        queryFn: () => fetchTasks(filters),
      });
    };
    ```

2.  **Add UI Controls:**
    In your `DashboardPage`, add dropdowns or buttons to set filter state (using `useState`). When the state changes, pass it to the `useTasks` hook, and React Query will automatically refetch the data with the new parameters.
