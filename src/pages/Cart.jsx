import React from 'react';
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

const fallbackImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";

export default function Cart() {
  const { cart, removeFromCart } = useApp();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">
        Your <span className="gradient-text">Cart</span>
      </h1>
      
      {cart.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item glass">
                <div className="cart-item-info">
                  <img src={item.image || fallbackImg} alt={item.name} className="cart-item-image" />
                  <div>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <aside className="order-summary glass">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Platform Fee <span className="fee-badge">2%</span></span>
              <span>₹{(total * 0.02).toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span className="gradient-text">₹{(total * 1.02).toLocaleString()}</span>
            </div>
            
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
            <p className="secure-text">
              <span>🔒</span> Secure checkout powered by Escrow.com
            </p>
          </aside>
        </div>
      ) : (
        <div className="empty-cart glass">
          <div className="empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="2"/>
              <circle cx="20" cy="21" r="2"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-text">Browse the marketplace to find your next digital investment.</p>
          <Link to="/marketplace" className="browse-btn">
            Browse Marketplace
          </Link>
        </div>
      )}

      <style jsx>{`
        .page-container {
          padding: 2.5rem 0 5rem;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 3rem;
          align-items: start;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-radius: 1.5rem;
          transition: all 0.3s;
        }

        .cart-item:hover {
          border-color: var(--accent-primary);
        }

        .cart-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-item-image {
          width: 80px;
          height: 64px;
          object-fit: cover;
          border-radius: 12px;
        }

        .cart-item-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .cart-item-category {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .cart-item-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-secondary);
        }

        .remove-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: var(--text-secondary);
          transition: all 0.3s;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .order-summary {
          padding: 2rem;
          border-radius: 1.5rem;
          position: sticky;
          top: 100px;
        }

        .summary-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .fee-badge {
          background: var(--bg-tertiary);
          padding: 0.1rem 0.5rem;
          border-radius: 6px;
          font-size: 0.7rem;
          margin-left: 0.25rem;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          margin-top: 0.5rem;
          border-top: 1px solid var(--border-color);
          font-size: 1.5rem;
          font-weight: 700;
        }

        .checkout-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          margin-top: 1.5rem;
          box-shadow: 0 4px 20px var(--accent-glow);
          transition: all 0.3s;
        }

        .checkout-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .secure-text {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .empty-cart {
          text-align: center;
          padding: 4rem;
          border-radius: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: var(--bg-tertiary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--text-secondary);
        }

        .empty-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-text {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .browse-btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 9999px;
          font-weight: 600;
          box-shadow: 0 4px 15px var(--accent-glow);
          transition: all 0.3s;
        }

        .browse-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }

          .order-summary {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .page-title {
            font-size: 2rem;
          }

          .cart-item {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .cart-item-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
