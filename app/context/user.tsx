// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import React, { useEffect, useState, createContext, useContext } from "react";

// const Context = createContext(null);

// const Provider = ({ children }: { children: React.ReactNode }) => {
//   const supabase = createClientComponentClient();

//   const [user, setUser] = useState(supabase.auth.getUser());

//   useEffect(() => {
//     supabase.auth.onAuthStateChange(() => {
//       setUser(supabase.auth.getUser());
//     });
//   }, [supabase]);

//   const value = {
//     user,
//   };

//   return <Context.Provider value={value}>{children}</Context.Provider>;
// };

// export const useUser = () => useContext(Context);

// export default Provider;


// npx supabase gen types typescript --project-id xkwauyfcxwrvepkiejwz --schema public > types/supabase.ts
