import React from 'react';
import { Star, ExternalLink, Tag } from 'lucide-react';
import Card, { CardBody, CardFooter } from './Card';
import Badge from './Badge';
import Button from './Button';
import './ToolCard.css';

const ToolCard = ({ tool, onViewDetails }) => {
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
    <Card variant="elevated" hover className="tool-card">
      <CardBody>
        <div className="tool-card-header">
          <div className="tool-logo">
            <img src={tool.logo_url} alt={`${tool.name} logo`} />
          </div>
          {tool.coupon.available && (
            <div className="coupon-indicator">
              <Tag size={16} />
            </div>
          )}
        </div>
        
        <div className="tool-card-content">
          <h3 className="tool-name">{tool.name}</h3>
          <p className="tool-provider">{tool.provider}</p>
          
          <div className="tool-badges">
            <Badge 
              variant="custom" 
              size="sm"
              style={{ 
                backgroundColor: getCategoryColor(tool.category) + '15',
                color: getCategoryColor(tool.category),
                borderColor: getCategoryColor(tool.category)
              }}
            >
              {tool.category}
            </Badge>
            <Badge variant={getPricingVariant(tool.pricing.model)} size="sm">
              {tool.pricing.model}
            </Badge>
          </div>

          <p className="tool-description">
            {tool.description.length > 120 
              ? tool.description.substring(0, 120) + '...' 
              : tool.description}
          </p>

          <div className="tool-rating">
            <Star size={16} fill="var(--warning)" color="var(--warning)" />
            <span className="rating-value">{tool.rating}</span>
            <span className="rating-separator">•</span>
            <span className="rating-rank">#{tool.popularity_rank} Popular</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onViewDetails(tool)}
          style={{ width: '100%' }}
          iconRight={<ExternalLink size={16} />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;

