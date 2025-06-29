import { Link } from 'react-router-dom';
import { Lock, User, Star, Users } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const CourseCard = ({ course }) => {
  const isPublished = course.isPublished;

  return (
    <div
      key={course.id}
      className={`rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col group ${
        isPublished
          ? 'bg-white hover:shadow-xl hover:-translate-y-1'
          : 'bg-gray-100 text-gray-400'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <ImageWithFallback
          photoUrl={course.bannerUrl}
          alt={course.name || 'Course Image'}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Title and Lock Icon */}
        <div className="flex items-center justify-between mb-2">
          <h4
            className={`text-lg sm:text-xl font-bold line-clamp-2 ${
              isPublished ? 'text-gray-800' : 'text-gray-700'
            }`}
          >
            {course.name || 'Untitled Course'}
          </h4>
          {!isPublished && <Lock size={18} className="text-gray-500" />}
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-2 min-h-[3.5rem]">
          {(course.description?.slice(0, 100) || 'No description available') + '...'}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
          <User size={16} />
          <span>{course.instructor[0]?.name || 'Unknown Instructor'}</span>
        </div>

        {/* Enrolled & Rating */}
        <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.buysCnt} enrolled</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} />
            <span>{course.aggregateRating || 0}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-blue-600 font-bold text-lg sm:text-xl mt-1 mb-3">
          ₹{course.price}
        </div>

        {/* Action Button */}
        {isPublished ? (
          <Link to={`/viewcourses/${course.id}`}>
            <button className="w-full py-2 px-4 rounded flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              View Course
            </button>
          </Link>
        ) : (
          <button
            className="w-full py-2 px-4 rounded flex items-center justify-center gap-2 text-white bg-gray-400 cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
