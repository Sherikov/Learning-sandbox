import './styles.css';
import Card from './component/Card.jsx';

const desription = 'Crafting brand and communication strategies, creating visual designs, leading art direction, and capturing portraits through photography.'
const App = () => {
  return (
    <Card className="card" name='Sarah Max' tag='@sarahmax' desription={desription}></Card>
  );
};

export default App;
