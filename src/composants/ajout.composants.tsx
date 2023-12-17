import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

export const Ajout = () => {
  const navigate = useNavigate();

  const [roueSubmit, setRoueSubmit] = useState(false);
  const [suspensionSubmit, setSuspensionSubmit] = useState(false);

  const [veloInfo, setVeloInfo] = useState({
    marque: '',
    modele: '',
    dateDeCreation: '',
    prix: 0,
    type: '',
    taille: '',
    roues: [
      { marque: '', grandeur: 0, tubeless: false, psiMax: 0 },
      { marque: '', grandeur: 0, tubeless: false, psiMax: 0 },
    ],
    suspensions: [
      { type: "", marque: '', psiMin: 0, psiMax: 0, taille: 0 },
      { type: "", marque: '', psiMin: 0, psiMax: 0, taille: 0 },
    ],
    fonctionnel: false,
    couleurs: [''],
    nbVitesse: 0,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
  
    /*
    * Code généré par chatGPT
    */
    const inputValue = type === 'checkbox' ? checked : type === 'number' ? +value : name === 'couleurs' ? value.split(',').map((color: string) => color.trim()) :  name === 'dateDeCreation' ? new Date(value).toISOString().split('T')[0] : value;
    //Fin code emprunté

    setVeloInfo({
      ...veloInfo,
      [name]: inputValue,
    });
  };
  

  const handleInputChangeRoueEtSuspension = (e: any, index: number, section: string) => {
    const { name } = e.target;

    setVeloInfo((prevInfo) => {
      const nouvelle: any = { ...prevInfo };
     nouvelle[section][index] = { ...(nouvelle[section][index] as any), [name]: name };
      return nouvelle;
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  
    if(veloInfo.prix <= 0 || veloInfo.nbVitesse <= 0){
      window.alert("Le prix et la grandeurs du vélo doivent être supérieurs à 0");
    } else {
       if (!roueSubmit || !suspensionSubmit) {
       window.alert("Veillez-vous assurez que vous avez fournis tout les éléments des roues et suspensions");
    } else {
      axios
        .post(`https://master--adorable-panda-985249.netlify.app/velo`, { Velo: veloInfo })
        .then((response) => {
          console.log('Bike data updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating bike data:', error);
        });
      navigate('/');
    }
    }
   
  };
  
  const handleSubmitRoue = (e: any) => {
    e.preventDefault();
    if(veloInfo.roues[0].grandeur <= 0 || veloInfo.roues[1].grandeur <= 0 || veloInfo.roues[0].psiMax <= 0 || veloInfo.roues[1].psiMax <= 0){
      window.alert("Les grandeurs et les psi max doivent être plus grand que 0");
    } else {
      setRoueSubmit(true);
    }
    
  };

  const handleSubmitSuspension = (e: any) => {
    e.preventDefault();
    if(veloInfo.suspensions[0].psiMax <= 0 || veloInfo.suspensions[1].psiMax <= 0 || veloInfo.suspensions[0].psiMin <= 0 || veloInfo.suspensions[1].psiMin <= 0 || veloInfo.suspensions[0].taille <= 0 || veloInfo.suspensions[1].taille <= 0){
      window.alert("Les psi max, psi min et la taille max doivent être plus grand que 0");
    } else {
      setSuspensionSubmit(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <FormattedMessage id="ajouter.info">{txt => <Typography variant="h6">{txt}</Typography>}</FormattedMessage>

            <FormattedMessage id="info.marque">{txt => <TextField label={txt} name="marque" value={veloInfo.marque} onChange={handleInputChange} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.modele">{txt => <TextField label={txt} name="modele" value={veloInfo.modele} onChange={handleInputChange} required fullWidth />}</FormattedMessage>
            <TextField name="dateDeCreation" type="date" value={veloInfo.dateDeCreation} onChange={handleInputChange} required fullWidth />
            <FormattedMessage id="info.prix">{txt => <TextField label={txt} name="prix" type="number" value={veloInfo.prix} onChange={handleInputChange} required fullWidth />}</FormattedMessage>
            <FormControl fullWidth>
            <FormattedMessage id="app.type">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Type" name="type" value={veloInfo.type} onChange={handleInputChange} required>
              <MenuItem value={'Route'}><FormattedMessage id="app.typeRoute"></FormattedMessage></MenuItem>
                <MenuItem value={'Montagne monté'}><FormattedMessage id="app.typeMontagne monté"></FormattedMessage></MenuItem>
                <MenuItem value={'Montagne descente'}><FormattedMessage id="app.typeMontagne descente"></FormattedMessage></MenuItem>
                <MenuItem value={'Ville'}><FormattedMessage id="app.typeVille"></FormattedMessage></MenuItem>
                <MenuItem value={'Bmx'}><FormattedMessage id="app.typeBmx"></FormattedMessage></MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
            <FormattedMessage id="app.grandeur">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Taille" name="taille" value={veloInfo.taille} onChange={handleInputChange} required>
              <MenuItem value={'TP'}><FormattedMessage id="app.grandeurTP"></FormattedMessage></MenuItem>
                <MenuItem value={'P'}><FormattedMessage id="app.grandeurP"></FormattedMessage></MenuItem>
                <MenuItem value={'M'}><FormattedMessage id="app.grandeurM"></FormattedMessage></MenuItem>
                <MenuItem value={'L'}><FormattedMessage id="app.grandeurL"></FormattedMessage></MenuItem>
                <MenuItem value={'TL'}><FormattedMessage id="app.grandeurTL"></FormattedMessage></MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
            <FormattedMessage id="info.fonctionnel">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Fonctionnel" name="fonctionnel" value={veloInfo.fonctionnel} onChange={handleInputChange} required>
                <MenuItem value={'true'}><FormattedMessage id="info.oui"></FormattedMessage></MenuItem>
                <MenuItem value={'false'}><FormattedMessage id="info.non"></FormattedMessage></MenuItem>
              </Select>
            </FormControl>
            <FormattedMessage id="info.vitesse">{txt => <TextField label={txt} name="nbVitesse" type="number" value={veloInfo.nbVitesse} onChange={handleInputChange} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.couleurs">{txt =>  <TextField label={txt} name="couleurs" value={veloInfo.couleurs.join(', ')} onChange={handleInputChange} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="ajouter.buttonSoummettre">{txt =>  <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>{txt}</Button>}</FormattedMessage>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmitRoue}>
            <FormattedMessage id="ajouter.roueAvant">{txt => <Typography variant="h6">{txt}</Typography>}</FormattedMessage>
            <FormattedMessage id="info.marque">{txt => <TextField label={txt} name="marque" value={veloInfo.roues[0].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="app.grandeur">{txt => <TextField label={txt} name="grandeur" type="number" value={veloInfo.roues[0].grandeur} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth/>}</FormattedMessage>
            
            <FormControl fullWidth>
              <FormattedMessage id="info.tubeless">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Tubeless" name="tubeless" value={veloInfo.roues[0].tubeless} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required>
                <MenuItem value={'true'}><FormattedMessage id="info.oui"></FormattedMessage></MenuItem>
                <MenuItem value={'false'}><FormattedMessage id="info.non"></FormattedMessage></MenuItem>
              </Select>
            </FormControl>
            <FormattedMessage id="info.psiMax">{txt => <TextField label={txt} name="psiMax" type="number" value={veloInfo.roues[0].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'roues')} required fullWidth />}</FormattedMessage>
            
            <FormattedMessage id="ajouter.roueArriere">{txt => <Typography variant="h6" marginTop={3}>{txt}</Typography>}</FormattedMessage>

            <FormattedMessage id="info.marque">{txt => <TextField label={txt} name="marque" value={veloInfo.roues[1].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="app.grandeur">{txt => <TextField label={txt} name="grandeur" type="number" value={veloInfo.roues[1].grandeur} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth/>}</FormattedMessage>
            <FormControl fullWidth>
              <FormattedMessage id="info.tubeless">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Tubeless" name="tubeless" value={veloInfo.roues[1].tubeless} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required>
                <MenuItem value={'true'}><FormattedMessage id="info.oui"></FormattedMessage></MenuItem>
                <MenuItem value={'false'}><FormattedMessage id="info.non"></FormattedMessage></MenuItem>
              </Select>
            </FormControl>
            <FormattedMessage id="info.psiMax">{txt => <TextField label={txt} name="psiMax" type="number" value={veloInfo.roues[1].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'roues')} required fullWidth />}</FormattedMessage>
            
            <FormattedMessage id="ajouter.buttonSoummettre">{txt =>  <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>{txt}</Button>}</FormattedMessage>
          </form>
        </Paper>
      </Grid>


      <Grid item xs={12} sm={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <form onSubmit={handleSubmitSuspension}>
            
          <FormattedMessage id="ajouter.suspensionAvant">{txt => <Typography variant="h6">{txt}</Typography>}</FormattedMessage>
            
            <FormattedMessage id="info.marque">{txt => <TextField label={txt} name="marque" value={veloInfo.suspensions[0].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.psiMin">{txt => <TextField label={txt} name="psiMin" type="number" value={veloInfo.suspensions[0].psiMin} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.psiMax">{txt => <TextField label={txt} name="psiMax" type="number" value={veloInfo.suspensions[0].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="app.grandeur">{txt => <TextField label={txt} name="taille" type="number" value={veloInfo.suspensions[0].taille} onChange={(e) => handleInputChangeRoueEtSuspension(e, 0, 'suspensions')} required fullWidth />}</FormattedMessage>

            <FormattedMessage id="ajouter.suspensionArriere">{txt => <Typography variant="h6" marginTop={3}>{txt}</Typography>}</FormattedMessage>
            <FormattedMessage id="info.marque">{txt => <TextField label={txt} name="marque" value={veloInfo.suspensions[1].marque} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.psiMin">{txt => <TextField label={txt} name="psiMin" type="number" value={veloInfo.suspensions[1].psiMin} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="info.psiMax">{txt => <TextField label={txt} name="psiMax" type="number" value={veloInfo.suspensions[1].psiMax} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />}</FormattedMessage>
            <FormattedMessage id="app.grandeur">{txt => <TextField label={txt} name="taille" type="number" value={veloInfo.suspensions[1].taille} onChange={(e) => handleInputChangeRoueEtSuspension(e, 1, 'suspensions')} required fullWidth />}</FormattedMessage>

            <FormattedMessage id="ajouter.buttonSoummettre">{txt =>  <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>{txt}</Button>}</FormattedMessage>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Ajout;
