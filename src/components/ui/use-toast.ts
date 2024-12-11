import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export { useToast };

export type ToastActionElement = React.ReactElement<unknown>;

export interface ToastProps {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
}
