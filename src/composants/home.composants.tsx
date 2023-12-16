import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Velo from './VeloCarte.composants'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import './style.css'
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography, Box } from '@mui/material';
import { logout } from '../firebase';
import axios from 'axios'

export const Home = () => {
    const navigate = useNavigate();
    const [velos, setVelos] = useState<Velo[]>([]);
    const [couleurPopulaire, setCouleurPopulaire] = useState('');
    const [prixMoyen, setPrixMoyen] = useState(0);

    const [typeVelos, setTypeVelos] = useState('Tout');
    const [grandeurVelos, setGrandeurVelos] = useState('Tout');

    const Ajouter = () => {
      // Use navigate function to go to the home route
      navigate("/ajout");
    };

    const typeVelo = ["Route", "Montagne monté", "Montagne descente", "Ville", "Bmx"]

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

    const handleInputChangeType = (e) => {
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

    const handleInputChangeGrandeur = (e) => {
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
      <h1>Gestionnaire de vélo</h1>
      <h3>Prix moyen: {prixMoyen}</h3>
      <h3>Couleur populaire: {couleurPopulaire}</h3>
      <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '1000px'}}>
        <button onClick={() => Ajouter()}>Ajouter</button>
        <FormControl sx={{ minWidth: 120, margin: '0 10px' }}>
              <InputLabel>Type</InputLabel>
              <Select label="Type" name="type" value={typeVelos} onChange={handleInputChangeType}>
                <MenuItem value={'Route'}>Route</MenuItem>
                <MenuItem value={'Montagne monté'}>Montagne monté</MenuItem>
                <MenuItem value={'Montagne descente'}>Montagne descente</MenuItem>
                <MenuItem value={'Ville'}>Ville</MenuItem>
                <MenuItem value={'Bmx'}>Bmx</MenuItem>
                <MenuItem value={'Tout'}>Tout les vélos</MenuItem>
              </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, margin: '0 10px' }}>
              <InputLabel>Grandeur</InputLabel>
              <Select label="Grandeur" name="grandeur" value={grandeurVelos} onChange={handleInputChangeGrandeur}>
                <MenuItem value={'TP'}>TP</MenuItem>
                <MenuItem value={'P'}>P</MenuItem>
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'L'}>L</MenuItem>
                <MenuItem value={'TL'}>TL</MenuItem>
                <MenuItem value={'Tout'}>Tout les vélos</MenuItem>
              </Select>
        </FormControl>
        <button onClick={() => logout()}>Se déconnecter</button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '1000px'}}>
        {veloComposants}
      </Box>
    </>
  );
};