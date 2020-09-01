import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { BorderlessButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import {
  Container,
  TeacherListContainer,
  TeacherListContent,
  SearchForm,
  Label,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButonText,
} from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import api from '../../services/api';

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

const TeacherList: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState<TeachersProps[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(async () => {
    const favoritesTeachersStorage = await AsyncStorage.getItem('favorites');

    if (favoritesTeachersStorage) {
      const favoriteTeachers = JSON.parse(favoritesTeachersStorage);
      const favoriteTeachersIds = favoriteTeachers.map(
        (teacher: TeachersProps) => teacher.user.id,
      );
      setFavorites(favoriteTeachersIds);
    }
  }, []);

  const handleFilterTeachers = useCallback(
    async (data) => {
      loadFavorites();
      const classes = await api.get('/classes', {
        params: {
          ...data,
          week_day: Number(data.week_day),
        },
      });
      setFiltersVisible(false);
      setTeachers(classes.data);
    },
    [loadFavorites],
  );

  useFocusEffect(() => {
    loadFavorites();
  });

  const handleToggleVisible = useCallback(() => {
    setFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  return (
    <Container>
      <TeacherListContainer
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <PageHeader
          title="Proffys disponíveis"
          headerRight={(
            <BorderlessButton onPress={handleToggleVisible}>
              <Icon name="filter" size={20} color="#FFF" />
            </BorderlessButton>
          )}
        >
          {isFiltersVisible && (
            <SearchForm onSubmit={handleFilterTeachers} ref={formRef}>
              <Label>Matéria</Label>
              <Input
                name="subject"
                placeholder="Qual a matéria?"
                placeholderTextColor="#c1bccc"
              />

              <InputGroup>
                <InputBlock>
                  <Label>Dia da semana</Label>
                  <Input
                    name="week_day"
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                  />
                </InputBlock>
                <InputBlock>
                  <Label>Horário</Label>
                  <Input
                    name="time"
                    placeholder="Qual a hora?"
                    placeholderTextColor="#c1bccc"
                  />
                </InputBlock>
              </InputGroup>

              <SubmitButton onPress={() => formRef.current?.submitForm()}>
                <SubmitButonText>Filtrar</SubmitButonText>
              </SubmitButton>
            </SearchForm>
          )}
        </PageHeader>
        <TeacherListContent>
          {teachers.map((teacher) => (
            <TeacherItem
              key={teacher.user.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.user.id)}
            />
          ))}
        </TeacherListContent>
      </TeacherListContainer>
    </Container>
  );
};

export default TeacherList;
