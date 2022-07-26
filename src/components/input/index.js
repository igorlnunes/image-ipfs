import React, { useRef } from 'react';
import * as S from './styled';

export default function Input({ onHandler }) {
  return (
    <S.inputWrapper>
      <input type="file" name="file" accept='image/png, image/jpg, image/gif, image/jpeg' onChange={onHandler} />
    </S.inputWrapper>
  )
}
