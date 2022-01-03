import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../../store/review";
import { getEvents } from "../../store/event";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const userId = useSelector((state) => state.session.user.id);
  const [foodRating, setFoodRating] = useState(0);
  const [experienceRating, setExperienceRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const event = useSelector((state) => state?.event[eventId]);
  console.log("**************** eventId", event);
  console.log("mmmmmmmm***************mmmm eventId", eventId);

  const validate = () => {
    const validationErrors = [];

    if (
      !foodRating ||
      !experienceRating ||
      !cleanlinessRating ||
      !accuracyRating ||
      !valueRating ||
      !communicationRating ||
      !comment
    )
      validationErrors.push(
        "Your review request is incomplete.  Please fill out all fields and submit again"
      );

    return validationErrors;
  };

  useEffect(() => {
    // dispatch(getEvent(eventId));
    dispatch(getEvents()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      setFoodRating(0);
      setExperienceRating(0);
      setCleanlinessRating(0);
      setAccuracyRating(0);
      setValueRating(0);
      setCommunicationRating(0);
      setComment("");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (errors.length > 0) return setValidationErrors(errors);

    const payload = {
      userId,
      eventId,
      food: foodRating,
      experience: experienceRating,
      cleanliness: cleanlinessRating,
      accuracy: accuracyRating,
      value: valueRating,
      communication: communicationRating,
      comment,
    };

    dispatch(addReview(payload));
    history.push(`/events/${event.id}`);
    // history.push("/events");
  };

  return (
    <>
      {isLoaded && (
        <div className="review-container">
          <div>Leave a Review</div>
          <div className="rating-container">
            <div>
              <div>Food</div>
              <Rating
                onClick={(rating) => setFoodRating(rating)}
                ratingValue={foodRating}
                showTooltip
              />
            </div>

            <div>
              <div>Experience</div>
              <Rating
                onClick={(rating) => setExperienceRating(rating)}
                ratingValue={experienceRating}
                showTooltip
              />
            </div>
            <div>
              <div>Cleanliness</div>
              <Rating
                onClick={(rating) => setCleanlinessRating(rating)}
                ratingValue={cleanlinessRating}
                showTooltip
              />
            </div>
            <div>
              <div>Accuracy</div>
              <Rating
                onClick={(rating) => setAccuracyRating(rating)}
                ratingValue={accuracyRating}
                showTooltip
              />
            </div>
            <div>
              <div>Value</div>
              <Rating
                onClick={(rating) => setValueRating(rating)}
                ratingValue={valueRating}
                showTooltip
              />
            </div>
            <div>
              <div>Communication</div>
              <Rating
                onClick={(rating) => setCommunicationRating(rating)}
                ratingValue={communicationRating}
                showTooltip
              />
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Comment</label>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                type="text"
                placeholder="Comment"
              />
              <div className="review-button">
                <button type="submit">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

//   <Rating onClick={handleRating} ratingValue={rating}

export default ReviewForm;
