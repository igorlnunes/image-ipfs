import React, { useState } from "react";
import Form from "./components/form";
import Input from "./components/input";
import Button from "./components/button";
import { create } from 'ipfs-http-client';
import * as S from './styled_index';

const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [metaUrl, setMetaUrl] = useState(null);
    const [formInput, setFormInput] = useState({ name: '', description: ''});

    const changeHandler = async (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      try {
        const added = await client.add(
          file,
          {
            progress: (prog) => console.log(`Recebido: ${prog}`)
          }
        )
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setSelectedUrl(url);
      } catch(error) {
        console.log('Erro no upload do arquivo: ', error);
      }
      setIsFilePicked(true);
    };

    const handleSubmission = async () => {
      const { name, description } = formInput;
      if(!name || !description || !selectedUrl) return

      const data = JSON.stringify({
        name: formInput.name, description: formInput.description,
        about: 'Ao realizar o upload seu arquivo ficará na nuvem P2P',
        imagem: selectedUrl 
      });
      try {
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        setMetaUrl(url);
        console.log(metaUrl);
      } catch (error) {
        console.log('Erro no upload da metadata: ', error);
      }
    };
  return (
    <S.wrapperApp>


    <>
      <Input onHandler={changeHandler}/>
      { isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {Math.floor(selectedFile.size / 1000)} kB</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
       {
          selectedUrl && <img src={selectedUrl} width="100px" />
        }
      {
        !metaUrl ? (
          <div>
          <Form onFileName={e => setFormInput({...formInput, name: e.target.value })}
            onDescFile={e => setFormInput({...formInput, description: e.target.value}) }/>
          
          <Button onClicked={handleSubmission}/>
          </div>
        ) : (
          <div>
            <h5>Este é o link dos metadados:</h5>
            {metaUrl}
          </div>
        )
      }
      
    </>
    </S.wrapperApp>
  );
}

export default App;
