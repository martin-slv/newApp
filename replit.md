# DAO Governance Platform

## Overview

This is a DAO (Decentralized Autonomous Organization) governance platform built with Next.js and TypeScript. The application serves as a comprehensive showcase of modern web UI components using the Mantine design system, specifically tailored for governance and community management scenarios. The platform demonstrates various interactive elements, forms, data visualization, and user interface patterns commonly needed in DAO governance applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15**: Chosen as the primary React framework for its server-side rendering capabilities, file-based routing, and excellent developer experience. The App Router architecture is utilized for modern React patterns.
- **TypeScript**: Provides type safety and enhanced developer experience, essential for maintaining code quality in governance applications where data integrity is crucial.

### UI Component Library
- **Mantine v8**: Selected as the comprehensive UI library providing a full suite of components including forms, data display, navigation, and interactive elements. This choice enables rapid development while maintaining consistent design patterns.
- **Custom Theme**: Implements a custom "dao" color scheme with blue tones to reflect the governance theme and brand identity.

### Component Architecture
- **Client-Side Rendering**: Uses 'use client' directive for interactive components, suitable for dynamic governance interfaces requiring real-time user interactions.
- **Modular Design**: Components are organized to showcase different aspects of governance functionality including voting, proposals, member management, and data visualization.

### Styling and Design
- **CSS Modules**: Leverages Mantine's built-in styling system with CSS-in-JS patterns for component-scoped styling.
- **Responsive Design**: Built with mobile-first responsive design principles using Mantine's grid system and responsive utilities.

### Development Configuration
- **Package Optimization**: Next.js configuration includes experimental package import optimization for Mantine components to improve bundle size and loading performance.
- **TypeScript Integration**: Strict TypeScript configuration with modern ES2017 target and comprehensive type checking.

## External Dependencies

### Core Framework Dependencies
- **Next.js**: Web application framework providing SSR, routing, and build optimization
- **React 19**: Latest React version for modern component patterns and concurrent features
- **TypeScript**: Static type checking and enhanced development experience

### UI and Interaction Libraries
- **Mantine Component Suite**: Comprehensive set including core components, forms, notifications, modals, dates, carousel, code highlighting, and spotlight search
- **Tabler Icons**: Icon library providing consistent iconography for governance interfaces
- **TipTap**: Rich text editor components for proposal creation and content management
- **Day.js**: Lightweight date manipulation library for handling governance timelines and voting periods

### Development Tools
- **Node.js Types**: TypeScript definitions for Node.js environment
- **React Types**: TypeScript definitions for React and React DOM

The architecture prioritizes developer experience, component reusability, and user interface consistency while providing a solid foundation for building complex governance interfaces and workflows.