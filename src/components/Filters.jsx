import React from 'react';

export default function Filters() {
  return (
    <aside className="filters-sidebar glass">
      <h3 className="filter-title">Filters</h3>
      
      <div className="filter-group">
        <label>Category</label>
        <select>
          <option value="All">All Categories</option>
          <option value="Tech">Technology</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price</label>
        <input 
          type="range" 
          min="1000" 
          max="100000" 
          step="1000" 
        />
        <div className="range-labels">
          <span>₹1k</span>
          <span>₹100k</span>
        </div>
      </div>

      <div className="filter-group">
        <label>Metrics</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" /> High Traffic (&gt;500k)
          </label>
          <label className="checkbox-label">
            <input type="checkbox" /> High DR (&gt;80)
          </label>
        </div>
      </div>

      <button className="apply-btn">
        Apply Filters
      </button>

      <style jsx>{`
        .filters-sidebar {
          padding: 1.5rem;
          border-radius: 16px;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .filter-title {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .filter-group {
          margin-bottom: 2rem;
        }

        .filter-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        select {
          width: 100%;
          border: 1px solid var(--glass-border);
          padding: 0.8rem;
          background: var(--bg-tertiary);
          border-radius: 12px;
          color: var(--text-primary);
        }

        input[type="range"] {
          width: 100%;
          accent-color: var(--accent-primary);
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .checkbox-label:hover {
          color: var(--text-primary);
        }

        .checkbox-label input {
          accent-color: var(--accent-secondary);
        }

        .apply-btn {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          background: transparent;
          margin-top: 1.5rem;
          transition: all 0.3s;
        }

        .apply-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border-color: var(--accent-primary);
        }
      `}</style>
    </aside>
  );
}
