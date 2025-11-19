import React, { useEffect, useState } from "react";

import { getDocs,collection } from "firebase/firestore";
import { db } from "../Firebase";


/*
const videos = [
  { 
    id: 1, 
    title: "Smart Farming Technologies Revolutionizing Agriculture", 
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Explore how modern technology is transforming traditional farming methods",
    duration: "4:32",
    views: "245K",
    uploadDate: "2 weeks ago",
    channel: "AgriTech Innovations",
    thumbnailUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129fe?w=400&h=225&fit=crop"
  },
  { 
    id: 2, 
    title: "Tractor Automation in Modern Farming", 
    src: "https://www.w3schools.com/html/movie.mp4",
    description: "Watch automated tractors in action across large-scale farm operations",
    duration: "7:15",
    views: "189K",
    uploadDate: "1 month ago",
    channel: "Farm Machinery Today",
    thumbnailUrl: "https://images.unsplash.com/photo-1563013541-2d0c14a56b5e?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400&h=225&fit=crop"
  },
  { 
    id: 3, 
    title: "Organic Farming Techniques for Sustainable Agriculture", 
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Learn about organic methods that promote environmental sustainability",
    duration: "12:45",
    views: "512K",
    uploadDate: "3 months ago",
    channel: "Eco Farming Guide",
    thumbnailUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=225&fit=crop"
  },
  { 
    id: 4, 
    title: "Irrigation Systems for Efficient Water Management", 
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Advanced irrigation techniques to optimize water usage in farming",
    duration: "8:20",
    views: "156K",
    uploadDate: "5 days ago",
    channel: "Water Wise Farming",
    thumbnailUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1595436006173-1bb37d5cce2e?w=400&h=225&fit=crop"
  },
  { 
    id: 5, 
    title: "Harvesting Season: From Field to Market", 
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Complete journey of crops from harvesting to market distribution",
    duration: "15:30",
    views: "892K",
    uploadDate: "6 months ago",
    channel: "Farm to Table",
    thumbnailUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=225&fit=crop"
  },
  { 
    id: 6, 
    title: "Livestock Management in Modern Dairy Farms", 
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Innovative approaches to livestock care and dairy production",
    duration: "9:45",
    views: "321K",
    uploadDate: "2 months ago",
    channel: "Dairy Excellence",
    thumbnailUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    thumbnailUrl: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&h=225&fit=crop"
  }
]; */

const VideoCard = ({ video, layout = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ${
        layout === "list" ? "flex gap-4 p-4" : "flex flex-col"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* thumbnailUrl Container */}
      <div className={`relative ${layout === "list" ? "w-64 flex-shrink-0" : "w-full"}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`object-cover bg-gray-900 ${
            layout === "list" ? "h-36" : "w-full h-48"
          } transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 text-xs font-medium">
          {video.duration}
        </div>
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-red-600 p-4 transform transition-transform duration-300 hover:scale-110">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className={`${layout === "list" ? "flex-1 py-1" : "p-4"}`}>
        <div className="flex items-start space-x-3">
          {layout === "grid" && (
            <img
              src={video.thumbnailUrl}
              alt={video.channel}
              className="w-10 h-10 flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-gray-900 mb-1 hover:text-red-600 cursor-pointer transition-colors ${
              layout === "list" ? "text-lg line-clamp-2" : "text-base line-clamp-2"
            }`}>
              {video.title}
            </h3>
            
            <div className={`text-gray-600 text-sm ${layout === "list" ? 'space-y-1' : 'space-y-0.5'}`}>
              <div className="flex items-center space-x-1">
                <span className="hover:text-gray-900 cursor-pointer">{video.channel}</span>
                {layout === "grid" && (
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                  </svg>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-xs">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.uploadDate}</span>
              </div>
            </div>
            
            {layout === "list" && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="relative max-w-4xl w-full bg-black overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <video controls autoPlay className="w-full h-96 bg-black">
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img src={video.thumbnailUrl} alt={video.channel} className="w-10 h-10" />
                <div>
                  <p className="font-semibold hover:text-gray-300 cursor-pointer">{video.channel}</p>
                  <p className="text-sm text-gray-400">1.2M subscribers</p>
                </div>
              </div>
              <button className="bg-red-600 px-6 py-2 font-semibold hover:bg-red-700 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 hover:bg-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"/>
                </svg>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 hover:bg-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10,18c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S8.9,18,10,18z M10,10c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2 S8.9,10,10,10z M10,14c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S8.9,14,10,14z"/>
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-900 p-4">
            <p className="text-sm text-gray-300">{video.views} views • {video.uploadDate}</p>
            <p className="mt-2 text-gray-200">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function YouTubeStyleGallery() {
  const [layout, setLayout] = useState("grid"); // "grid" or "list"
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const [videos,setVideos] = useState([])

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);




  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Farm videos</h1>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white border border-gray-300 p-1">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 transition-colors ${
                    layout === "grid" ? "bg-gray-100 text-red-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 transition-colors ${
                    layout === "list" ? "bg-gray-100 text-red-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["All", "Technology", "Harvesting", "Irrigation", "Livestock", "Organic", "Machinery"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid/List */}
        <div className={`gap-6 ${
          layout === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col space-y-4"
        }`}>
          {videos.map((video) => (
            <div key={video.id} onClick={() => handleVideoClick(video)} className="cursor-pointer">
              <VideoCard video={video} layout={layout} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-white border border-gray-300 font-medium hover:bg-gray-50 transition-colors">
            Load More videos
          </button>
        </div>

        {/* Video Modal */}
        <VideoModal 
          video={selectedVideo} 
          isOpen={modalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    </div>
  );
}
