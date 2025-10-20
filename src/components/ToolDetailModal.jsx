import React, { useState } from 'react';
import { X, Star, ExternalLink, Tag, FileText, DollarSign, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Badge from './Badge';
import './ToolDetailModal.css';

const ToolDetailModal = ({ tool, isOpen, onClose, relatedTools, onViewRelated }) => {
  const [expandedSections, setExpandedSections] = useState({
    useCases: true,
    pricing: true,
    features: true,
    related: true
  });

  if (!tool) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getPricingVariant = (model) => {
    switch (model) {
      case 'Free': return 'success';
      case 'Freemium': return 'info';
      case 'Paid': return 'warning';
      case 'Enterprise': return 'neutral';
      default: return 'neutral';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'LLM': '#2C5AA0',
      'Image Generation': '#E94B3C',
      'Code Assistant': '#00A651',
      'Research': '#3B82F6',
      'Video': '#8b5cf6',
      'Audio': '#F59E0B',
      'Productivity': '#22C55E'
    };
    return colors[category] || '#666666';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className="tool-detail-modal">
        {/* Header */}
        <div className="tool-detail-header">
          <div className="tool-detail-top">
            <div className="tool-detail-logo">
              <img src={tool.logo_url} alt={`${tool.name} logo`} />
            </div>
            <div className="tool-detail-info">
              <h2 className="tool-detail-name">{tool.name}</h2>
              <p className="tool-detail-provider">by {tool.provider}</p>
              <div className="tool-detail-meta">
                <div className="tool-rating-large">
                  <Star size={18} fill="var(--warning)" color="var(--warning)" />
                  <span className="rating-value">{tool.rating}</span>
                  <span className="rating-text">Rating</span>
                </div>
                <div className="tool-popularity">
                  <span className="popularity-rank">#{tool.popularity_rank}</span>
                  <span className="popularity-text">Most Popular</span>
                </div>
              </div>
            </div>
            <button className="tool-detail-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <div className="tool-detail-badges">
            <Badge 
              variant="custom" 
              size="md"
              style={{ 
                backgroundColor: getCategoryColor(tool.category) + '15',
                color: getCategoryColor(tool.category),
                borderColor: getCategoryColor(tool.category)
              }}
            >
              {tool.category}
            </Badge>
            <Badge variant={getPricingVariant(tool.pricing.model)} size="md">
              {tool.pricing.model}
            </Badge>
            {tool.coupon.available && (
              <Badge variant="error" size="md">
                <Tag size={14} /> Coupon Available
              </Badge>
            )}
          </div>

          <p className="tool-detail-description">{tool.description}</p>
        </div>

        {/* Coupon Section */}
        {tool.coupon.available && (
          <div className="tool-coupon-section">
            <div className="coupon-content">
              <div className="coupon-icon">
                <Tag size={24} />
              </div>
              <div className="coupon-info">
                <h4 className="coupon-title">Special Offer Available</h4>
                <p className="coupon-discount">{tool.coupon.discount}</p>
                {tool.coupon.code && (
                  <div className="coupon-code">
                    Code: <span className="code-text">{tool.coupon.code}</span>
                  </div>
                )}
                {tool.coupon.expires && (
                  <p className="coupon-expires">Expires: {new Date(tool.coupon.expires).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            <Button
              variant="accent"
              size="md"
              iconRight={<ExternalLink size={16} />}
              onClick={() => window.open(tool.coupon.partner_link, '_blank')}
            >
              Get Coupon
            </Button>
          </div>
        )}

        {/* Use Cases Section */}
        <div className="tool-detail-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('useCases')}
          >
            <h3>
              <FileText size={20} />
              Use Cases
            </h3>
            {expandedSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedSections.useCases && (
            <ul className="use-cases-list">
              {tool.use_cases.map((useCase, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing Section */}
        <div className="tool-detail-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('pricing')}
          >
            <h3>
              <DollarSign size={20} />
              Pricing
            </h3>
            {expandedSections.pricing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedSections.pricing && (
            <div className="pricing-content">
              {tool.pricing.free_tier && (
                <div className="pricing-tier free-tier">
                  <div className="tier-header">
                    <h4>Free Tier</h4>
                    <Badge variant="success" size="sm">Free</Badge>
                  </div>
                  <p>{tool.pricing.free_tier}</p>
                </div>
              )}
              {tool.pricing.paid_plans && tool.pricing.paid_plans.length > 0 && (
                <div className="pricing-plans">
                  {tool.pricing.paid_plans.map((plan, index) => (
                    <div key={index} className="pricing-plan">
                      <div className="plan-header">
                        <h4>{plan.name}</h4>
                        <span className="plan-price">{plan.price}</span>
                      </div>
                      <ul className="plan-features">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex}>
                            <CheckCircle size={14} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="tool-detail-section">
          <button 
            className="section-header"
            onClick={() => toggleSection('features')}
          >
            <h3>
              <Star size={20} />
              Key Features
            </h3>
            {expandedSections.features ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedSections.features && (
            <div className="features-grid">
              {tool.features.map((feature, index) => (
                <div key={index} className="feature-tag">
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Tools Section */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="tool-detail-section">
            <button 
              className="section-header"
              onClick={() => toggleSection('related')}
            >
              <h3>Related Tools</h3>
              {expandedSections.related ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedSections.related && (
              <div className="related-tools">
                {relatedTools.map(relatedTool => (
                  <div 
                    key={relatedTool.tool_id} 
                    className="related-tool-item"
                    onClick={() => onViewRelated(relatedTool)}
                  >
                    <img src={relatedTool.logo_url} alt={relatedTool.name} />
                    <div className="related-tool-info">
                      <h5>{relatedTool.name}</h5>
                      <p>{relatedTool.provider}</p>
                    </div>
                    <ExternalLink size={16} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="tool-detail-actions">
          <Button
            variant="primary"
            size="lg"
            iconRight={<ExternalLink size={18} />}
            onClick={() => window.open(tool.links.website, '_blank')}
          >
            Visit Website
          </Button>
          {tool.links.documentation && (
            <Button
              variant="outline"
              size="lg"
              iconRight={<ExternalLink size={18} />}
              onClick={() => window.open(tool.links.documentation, '_blank')}
            >
              View Documentation
            </Button>
          )}
        </div>

        {/* Footer Info */}
        <div className="tool-detail-footer">
          <span>Released: {new Date(tool.release_date).toLocaleDateString()}</span>
          <span>•</span>
          <span>Last Updated: {new Date(tool.last_updated).toLocaleDateString()}</span>
        </div>
      </div>
    </Modal>
  );
};

export default ToolDetailModal;

