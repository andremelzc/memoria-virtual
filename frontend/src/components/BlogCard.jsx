import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ title, excerpt, slug, category }) {
  return (
    <article className="bg-light-bg border border-dark-border rounded-lg p-6 shadow-lg transition-all hover:shadow-xl hover:border-accent">
      <div className="mb-4">
        <span className="inline-block bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
        {title}
      </h3>
      
      <p className="text-text-secondary mb-4 line-clamp-3">
        {excerpt}
      </p>
      
      <Link 
        to={`/blog/${slug}`}
        className="inline-flex items-center text-accent font-semibold no-underline transition-colors hover:text-accent-hover"
      >
        Leer más 
        <span className="ml-2">→</span>
      </Link>
    </article>
  );
}

export default BlogCard;