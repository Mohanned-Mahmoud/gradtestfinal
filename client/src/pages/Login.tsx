import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { api } from "../lib/api"; // Ensure this path matches your project structure
import { userStore } from "../lib/auth"; // Ensure this path matches your project structure

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

// Define a schema that covers all potential fields
// We will refine validation logic dynamically or allow optional fields
const formSchema = z.object({
  // Login Identifier (for Login mode)
  identifier: z.string().optional(),
  
  // Signup Fields
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  name: z.string().optional(),
  
  // Shared
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [serverError, setServerError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      email: "",
      phone: "",
      name: "",
      password: "",
    },
  });

  // Check if user is already logged in
  const u = userStore.get();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerError(null);

    try {
      if (mode === 'login') {
        // Validate Identifier manually for login
        if (!values.identifier) {
          form.setError("identifier", { message: "Email or Phone is required" });
          return;
        }
        await api.login(values.identifier.trim(), values.password);
      } else {
        // Validate Signup fields manually
        let hasError = false;
        if (!values.email) { form.setError("email", { message: "Email is required" }); hasError = true; }
        if (!values.phone) { form.setError("phone", { message: "Phone is required" }); hasError = true; }
        if (!values.name) { form.setError("name", { message: "Name is required" }); hasError = true; }
        
        if (hasError) return;

        await api.signup(
          values.email!.trim(), 
          values.phone!.trim(), 
          values.password, 
          values.name!.trim()
        );
      }

      // Success
      setLocation("/");
      
    } catch (err: any) {
      setServerError(err.message?.replace(/[\r\n]+/g, ' ') || 'Request failed');
    }
  }

  // Helper to toggle mode and clear errors
  const toggleMode = () => {
    setServerError(null);
    form.reset();
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const isBusy = form.formState.isSubmitting;

  return (
    <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full scale-150 pointer-events-none" />
      
      <Card className="w-full max-w-md bg-black/50 border-white/10 backdrop-blur-xl relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tighter text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-neutral-400">
            {mode === 'login' 
              ? 'Log in to access your interactive medical tools.' 
              : 'Sign up to start your medical learning journey.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Already Logged In Alert */}
          {u && (
             <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-md mb-6 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <p className="text-green-400 text-sm">Logged in as <b>{u.email}</b></p>
             </div>
          )}

          {/* Error Alert */}
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{serverError}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* LOGIN MODE: Identifier Input */}
              {mode === 'login' && (
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Email or Phone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Email or Phone number" 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}

              {/* SIGNUP MODE: Name, Email, Phone Inputs */}
              {mode === 'signup' && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Full Name" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="you@example.com" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+1234567890" 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/* SHARED: Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-300">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isBusy}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest uppercase transition-all mt-4"
              >
                {isBusy ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Please wait...
                  </>
                ) : (
                  mode === 'login' ? 'Login' : 'Sign Up'
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-8 text-center space-y-4">
             {/* Toggle Mode */}
            <div className="text-sm text-neutral-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={toggleMode}
                className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4 font-bold"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
            {/* Back Home */}
            <button 
              onClick={() => setLocation("/")}
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-500 hover:text-cyan-500 transition-colors block w-full"
            >
              Back to Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}