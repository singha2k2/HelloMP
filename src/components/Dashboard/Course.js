import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Course() {
    const [keywords, setKeywords] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        if (thumbnails.length > 0) {
            const playlist = thumbnails.map(item => item.videoId);
            setPlaylist(playlist);
            setShowModal(true); // Show the modal when thumbnails are available
            setCurrentVideoIndex(0); // Reset current video index
        } else {
            setShowModal(false); // Hide the modal if no thumbnails are available
        }
    }, [thumbnails]);

    const handleSubmit = () => {
        console.log("Submit button clicked");
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(keywords)} full beginner course &type=video&key=AIzaSyAq_svJtuS05zuIE36LqCS3FagqSYGYens`)
            .then(res => {
                const items = res.data.items;
                const randomItems = getRandomItems(items, 5);
                const thumbnailUrls = randomItems.map(item => ({
                    url: item.snippet.thumbnails.high.url,
                    videoId: item.id.videoId
                }));
                setThumbnails(thumbnailUrls);
            })
            .catch(error => {
                console.error("Error in fetching data", error);
            })
    }

    const getRandomItems = (array, count) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handlePlayVideo = (index) => {
        setCurrentVideoIndex(index);
    }

    const handleNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }

    const handlePreviousVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    }

    return (
        <div className="" style={{background: "linear-gradient(135deg, #153677, #4e085f)",color:"white",borderRadius:"20px",width:"100%"}}>

            <div className="row" style={{marginTop:"20px"}}> 
                <div className="col text-center">
                    <h1 className="display-4">Let's Start Learning</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3 mt-2 ">
                        <input
                            type="text"
                            className="form-control mx-5"
                           style={{width:"50vw",borderRadius:"10px"}}
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                            placeholder="Enter Course Keywords"
                            aria-label="Keywords"
                        />
                        <button className="btn btn-primary ms-4 mx-4" type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal mt-5" style={{ display: 'block'  }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-start modal-lg mx-auto ms-5">
                        <div className="modal-content" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' , position:"absolute",right:"-504px"}}>
                            <div className="modal-header">
                                <h5 className="modal-title">Top Ranked {keywords} Courses</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 text-center ms-5">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${playlist[currentVideoIndex]}?autoplay=1`}
                                                title={`Video ${currentVideoIndex + 1}`}
                                                allowFullScreen
                                                allow='autoplay'
                                                className="img-fluid"
                                                style={{ width: '80%', height: '400px', display: 'block', cursor: 'pointer' }}
                                            ></iframe>
                                            <div className='mt-2' style={{marginRight:'145px'}}>
                                                <button className="btn btn-primary me-2" onClick={handlePreviousVideo} disabled={currentVideoIndex === 0}>Previous</button>
                                                <button className="btn btn-primary" onClick={handleNextVideo} disabled={currentVideoIndex === playlist.length - 1}>Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Course;
