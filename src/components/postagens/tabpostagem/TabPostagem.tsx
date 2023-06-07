import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
        <Tabs centered style={{ backgroundColor: 'black'}} onChange={handleChange}>
            <Tab label="Todas as postagens" value="1"/>
            <Tab label="Sobre-nós" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className='tab-panel'>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className="titulo">Sobre</Typography>
          <Typography variant="body1" gutterBottom color="textPrimary" align="justify">Desde que me interessei na área da programação, estudo diariamente para conseguir a minha primeira oportunidade como Desenvolvedor. Há 4 meses venho desenvolvendo projetos para colocar em prática todo o meu conhecimento. Participei de um bootcamp de 3 meses pela Generation Brasil, onde adquirir experiência nas linguagens Java e JavaScript, atuando tanto no Front-End, implementando React e TypeScript quanto no Back-End de projetos utilizando o Spring.</Typography>
        </TabPanel>
      </TabContext>
      
    </>
  );
}
export default TabPostagem;