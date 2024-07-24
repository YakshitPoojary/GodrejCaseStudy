import Predict from './components/filewiz';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {FileProvider} from './filecontext'
function App() {
    const router=createBrowserRouter([
        {path:"/",
        element:<Predict/>},
    ])
    return (
        <FileProvider>
        <div className='w-full min-h-screen mt-0 pt-0  ' >
            <RouterProvider router={router}/>
        </div>
        </FileProvider>
    );
}

export default App;
