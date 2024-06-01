import { type AdminSession, getAdminSession } from "@/server/api/jwt";
import { NoAdmin } from "./no-admin";
import React from "react";

export type AdminViewProps = {
  session: AdminSession;
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: AdminSession | null = await getAdminSession();

  return (
    <div className="container flex justify-center">
      {!session ? (
        <NoAdmin />
      ) : (
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, {
              session,
            });
          }
          return child;
        })
      )}
    </div>
  );
}
