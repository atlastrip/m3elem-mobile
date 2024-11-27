import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { getToken, getUser } from '@/helpers/getToken';

export const useUnlockedOrders = () => {
  const [loading, setLoading] = useState(true);
  const [unlockedOrders, setUnlockedOrders] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUnlockedOrders = useCallback(async () => {
    try {
      const token = await getToken();
      const userData:any = await getUser();

      if (!userData) {
        throw new Error("User data not found.");
      }

      setUser(userData);

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      });

      setLoading(true);
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
              query getLeadsForUser {
                getLeadsForUser {
                  id
                  title
                  description
                  status
                  images
                  zipCode
                  locationType
                  artisantId {
                    id
                    leads { id }
                    pushToken
                    firstName
                    lastName
                    phone
                    imageProfile
                  }
                  owner {
                    id
                    leads { id }
                    firstName
                    lastName
                    phone
                    imageProfile
                    pushToken
                  }
                  artisantUnlockedLead {
                    id
                    firstName
                    lastName
                    imageProfile
                    pushToken
                  }
                  location
                  review {
                    id
                    description
                    rating
                    owner {
                      id
                      firstName
                      pushToken
                      lastName
                      imageProfile
                    }
                  }
                }
              }
            `,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const json = await res.json();
      setUnlockedOrders(json.data.getLeadsForUser || []);
    } catch (err:any) {
      Alert.alert("Error", err.message || "Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnlockedOrders();
  }, [fetchUnlockedOrders]);

  return { loading, unlockedOrders, user, refetch: fetchUnlockedOrders };
};

