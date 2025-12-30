export default function NotFound() {
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .not-found-container {
      min-height: 100vh;
      background: #111827;
      display: flex;
      flex-direction: column;
    }

    .not-found-header {
      padding: 20px 40px;
      border-bottom: 1px solid #1f2937;
    }

    .not-found-logo {
      font-size: 20px;
      font-weight: 700;
      color: #f3f4f6;
    }

    .not-found-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }

    .not-found-wrapper {
      text-align: center;
      max-width: 500px;
    }

    .not-found-code {
      font-size: 120px;
      font-weight: 900;
      color: #3b82f6;
      margin-bottom: 16px;
      letter-spacing: -3px;
      line-height: 1;
    }

    .not-found-heading {
      font-size: 32px;
      color: #f3f4f6;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .not-found-description {
      font-size: 16px;
      color: #9ca3af;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .not-found-buttons {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 28px;
      font-size: 15px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .btn-secondary:hover {
      background: #3b82f6;
      color: white;
    }

    @media (max-width: 768px) {
      .not-found-code {
        font-size: 80px;
      }

      .not-found-heading {
        font-size: 24px;
      }

      .not-found-description {
        font-size: 14px;
      }

      .not-found-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="not-found-container">
     
        <div className="not-found-content">
          <div className="not-found-wrapper">
            <div className="not-found-code">404</div>
            <h1 className="not-found-heading">Page Not Found</h1>
            <p className="not-found-description">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="not-found-buttons">
              <a href="/" className="btn btn-primary">
                Go Home
              </a>
              <a href="/courses" className="btn btn-secondary">
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}