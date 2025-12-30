import React from "react";

export type AppRoute = {
  path?: string;
  index?: boolean;
  element?: React.ReactElement | null;
  layout?: React.ComponentType<any>;
  guard?: React.ComponentType<{ children: React.ReactNode }>;
  children?: AppRoute[];
};