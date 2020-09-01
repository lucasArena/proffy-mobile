import React, { useCallback, useState } from 'react';
import { Image, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Profile,
  Avatar,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriceValue,
  ButtonsContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText,
} from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import notfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

interface TeachersProps {
  teacher: {
    user: {
      id: string;
      name: string;
      bio: string;
      whatsapp: string;
      avatar: string;
    };
    subject: string;
    cost: number;
  };
  favorited: boolean;
}

interface TeacherProps {
  user: {
    id: string;
  };
}

const TeacherItem: React.FC<TeachersProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const handleLinkToWhatsapp = useCallback(async () => {
    Linking.openURL(`whatsapp://send?phone=${teacher.user.whatsapp}`);

    await api.post('/connections', {
      user_id: teacher.user.id,
    });
  }, [teacher.user.whatsapp, teacher.user.id]);

  const handleToggleFavorite = useCallback(async () => {
    const favoriteTeachers = await AsyncStorage.getItem('favorites');
    let favoriteTeachersArray = [];

    if (favoriteTeachers) {
      favoriteTeachersArray = JSON.parse(favoriteTeachers);
    }

    if (isFavorited) {
      const favorites = favoriteTeachersArray.filter(
        (teacherItem: TeacherProps) => {
          return teacherItem.user.id !== teacher.user.id;
        },
      );
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(false);
    } else {
      favoriteTeachersArray.push(teacher);
      setIsFavorited(true);
      await AsyncStorage.setItem(
        'favorites',
        JSON.stringify(favoriteTeachersArray),
      );
    }
  }, [isFavorited, teacher]);

  return (
    <Container>
      <Profile>
        <Avatar
          source={{
            uri: teacher.user.avatar,
          }}
        />
        <ProfileInfo>
          <Name>{teacher.user.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>{teacher.user.bio}</Bio>

      <Footer>
        <Price>
          Preço/Hora
          {'   '}
          <PriceValue>
            R$
            {teacher.cost}
          </PriceValue>
        </Price>

        <ButtonsContainer>
          <FavoriteButton
            favorited={isFavorited}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={notfavoriteIcon} />
            ) : (
                <Image source={heartOutlineIcon} />
              )}
          </FavoriteButton>
          <ContactButton onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export default TeacherItem;
