import React, { useState, useMemo } from 'react';
import { Search, Filter, Wrench, LayoutDashboard, Users, Key, Settings, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ToolCard from '../components/ToolCard';
import ToolDetailModal from '../components/ToolDetailModal';
import EmptyState from '../components/EmptyState';
import aiToolsData from '../data/ai-tools.json';
import './ToolsPage.css';

const ToolsPage = ({ userRole = 'student' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Navigation items based on user role
  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/admin' },
        { id: 'users', label: 'Users', icon: <Users />, href: '/admin/users' },
        { id: 'licenses', label: 'Licenses', icon: <Key />, href: '/admin/licenses' },
        { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
        { id: 'settings', label: 'Settings', icon: <Settings />, href: '/admin/settings' },
      ];
    }
    return [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, href: '/student' },
      { id: 'courses', label: 'My Courses', icon: <BookOpen />, href: '/student/courses', badge: 4 },
      { id: 'analytics', label: 'Progress', icon: <TrendingUp />, href: '/student/analytics' },
      { id: 'tools', label: 'AI Tools', icon: <Wrench />, href: '/tools' },
      { id: 'messages', label: 'Messages', icon: <MessageSquare />, href: '/student/messages', badge: 2 },
      { id: 'settings', label: 'Settings', icon: <Settings />, href: '/student/settings' },
    ];
  };

  // Get unique categories and pricing models
  const categories = useMemo(() => {
    const cats = new Set(aiToolsData.map(tool => tool.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const pricingModels = ['All', 'Free', 'Freemium', 'Paid', 'Enterprise'];

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = aiToolsData;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.provider.toLowerCase().includes(query) ||
        tool.use_cases.some(uc => uc.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Pricing filter
    if (selectedPricing !== 'All') {
      filtered = filtered.filter(tool => tool.pricing.model === selectedPricing);
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => a.popularity_rank - b.popularity_rank);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPricing, sortBy]);

  // Get related tools (same category, different tool)
  const getRelatedTools = (tool) => {
    return aiToolsData
      .filter(t => t.category === tool.category && t.tool_id !== tool.tool_id)
      .slice(0, 4);
  };

  const handleViewDetails = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleViewRelated = (tool) => {
    setSelectedTool(tool);
    // Modal stays open, just updates content
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTool(null), 300);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar items={getNavItems()} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        <Header 
          title="AI Tools Catalog" 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          notificationCount={userRole === 'student' ? 3 : 2}
        />
        
        <main className="tools-main">
          <div className="tools-container">
            {/* Page Header */}
            <div className="tools-page-header">
              <div className="tools-header-content">
                <h1 className="tools-page-title">
                  <Wrench size={32} />
                  AI Tools Directory
                </h1>
                <p className="tools-page-subtitle">
                  Discover and explore the best AI tools to enhance your productivity and creativity.
                  Find the perfect tool for your needs with detailed information, pricing, and exclusive coupons.
                </p>
              </div>
              <div className="tools-stats">
                <div className="stat-item">
                  <span className="stat-value">{aiToolsData.length}</span>
                  <span className="stat-label">Tools</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{categories.length - 1}</span>
                  <span className="stat-label">Categories</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{aiToolsData.filter(t => t.coupon.available).length}</span>
                  <span className="stat-label">Coupons</span>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="tools-filter-bar">
              <div className="filter-section">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search tools, use cases, or providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-controls">
                  <div className="filter-group">
                    <Filter size={16} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="filter-select"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <select
                      value={selectedPricing}
                      onChange={(e) => setSelectedPricing(e.target.value)}
                      className="filter-select"
                    >
                      {pricingModels.map(model => (
                        <option key={model} value={model}>
                          {model === 'All' ? 'All Pricing' : model}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="filter-select"
                    >
                      <option value="popularity">Most Popular</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="filter-results">
                <span className="results-count">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                </span>
                {(searchQuery || selectedCategory !== 'All' || selectedPricing !== 'All') && (
                  <button
                    className="clear-filters"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedPricing('All');
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
              <div className="tools-grid">
                {filteredTools.map((tool, index) => (
                  <div 
                    key={tool.tool_id} 
                    className="tool-grid-item"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ToolCard tool={tool} onViewDetails={handleViewDetails} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Search size={48} />}
                title="No tools found"
                description="Try adjusting your filters or search query to find what you're looking for."
              />
            )}
          </div>
        </main>
      </div>

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        relatedTools={selectedTool ? getRelatedTools(selectedTool) : []}
        onViewRelated={handleViewRelated}
      />
    </div>
  );
};

export default ToolsPage;

