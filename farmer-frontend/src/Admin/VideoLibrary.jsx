import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const VideoLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [video, setVideo] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    tags: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Fetch all videos
  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videosArray);
    } catch (error) {
      console.error("Error fetching videos:", error);
      alert("Failed to load videos data.");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newVideo = {
        title: video.title,
        description: video.description,
        category: video.category,
        duration: video.duration,
        tags: video.tags.split(',').map(tag => tag.trim()),
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl || getDefaultThumbnail(video.category),
        status: "active",
        views: 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "videos"), newVideo);

      alert("✅ Video added successfully!");
      setShowAddForm(false);
      resetForm();
      fetchVideos();
    } catch (error) {
      console.error("Error adding video:", error);
      alert("❌ Failed to add video");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle video edit
  const handleEdit = (videoItem) => {
    setEditingVideo(videoItem);
    setVideo({
      title: videoItem.title,
      description: videoItem.description,
      category: videoItem.category,
      duration: videoItem.duration,
      tags: videoItem.tags.join(', '),
      videoUrl: videoItem.videoUrl,
      thumbnailUrl: videoItem.thumbnailUrl,
    });
    setShowAddForm(true);
  };

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedVideo = {
        title: video.title,
        description: video.description,
        category: video.category,
        duration: video.duration,
        tags: video.tags.split(',').map(tag => tag.trim()),
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl || getDefaultThumbnail(video.category),
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "videos", editingVideo.id), updatedVideo);

      alert("✅ Video updated successfully!");
      setShowAddForm(false);
      resetForm();
      setEditingVideo(null);
      fetchVideos();
    } catch (error) {
      console.error("Error updating video:", error);
      alert("❌ Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle video deletion
  const handleDelete = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await deleteDoc(doc(db, "videos", videoId));
        alert("✅ Video deleted successfully!");
        fetchVideos();
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("❌ Failed to delete video");
      }
    }
  };

  // ✅ Generate default thumbnail based on category
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

  // ✅ Extract video ID for embedded players
  const getVideoEmbedUrl = (videoUrl) => {
    // YouTube
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = videoUrl.match(regExp);
      const videoId = (match && match[7].length === 11) ? match[7] : null;
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    }
    
    // Vimeo
    if (videoUrl.includes('vimeo.com')) {
      const regExp = /vimeo\.com\/(\d+)/;
      const match = videoUrl.match(regExp);
      const videoId = match ? match[1] : null;
      return videoId ? `https://player.vimeo.com/video/${videoId}` : videoUrl;
    }
    
    return videoUrl;
  };

  // ✅ Reset form
  const resetForm = () => {
    setVideo({
      title: "",
      description: "",
      category: "",
      duration: "",
      tags: "",
      videoUrl: "",
      thumbnailUrl: "",
    });
    setEditingVideo(null);
  };

  // ✅ Filter videos based on search
  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Video Library Management</h1>
        <p className="text-gray-600">Manage all video content (URL-based)</p>
      </div>

      {/* Search + Add Button */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search videos by title, category, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(!showAddForm);
          }}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
        >
          {showAddForm ? "Close Form" : "Add Video"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingVideo ? "Edit Video" : "Add New Video"}
          </h2>
          <form
            onSubmit={editingVideo ? handleUpdate : handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Video Title"
              name="title"
              value={video.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={video.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 5:30)"
              name="duration"
              value={video.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              name="tags"
              value={video.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Video URL (YouTube, Vimeo, etc.)"
              name="videoUrl"
              value={video.videoUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
              required
            />
            <input
              type="url"
              placeholder="Thumbnail URL (optional)"
              name="thumbnailUrl"
              value={video.thumbnailUrl}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={video.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg md:col-span-2"
              rows="3"
              required
            />

            <div className="md:col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 disabled:bg-green-400"
              >
                {loading ? "Saving..." : (editingVideo ? "Update Video" : "Add Video")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Grid */}
      <div className="bg-white rounded-lg shadow border">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredVideos.map((videoItem) => (
              <div key={videoItem.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                    <a 
                      href={videoItem.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="opacity-0 hover:opacity-100 bg-white bg-opacity-90 rounded-full p-3 transition-opacity"
                    >
                      <span className="text-lg">▶</span>
                    </a>
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
                    {videoItem.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{videoItem.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        videoItem.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {videoItem.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(videoItem)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(videoItem.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No videos found. {videos.length === 0 && "Add your first video using the 'Add Video' button!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;