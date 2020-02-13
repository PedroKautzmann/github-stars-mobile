import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ route, navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = route.params;

  useEffect(() => {
    async function loadStars() {
      setLoading(true);

      const response = await api.get(`/users/${user.login}/starred`);

      setStars(response.data);
      setLoading(false);
    }

    loadStars();
  }, []);

  // async function loadMore() {
  //   setLoading(true);

  //   const response = await api.get(`/users/${user.login}/starred?page=2`);

  //   setStars([...stars, response.data]);
  //   setLoading(false);
  // }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <ActivityIndicator color="#ccc" size="large" />
      ) : (
          <Stars
            // onEndReachedThreshold={0.2}
            // onEndReached={loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
    </Container>
  );
}
