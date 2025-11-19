import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, getDocs, query, where, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';

function Profile() {
  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    tags: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  // Auth check function
  const authCheck = async () => {
    const uid = localStorage.getItem("firebaseUID");
    const token = localStorage.getItem("firebaseTOKEN");

    if (!uid || !token) {
      navigate("/login");
      return false;
    }

    const q = query(
      collection(db, "user_token"),
      where("uid", "==", uid),
      where("token", "==", token)
    );

    const querySnap = await getDocs(q);
    return querySnap.docs.length > 0;
  };

  // Get user data
  const getUserData = async () => {
    const uid = localStorage.getItem("firebaseUID");
    if (!uid) return;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  };

  // Fetch user's videos
  const fetchUserVideos = async () => {
    const uid = localStorage.getItem("firebaseUID");
    if (!uid) return;

    try {
      const q = query(collection(db, "videos"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      const videosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserVideos(videosArray);
    } catch (error) {
      console.error("Error fetching user videos:", error);
    }
  };

  // Handle form input changes
  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle video submission
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setVideoLoading(true);

    const uid = localStorage.getItem("firebaseUID");
    if (!uid) {
      alert("User not authenticated");
      return;
    }

    try {
      const newVideo = {
        title: video.title,
        description: video.description,
        category: video.category,
        duration: video.duration,
        tags: video.tags.split(',').map(tag => tag.trim()),
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl || getDefaultThumbnail(video.category),
        status: "pending", // Videos from users start as pending
        views: 0,
        userId: uid,
        userName: user?.uname || user?.name || "User",
        userEmail: user?.email,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "videos"), newVideo);

      alert("✅ Video submitted successfully! It will be reviewed by admin.");
      setShowVideoForm(false);
      resetVideoForm();
      fetchUserVideos(); // Refresh the video list
    } catch (error) {
      console.error("Error adding video:", error);
      alert("❌ Failed to submit video");
    } finally {
      setVideoLoading(false);
    }
  };

  // Generate default thumbnail based on category
  const getDefaultThumbnail = (category) => {
    const thumbnails = {
      education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      tutorial: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      farming: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      technology: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      default: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400"
    };
    return thumbnails[category.toLowerCase()] || thumbnails.default;
  };

  // Reset video form
  const resetVideoForm = () => {
    setVideo({
      title: "",
      description: "",
      category: "",
      duration: "",
      tags: "",
      videoUrl: "",
      thumbnailUrl: "",
    });
  };

  useEffect(() => {
    (async () => {
      const valid = await authCheck();
      if (!valid) return navigate("/login");

      await getUserData();
      await fetchUserVideos();
      setLoading(false);
    })();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Profile Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <img
            src={user.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border border-gray-300 shadow-sm mb-4"
          />

          <h2 className="text-2xl font-bold text-green-600 mb-1">
            {user.uname || user.name || "User"}
          </h2>
          <p className="text-gray-700 text-sm">{user.email}</p>

          <hr className="my-5" />

         

          <button
            onClick={() => setShowVideoForm(!showVideoForm)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {showVideoForm ? "Cancel Add Video" : "Add New Video"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Home
          </button>
        </div>
      </div>

      {/* Video Submission Form */}
      {showVideoForm && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Add New Video</h2>
          <form
            onSubmit={handleVideoSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Video Title"
              name="title"
              value={video.title}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={video.category}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 5:30)"
              name="duration"
              value={video.duration}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              name="tags"
              value={video.tags}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Video URL (YouTube, Vimeo, etc.)"
              name="videoUrl"
              value={video.videoUrl}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
              required
            />
            <input
              type="url"
              placeholder="Thumbnail URL (optional)"
              name="thumbnailUrl"
              value={video.thumbnailUrl}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={video.description}
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
              rows="3"
              required
            />

            <div className="md:col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowVideoForm(false);
                  resetVideoForm();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={videoLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {videoLoading ? "Submitting..." : "Submit Video"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User's Videos Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Videos</h2>
        
        {userVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userVideos.map((videoItem) => (
              <div key={videoItem.id} className="bg-white rounded-lg shadow border overflow-hidden">
                <div className="relative">
                  {videoItem.thumbnailUrl ? (
                    <img
                      src={videoItem.thumbnailUrl}
                      alt={videoItem.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Thumbnail</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {videoItem.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{videoItem.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{videoItem.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{videoItem.category}</span>
                    <span>{videoItem.views} views</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {videoItem.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        videoItem.status === "active"
                          ? "bg-green-100 text-green-800"
                          : videoItem.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {videoItem.status}
                    </span>
                    <a 
                      href={videoItem.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Watch
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border p-8 text-center">
            <p className="text-gray-500">No videos submitted yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Click "Add New Video" to submit your first video!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;