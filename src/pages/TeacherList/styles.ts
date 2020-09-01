import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #f0f0f7;
`;

export const TeacherListContainer = styled.ScrollView``;

export const TeacherListContent = styled.View`
  margin-top: -60px;
`;

export const SearchForm = styled(Form)`
  margin-bottom: 34px;
`;

export const Label = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins-Regular';
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputBlock = styled.View`
  width: 48%;
`;

export const SubmitButton = styled(RectButton)`
  background-color: #04d361;
  height: 56px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubmitButonText = styled.Text`
  color: #ffffff;
  font-family: 'Archivo-Bold';
  font-size: 16px;
`;
