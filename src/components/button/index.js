import React from 'react';
import * as S from './styled';

export default function Button({ onClicked }) {
  return (
    <S.Wrapper>
      <button onClick={onClicked}>Enviar</button>
    </S.Wrapper>
  )
}
