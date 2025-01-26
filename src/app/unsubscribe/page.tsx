"use client";
import { Suspense } from "react";
import UnsubscribeForm from "./unsubscribe-form";
import WebGLBackground from "~/components/gradient-background";

export default function UnsubscribePage() {
  return (
    <Suspense>
      <WebGLBackground />
      <UnsubscribeForm />
    </Suspense>
  );
}
