import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 144 }, (_, i) => (
            <div key={i} className="bg-base-content rounded"></div>
          ))}
        </div>
      </div>
      
      <div className="hero-content text-center relative z-10">
        <div className="max-w-md">
          {/* Error Badge */}
          <div className="badge badge-error badge-lg mb-4 text-white font-bold">
            ERROR
          </div>
          
          {/* 404 Visual */}
          <div className="text-9xl font-black text-primary mb-6 opacity-80">
            404
          </div>
          
          {/* Sad Face Icon */}
          <div className="text-6xl mb-6 opacity-60">
            😞
          </div>
          
          {/* Error Message */}
          <h1 className="text-3xl font-bold text-base-content mb-4">
            Page Not Found
          </h1>
          
          <p className="text-base-content/70 mb-8">
            We can't seem to find the page you are looking for! 
            The page might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn btn-primary btn-wide"
            >
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="btn btn-outline btn-wide"
            >
              Go Back
            </button>
          </div>
          
          {/* Additional Help */}
          <div className="divider my-8"></div>
          
         
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 w-full">
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} - INECOSYSTEM-BRIGDES
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}