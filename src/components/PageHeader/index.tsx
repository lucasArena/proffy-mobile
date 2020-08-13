import React, { useCallback } from 'react';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Container, Topbar, Title } from './styles';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { navigate } = useNavigation();

  const handleGoBack = useCallback(() => {
    navigate('Landing');
  }, [navigate]);

  return (
    <Container>
      <Topbar>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Image source={logoImg} resizeMode="contain" />
      </Topbar>

      <Title>{title}</Title>
    </Container>
  );
};

export default PageHeader;
