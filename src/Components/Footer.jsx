const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content px-4 py-3 mt-auto w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <aside className="flex items-center gap-2">
          {/* Logo Icon */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
            10-4.48 10-10S17.52 2 12 2zm0 18
            c-4.41 0-8-3.59-8-8s3.59-8 8-8
            8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </aside>

        <nav className="flex gap-4">
          {/* Social Icons (Twitter, YouTube, Facebook) */}
          <a>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.49 8.49 0 0 1-2.7 1.03 4.26 4.26 0 0 0-7.4 3.89A12.1 12.1 0 0 1 3.1 4.6a4.26 4.26 0 0 0 1.32 5.68 4.24 4.24 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.27 4.27 0 0 0 3.98 2.96A8.55 8.55 0 0 1 2 19.54a12.07 12.07 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.18 0-.36-.01-.54A8.7 8.7 0 0 0 24 5.5a8.54 8.54 0 0 1-2.54.7z" />
            </svg>
          </a>
          <a>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 15l5.2-3L10 9v6zm12-3a9 9 0 1 0-18 0 9 9 0 0 0 18 0zM2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12z"/>
            </svg>
          </a>
          <a>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2v-2.2c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z"/>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
