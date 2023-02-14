'use client';
import React from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import useAuth from '@/core/useAuth';

export default function Profile() {
  // const { user, error, isLoading } = useUser();
  const { userMetadata, accessToken, isAuthenticated, isLoading, error } =
    useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    userMetadata && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
        <Image
          alt='User'
          src={`${userMetadata?.picture}`}
          width={50}
          height={50}
        />
        <h2>{userMetadata.name}</h2>
        <p>{userMetadata.email}</p>
        <p>{userMetadata.picture}</p>
      </div>
    )
  );
}
