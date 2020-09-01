import React, { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Container, TeacherListContainer, TeacherListContent } from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

interface TeachersProps {
  user: {
    id: string;
    name: string;
    bio: string;
    whatsapp: string;
    avatar: string;
  };
  subject: string;
  cost: number;
}

const Favorites: React.FC = () => {
  const [favoriteTeachers, setFavoriteTeachers] = useState<TeachersProps[]>([]);

  const loadFavorites = useCallback(async () => {
    const favoritesTeachersStorage = await AsyncStorage.getItem('favorites');

    if (favoritesTeachersStorage) {
      const favoriteTeachersArray = JSON.parse(favoritesTeachersStorage);
      setFavoriteTeachers(favoriteTeachersArray);
    }
  }, []);

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <TeacherListContainer
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <PageHeader title="Meus Proffys favoritos" />
        <TeacherListContent>
          {favoriteTeachers.map((teacher) => (
            <TeacherItem key={teacher.user.id} teacher={teacher} favorited />
          ))}
        </TeacherListContent>
      </TeacherListContainer>
    </Container>
  );
};

export default Favorites;
