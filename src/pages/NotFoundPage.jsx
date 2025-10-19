import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-medium mt-4">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;