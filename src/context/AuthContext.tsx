// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';

// type AuthContextType = {
//   user: any;
//   status: 'authenticated' | 'unauthenticated' | 'loading';
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   status: 'loading',
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const { data: session, status } = useSession();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user) {
//       setUser(session.user);
//     } else {
//       setUser(null);
//     }
//   }, [session, status]);

//   return (
//     <AuthContext.Provider value={{ user, status }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



'use client';

import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';

type AuthContextType = ReturnType<typeof useSession>;

const AuthContext = createContext<AuthContextType>({
  data: null,
  status: 'loading',
  update: async () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);