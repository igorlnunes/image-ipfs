import React from 'react';
import * as S from './styled';
function Form({ onFileName, onDescFile}) {
       
  return (
    <S.formWrapper>
      <form >
        <label>
          File Name:
          <input
              type="text"
              maxLength='16'
              placeholder='File Name'
              onChange={onFileName}
          />
        </label>
        <label>
          Description:
          <textarea
              type="text"
              maxLength='64'
              onChange={onDescFile}    
          />
        </label>
        
      </form>
    </S.formWrapper>
  )
}

export default Form;