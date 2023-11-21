import { PaperProvider } from 'react-native-paper';
import Navigation from './routes/Navigation';

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
