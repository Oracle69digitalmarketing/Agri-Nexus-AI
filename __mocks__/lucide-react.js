const React = require('react');

const createLucideIcon = (iconName) => {
  const Icon = (props) => {
    return React.createElement('svg', { 'data-lucide': iconName, ...props });
  };
  Icon.displayName = iconName;
  return Icon;
};

module.exports = {
  Bot: createLucideIcon('Bot'),
  Phone: createLucideIcon('Phone'),
  BookOpen: createLucideIcon('BookOpen'),
  Settings: createLucideIcon('Settings'),
  BarChart: createLucideIcon('BarChart'),
  Heart: createLucideIcon('Heart'),
  Leaf: createLucideIcon('Leaf'),
  MessageSquare: createLucideIcon('MessageSquare'),
  Voicemail: createLucideIcon('Voicemail'),
};
