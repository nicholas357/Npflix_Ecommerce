import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FaStar } from 'react-icons/fa';

const Rating = ({ productId, setAverageRating, setReviewCount }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore();
  const auth = firebase.auth();

  const fetchReviews = async () => {
    try {
      const snapshot = await db.collection('reviews').where('productId', '==', productId).get();
      const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
      
      // Calculate average rating and review count
      const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
      const count = reviewsData.length;
      const average = count > 0 ? (totalRating / count).toFixed(1) : 0;

      setAverageRating(average); // Pass average to parent
      setReviewCount(count); // Pass count to parent
      console.log(`Average Rating: ${average}, Review Count: ${count}`);
    } catch (error) {
      console.error("Error fetching reviews: ", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview || rating === 0 || !user) return;

    setLoading(true);
    try {
      await db.collection('reviews').add({
        productId,
        review: newReview,
        rating,
        username: user.displayName || 'Anonymous',
        profilePic: user.photoURL || 'defaultPhotoURL.jpg',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewReview('');
      setRating(0);
      fetchReviews(); // Re-fetch reviews after adding a new one
    } catch (error) {
      console.error("Error adding review: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || 'Anonymous', 
          photoURL: currentUser.photoURL || 'defaultPhotoURL.jpg',
        });
      } else {
        setUser(null);
      }
    });

    fetchReviews();
    return () => unsubscribe();
  }, [productId]);

  return (
    <div className="rating-container bg-gray-50 p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      <div className="reviews-list mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-item border-b border-gray-200 py-2">
                <div className="flex items-center mb-2">
                  {review.profilePic && (
                    <img src={review.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                  )}
                  <strong className="text-lg">{review.username || 'Anonymous'}</strong>
                  <span className="text-gray-500 ml-2">{new Date(review.createdAt?.toDate()).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className={`text-xl ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-base text-xl">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-lg shadow-sm">
        <textarea 
          value={newReview} 
          onChange={(e) => setNewReview(e.target.value)} 
          placeholder="Write your review..."
          required
          className="border border-gray-300 p-2 rounded-lg w-full mb-2"
        />
        <div className="flex items-center mb-4">
          <span className="mr-2">Rating: </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar 
                key={star} 
                className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                size={30} 
                onClick={() => setRating(star)} 
              />
            ))}
          </div>
          
        </div>
        <button 
          type="submit" 
          className={`button button-small ${loading || (!newReview || rating === 0 || !user) ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading || !newReview || rating === 0 || !user} 
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      {!user && <p className="text-red-500 mt-2">You must be logged in to submit a review.</p>}
    </div>
  );
};

export default Rating;
