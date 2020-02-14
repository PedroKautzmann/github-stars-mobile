import React, { useState, useEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';
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
  NavigateButton,
  NavigateButtonText,
} from './styles';

export default function User({ route, navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  async function refreshList() {
    setRefreshing(true);

    const response = await api.get(`/users/${user.login}/starred`);

    setStars(response.data);
    setRefreshing(false);
  }

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
            onRefresh={refreshList}
            refreshing={refreshing}
            data={stars}
            extraData={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Title>{item.name}</Title>
                    <NavigateButton
                      onPress={() =>
                        navigation.navigate('Repository', {
                          repository: item,
                          title: item.name,
                        })
                      }
                      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                    >
                      <NavigateButtonText>Ir</NavigateButtonText>
                    </NavigateButton>
                  </View>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
    </Container>
  );
}
