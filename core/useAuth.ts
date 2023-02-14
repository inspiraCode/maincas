import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const domain = 'dev-dsuv8kmx.auth0.com';
interface message {
  message?: string;
}

interface IUseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken?: string;
  userMetadata?: {
    email?: string;
    email_verified?: boolean;
    name?: string;
    nickname?: string;
    picture: string;
    user_id: string;
  };
  error?: message | undefined;
}

const useAuth = (): IUseAuthReturn => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently, error } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    if (!isAuthenticated) return;
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user'
          }
        });

        console.log('accessToken-----', accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        console.log('userDetailsByIdUrl-----', userDetailsByIdUrl);

        const metadataResponse = await axios.get(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(metadataResponse.data);

        const { data } = metadataResponse;

        setUserMetadata(data);
        setAccessToken(accessToken);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  //   console.log('user_metadata', userMetadata);
  //   if (isLoading) return 'Loading...';

  return { accessToken, userMetadata, isAuthenticated, isLoading, error };
};

export default useAuth;
