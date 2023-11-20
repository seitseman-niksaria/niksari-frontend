import { PaperProvider } from 'react-native-paper';
import Navigation from './components/Navigation/Navigation';

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
