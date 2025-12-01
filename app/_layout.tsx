import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../lib/firebase"; 
import { useAuth } from "@/hooks/useAuth"; 

export default function Layout() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      const inAuthPage = segments[0] === undefined;
      if (!u && !inAuthPage) {
        router.replace("/");
      }
      if (u && inAuthPage) {
        router.replace("/home");
      }
    });
    return unsubscribe;
  }, [segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}