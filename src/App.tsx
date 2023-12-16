import { HomeRoute } from './routes/home.route';
import { AjoutRoute } from './routes/ajout.route';
import { ModifierRoute } from './routes/modifier.route';
import { InfoRoute } from './routes/info.route';
import Login from './routes/login.route';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ajout" element={<AjoutRoute />} />
        <Route path="/modifier/:id" element={<ModifierRoute />} />
        <Route path="/info/:id" element={<InfoRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export const Home = () => {
  HomeRoute();
};

export const Ajout = () => {
  AjoutRoute();
};

export const Modifier = () => {
  ModifierRoute();
};

export const Info = () => {
  InfoRoute();
};

export default App;