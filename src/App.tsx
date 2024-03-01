import Button from './components/Button/Button.tsx';
import Input from './components/Input/Input.tsx';

function App() {

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter}>Press</Button>
			<Input placeholder='Email'/>
		</>
	);
}

export default App;
 