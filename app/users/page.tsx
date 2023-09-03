'use client';

import { signOut } from 'next-auth/react';
import React from 'react'

const Users = ()=> {
  return (
    <div>
      <button onClick={()=> signOut}>LogOut</button>
    </div>
  );
}
export default Users;