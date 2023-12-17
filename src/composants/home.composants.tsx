import { useState, useEffect } from 'react'
import Velo from './VeloCarte.composants'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import './style.css'
import { Select, MenuItem, FormControl, InputLabel,Box } from '@mui/material';
import { logout } from '../firebase';
import axios from 'axios'
import { FormattedMessage } from 'react-intl';

export const Home = () => {
  type Velo = {
    _id: '',
    marque: '',
    modele: '',
    dateDeCreation: '',
    prix: 0,
    type: '',
    taille: '',
    roues: [],
    suspensions: [],
    fonctionnel: true,
    couleurs: [],
    nbVitesse: 0,
  };

    const navigate = useNavigate();
    const [velos, setVelos] = useState<Velo[]>([]);
    const [couleurPopulaire, setCouleurPopulaire] = useState('');
    const [prixMoyen, setPrixMoyen] = useState(0);

    const [typeVelos, setTypeVelos] = useState('Tout');
    const [grandeurVelos, setGrandeurVelos] = useState('Tout');

    const Ajouter = () => {
      navigate("/ajout");
    };

    useEffect(() => {
      axios.get('https://master--adorable-panda-985249.netlify.app/velo')
        .then((response) => {
          console.log(response.data);
          setVelos(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

        axios.get('https://master--adorable-panda-985249.netlify.app/stats/couleur')
        .then((response) => {
          setCouleurPopulaire(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

        axios.get('https://master--adorable-panda-985249.netlify.app/stats/prix')
      .then((response) => {
        const moyennePrix = parseFloat(response.data['Moyenne de prix'].replace('$', ''));
        setPrixMoyen(moyennePrix);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }, []);

    const handleInputChangeType = (e: { target: { value: any; }; }) => {
      const { value } = e.target;
      setTypeVelos(value);
      setGrandeurVelos("Tout");
      if(value == 'Tout'){
        axios.get('https://master--adorable-panda-985249.netlify.app/velo')
        .then((response) => {
          console.log(response.data);
          setVelos(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      } else {
        
        axios.get(`https://master--adorable-panda-985249.netlify.app/velo/type/${value}`)
        .then((response) => {
          console.log(response.data);
          setVelos(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }
    };

    const handleInputChangeGrandeur = (e: { target: { value: any; }; }) => {
      const { value } = e.target;
      setGrandeurVelos(value);
      setTypeVelos("Tout");
      if(value == 'Tout'){
        axios.get('https://master--adorable-panda-985249.netlify.app/velo')
        .then((response) => {
          console.log(response.data);
          setVelos(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      } else {
        axios.get(`https://master--adorable-panda-985249.netlify.app/velo/grandeur/${value}`)
        .then((response) => {
          console.log(response.data);
          setVelos(response.data.Velo);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }
    };

    const veloComposants = velos.map((velo, index) => (
      <Velo
        key={index}
        modele={velo.modele}
        marque={velo.marque}
        annee={velo.dateDeCreation}
        taille={velo.taille}
        type={velo.type}
        _id={velo._id}
      />
    ));

  return (
    <>
    <FormattedMessage id="app.prixMoyen">{txt => <h3>{txt}{prixMoyen}</h3>}</FormattedMessage>
    <FormattedMessage id="app.couleurPopulaire">{txt => <h3>{txt}{couleurPopulaire}</h3>}</FormattedMessage>

      <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '1000px'}}>
      <FormattedMessage id="app.buttonAjouter">{txt => <button onClick={() => Ajouter()}>{txt}</button>}</FormattedMessage>

        <FormControl sx={{ minWidth: 120, margin: '0 10px' }}>
          <FormattedMessage id="app.type">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Type" name="type" value={typeVelos} onChange={handleInputChangeType}>
                <MenuItem value={'Route'}><FormattedMessage id="app.typeRoute"></FormattedMessage></MenuItem>
                <MenuItem value={'Montagne monté'}><FormattedMessage id="app.typeMontagne monté"></FormattedMessage></MenuItem>
                <MenuItem value={'Montagne descente'}><FormattedMessage id="app.typeMontagne descente"></FormattedMessage></MenuItem>
                <MenuItem value={'Ville'}><FormattedMessage id="app.typeVille"></FormattedMessage></MenuItem>
                <MenuItem value={'Bmx'}><FormattedMessage id="app.typeBmx"></FormattedMessage></MenuItem>
                <MenuItem value={'Tout'}><FormattedMessage id="app.toutVelos"></FormattedMessage></MenuItem>
              </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, margin: '0 10px' }}>
            <FormattedMessage id="app.grandeur">{txt => <InputLabel>{txt}</InputLabel>}</FormattedMessage>
              <Select label="Grandeur" name="grandeur" value={grandeurVelos} onChange={handleInputChangeGrandeur}>
                <MenuItem value={'TP'}><FormattedMessage id="app.grandeurTP"></FormattedMessage></MenuItem>
                <MenuItem value={'P'}><FormattedMessage id="app.grandeurP"></FormattedMessage></MenuItem>
                <MenuItem value={'M'}><FormattedMessage id="app.grandeurM"></FormattedMessage></MenuItem>
                <MenuItem value={'L'}><FormattedMessage id="app.grandeurL"></FormattedMessage></MenuItem>
                <MenuItem value={'TL'}><FormattedMessage id="app.grandeurTL"></FormattedMessage></MenuItem>
                <MenuItem value={'Tout'}><FormattedMessage id="app.toutVelos"></FormattedMessage></MenuItem>
              </Select>
        </FormControl>
        <FormattedMessage id="app.buttonDeconnection">{txt => <button onClick={() => logout()}>{txt}</button>}</FormattedMessage>
      </Box>
      <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '1000px'}}>
        {veloComposants}
      </Box>
    </>
  );
};