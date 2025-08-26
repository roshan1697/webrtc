import React, { useState, useRef, useEffect } from 'react';
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    Phone,
    PhoneOff,
    Monitor,
    Settings,
    MessageSquare,
    Users,
    MoreVertical,
    Volume2,
    VolumeX,
    Maximize,
    Copy,
    Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BgDecorative from './ui/bgdecorative';

interface Participant {
    id: string;
    name: string;
    isHost?: boolean;
    isMuted?: boolean;
    hasVideo?: boolean;
    isPresenting?: boolean;
}

const Sender: React.FC = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [hasVideo, setHasVideo] = useState(true);
    const [isPresenting, setIsPresenting] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showParticipants, setShowParticipants] = useState(false);
    // const [showSettings, setShowSettings] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'John Doe', message: 'Hello everyone!', time: '10:30 AM' },
        { id: 2, sender: 'You', message: 'Hi there!', time: '10:31 AM' }
    ]);
    const navigate = useNavigate()
    const videoRef = useRef<HTMLVideoElement>(null);
    const meetingId = 'abc-defg-hij';

    const participants: Participant[] = [
        { id: '1', name: 'You', isHost: true, isMuted: isMuted, hasVideo: hasVideo },
        { id: '2', name: 'John Doe', isMuted: false, hasVideo: true },

    ];

    useEffect(() => {
        // Simulate getting user media
        if (videoRef.current && hasVideo) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => console.log('Error accessing media devices:', err));
        }
    }, [hasVideo]);

    const toggleMute = () => setIsMuted(!isMuted);
    const toggleVideo = () => setHasVideo(!hasVideo);
    const togglePresenting = () => setIsPresenting(!isPresenting);
    const toggleChat = () => setShowChat(!showChat);
    const toggleParticipants = () => setShowParticipants(!showParticipants);

    const sendMessage = () => {
        if (chatMessage.trim()) {
            setChatMessages([...chatMessages, {
                id: chatMessages.length + 1,
                sender: 'You',
                message: chatMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setChatMessage('');
        }
    };

    const copyMeetingId = () => {
        navigator.clipboard.writeText(meetingId).then(() => {
            // You could add a toast notification here
            console.log('Meeting ID copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy meeting ID:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = meetingId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    };

    const leaveMeeting = () => {
        if (window.confirm('Are you sure you want to leave the meeting?')) {
            // In a real app, this would disconnect from the meeting and redirect
            navigate('/')
        }
    };

    return (
        <>
            <div className="h-screen  flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className=" px-4 py-3 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Video className="h-6 w-6 text-blue-400" />
                            <span className="text-white font-semibold">MeetSpace</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-lg">
                            <Shield className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">Meeting ID: {meetingId}</span>
                            <button
                                onClick={copyMeetingId}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>

                        <button className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex relative">
                    {/* Video Grid */}
                    <div className="flex-1 p-4">
                        <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Main Video (You) */}
                            <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video lg:col-span-2 lg:row-span-2">
                                {hasVideo ? (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-2xl font-semibold">Y</span>
                                        </div>
                                    </div>
                                )}

                                {/* Video Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                                {/* Participant Info */}
                                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                    <span className="text-white font-medium">You</span>
                                    {isMuted && <MicOff className="h-4 w-4 text-red-400" />}
                                    <span className="bg-green-500 text-xs px-2 py-1 rounded text-white">Host</span>
                                </div>

                                {/* Video Controls Overlay */}
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
                                        <Maximize className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Other Participants */}
                            {participants.slice(1, 5).map((participant) => (
                                <div key={participant.id} className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video">
                                    {participant.hasVideo ? (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xl font-semibold">
                                                    {participant.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xl font-semibold">
                                                    {participant.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                                    <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                                        <span className="text-white text-sm font-medium">{participant.name}</span>
                                        {participant.isMuted && <MicOff className="h-3 w-3 text-red-400" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Sidebar */}
                    {showChat && (
                        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Meeting Chat</h3>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatMessages.map((msg) => (
                                    <div key={msg.id} className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-sm text-gray-900">{msg.sender}</span>
                                            <span className="text-xs text-gray-500">{msg.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{msg.message}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type a message..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Participants Sidebar */}
                    {showParticipants && (
                        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="font-semibold text-gray-900">Participants ({participants.length})</h3>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {participants.map((participant) => (
                                    <div key={participant.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {participant.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{participant.name}</p>
                                                {participant.isHost && (
                                                    <span className="text-xs text-blue-600">Host</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            {participant.isMuted ? (
                                                <MicOff className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <Mic className="h-4 w-4 text-green-500" />
                                            )}
                                            {participant.hasVideo ? (
                                                <Video className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <VideoOff className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Controls */}
                <div className="fixed bottom-1 left-125 h-fit rounded-2xl  px-6 py-4 bg-gray-800/60  z-10 w-fit">
                    <div className="flex items-center justify-center max-w-4xl mx-auto">
                        {/* Main Controls */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleMute}
                                className={`p-3 rounded-full transition-colors ${isMuted
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </button>

                            <button
                                onClick={toggleVideo}
                                className={`p-3 rounded-full transition-colors ${!hasVideo
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                {hasVideo ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                            </button>

                            <button
                                onClick={togglePresenting}
                                className={`p-3 rounded-full transition-colors ${isPresenting
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                <Monitor className="h-5 w-5" />
                            </button>

                            <button
                                onClick={leaveMeeting}
                                className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                                title="Leave Meeting"
                            >
                                <PhoneOff className="h-5 w-5" />
                            </button>

                            {/* Separator */}
                            <div className="w-px h-6 bg-gray-600 mx-2"></div>

                            <button
                                onClick={toggleChat}
                                className={`p-3 rounded-full transition-colors ${showChat
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                <MessageSquare className="h-5 w-5" />
                            </button>

                            <button
                                onClick={toggleParticipants}
                                className={`p-3 rounded-full transition-colors ${showParticipants
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                <Users className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <BgDecorative/>

        </>
    )
}

export default Sender