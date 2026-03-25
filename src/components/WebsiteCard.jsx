import React from 'react';
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";

export default function WebsiteCard({ site }) {
  const { addToCart, toggleSave, saved } = useApp();
  const isSaved = saved.find((i) => i.id === site.id);

  return (
    <div className="card-wrapper glass">
      <button 
        onClick={() => toggleSave(site)} 
        className="save-btn"
        title="Save for later"
      >
        {isSaved ? "❤️" : "🤍"}
      </button>

      <div className="card-image">
        <img src={site.image || fallbackImg} alt={site.name} />
        <span className="category-badge">{site.category}</span>
      </div>
      
      <div className="card-content">
        <div className="card-main">
          <h3 className="card-title">{site.name}</h3>
          
          <div className="card-stats">
            <span className="stat-pill">DR {site.dr}</span>
            <span className="stat-pill">Traffic {site.traffic}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="price-block">
            <span className="price-label">Asking Price</span>
            <span className="price-value">₹{site.price.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="card-actions">
          <Link to={`/details/${site.id}`} className="action-link">
            <button className="details-btn">View Details</button>
          </Link>
          <button 
            onClick={() => addToCart(site)} 
            className="cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <style jsx>{`
        .card-wrapper {
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .card-wrapper:hover {
          transform: translateY(-8px);
          border-color: var(--accent-primary);
          box-shadow: 0 0 30px var(--accent-glow);
        }

        .save-btn {
          position: absolute;
          right: 0.75rem;
          top: 0.75rem;
          z-index: 10;
          font-size: 1.25rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s;
        }

        .save-btn:hover {
          transform: scale(1.2);
        }

        .card-image {
          height: 180px;
          position: relative;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-main {
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .card-stats {
          display: flex;
          gap: 0.5rem;
        }

        .stat-pill {
          background: var(--bg-tertiary);
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-footer {
          margin: 0.75rem 0;
        }

        .price-block {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-secondary);
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .action-link {
          flex: 1;
          text-decoration: none;
        }

        .details-btn {
          width: 100%;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: all 0.3s;
        }

        .details-btn:hover {
          background: var(--bg-secondary);
          border-color: var(--text-muted);
        }

        .cart-btn {
          flex: 1;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 4px 15px var(--accent-glow);
          transition: all 0.3s;
        }

        .cart-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
