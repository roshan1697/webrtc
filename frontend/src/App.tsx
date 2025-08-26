import { Video, Users,  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BgDecorative from './components/ui/bgdecorative';


function App() {
  const navigate = useNavigate()

  return (
    <>
      <div className="min-h-screen ">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-white">MeetSpace</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-blue-700 transition-colors">Features</a>
            <a href="#" className="text-white hover:text-blue-700 transition-colors">Pricing</a>
            <a href="#" className="text-white hover:text-blue-700 transition-colors">Support</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect, Collaborate,
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Create</span>
          </h1>
          
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            Host secure video meetings, collaborate in real-time, and bring your team together from anywhere in the world.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[200px]"
            onClick={()=>navigate('/sender')}>
              <div className="flex items-center justify-center space-x-3">
                <Video className="h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
                <span>Create Meeting</span>
              </div>
            </button>
            
            <button className="group relative bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[200px]"
            onClick={()=>navigate('/receiver')}
            >
              <div className="flex items-center justify-center space-x-3">
                <Users className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                <span>Join Meeting</span>
              </div>
            </button>
          </div>

          

        
          
        </div>
      </main>
<BgDecorative/>
    </div>
    </>
  )
}

export default App
