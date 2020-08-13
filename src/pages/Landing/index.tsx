import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native';
import {
  Container,
  LandingImage,
  WelcomeMessage,
  WelcomeMessageBold,
  ButtonsContainer,
  StudyButton,
  StudyButtonText,
  GiveClassesButton,
  GiveClassesButtonText,
  TotalConnections,
} from './styles';

import ladindImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigationToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, [navigate]);

  const handleNavigationToStudyPage = useCallback(() => {
    navigate('Study');
  }, [navigate]);

  return (
    <Container>
      <LandingImage source={ladindImage} />
      <WelcomeMessage>
        Seja bem vindo,
        {'\n'}
        <WelcomeMessageBold>O que deseja fazer?</WelcomeMessageBold>
      </WelcomeMessage>

      <ButtonsContainer>
        <StudyButton onPress={handleNavigationToStudyPage}>
          <Image source={studyIcon} />
          <StudyButtonText>Estudar</StudyButtonText>
        </StudyButton>
        <GiveClassesButton onPress={handleNavigationToGiveClassesPage}>
          <Image source={giveClassesIcon} />
          <GiveClassesButtonText>Dar aula</GiveClassesButtonText>
        </GiveClassesButton>
      </ButtonsContainer>

      <TotalConnections>
        Total de 285 conexões já realizas
{' '}
        <Image source={heartIcon} />
      </TotalConnections>
    </Container>
  );
};

export default Landing;
