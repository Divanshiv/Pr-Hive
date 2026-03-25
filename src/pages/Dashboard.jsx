import React from 'react';
import { useApp } from "../context/AppContext";

function StatCard({ title, value }) {
  return (
    <div className="stat-card glass">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const { cart, saved } = useApp();
  const totalSpend = cart.reduce((acc, i) => acc + i.price, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">
        Buyer <span className="gradient-text">Dashboard</span>
      </h1>
      
      <div className="dashboard-grid">
        <div className="stats-grid">
          <StatCard title="Orders" value={cart.length} />
          <StatCard title="Spend" value={`₹${totalSpend.toLocaleString()}`} />
          <StatCard title="Saved" value={saved.length} />
          <StatCard title="Pending" value={cart.length} />
        </div>

        <div className="dashboard-panels">
          <div className="panel glass">
            <div className="panel-header">
              <h2 className="panel-title">Recent Orders</h2>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3 className="empty-title">No active orders</h3>
                <p className="empty-text">You haven't purchased anything yet.</p>
              </div>
            ) : (
              <div className="panel-items">
                {cart.map(item => (
                  <div key={item.id} className="panel-item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel glass">
            <div className="panel-header">
              <h2 className="panel-title">Saved Listings</h2>
            </div>
            
            {saved.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>
                <h3 className="empty-title">No saved items</h3>
                <p className="empty-text">You haven't hit the heart icon on any listings yet.</p>
              </div>
            ) : (
              <div className="panel-items">
                {saved.map(item => (
                  <div key={item.id} className="panel-item">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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

        .dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .stat-card {
          flex: 1;
          padding: 1.5rem;
          border-radius: 1.5rem;
          text-align: center;
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: 0 10px 30px var(--accent-glow);
        }

        .stat-title {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }

        .dashboard-panels {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .panel {
          padding: 2rem;
          border-radius: 2rem;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .panel-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .empty-state {
          text-align: center;
          padding: 2.5rem 0;
          opacity: 0.7;
        }

        .empty-icon {
          width: 50px;
          height: 50px;
          background: var(--bg-tertiary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 1.5rem;
        }

        .empty-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 1rem;
        }

        .empty-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .panel-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .panel-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all 0.3s;
        }

        .panel-item:hover {
          border-color: var(--accent-primary);
        }

        .item-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .item-price {
          font-weight: 700;
          color: var(--accent-secondary);
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-panels {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
