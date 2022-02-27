import './App.css';
import List from './components/List/List';

// const toDoItemArray = ["Buy ice cream.", "Eat ice cream.", "Go to the gym."];

function App() {
  return (
    <div className="App">
      <List listName="Todo List" />
    </div>
  );
}

export default App;
