import './App.css';
import Button from './components/Button/Button.tsx';

function App() {
	return (
		<>
			<Button onClick={() => console.log('нажали')}>Press</Button>
		</>
	);
}

export default App;
