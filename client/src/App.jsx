import { Drawer } from "./components/Drawer";
import Chat from "./components/Chat"
// const socket =io('http://127.0.0.1:3001');
function App() {
  return (
    <>
      <div className="bg-red-50 flex h-screen justify-center items-center">
        <Drawer />
        <Chat />
      </div>
      
    </>
  );
}

export default App;
