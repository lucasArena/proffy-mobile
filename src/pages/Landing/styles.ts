import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #8257e5;
  flex: 1;
  justify-content: center;
  padding: 40px;
`;

export const LandingImage = styled.Image`
  width: 100%;
`;

export const WelcomeMessage = styled.Text`
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  margin-top: 80px;
  font-family: 'Poppins-Regular';
`;

export const WelcomeMessageBold = styled.Text`
  font-family: 'Poppins-SemiBold';
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

export const StudyButton = styled(RectButton)`
  height: 150px;
  width: 48%;
  border-radius: 8px;
  padding: 24px;
  justify-content: space-between;
  background-color: #9871f5;
`;
export const StudyButtonText = styled.Text`
  font-family: 'Archivo-Bold';
  color: #fff;
  font-size: 20px;
`;

export const GiveClassesButton = styled(RectButton)`
  height: 150px;
  width: 48%;
  border-radius: 8px;
  padding: 24px;
  justify-content: space-between;
  background-color: #04d361;
`;
export const GiveClassesButtonText = styled.Text`
  font-family: 'Archivo-Bold';
  color: #fff;
  font-size: 20px;
`;

export const TotalConnections = styled.Text`
  font-family: 'Poppins-Regular';
  color: #d4c2ff;
  font-size: 12px;
  line-height: 20px;
  max-width: 140px;
  margin-top: 40px;
`;
