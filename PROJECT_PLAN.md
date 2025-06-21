# 🍽️ Annapurna - Your Personal Meal Decision Maker

## 🎯 **Project Vision**

**"Free people from the daily stress of deciding what to cook"**

### **The Problem We're Solving:**
- Daily stress of deciding what to cook
- Repetitive meal planning
- Time wasted on meal decisions
- Lack of variety in daily cooking
- Decision fatigue for housewives

### **The Solution:**
A smart, time-based meal suggestion app that automatically suggests what to cook based on the time of day and user preferences.

---

## 👥 **Target Users**

### **Primary: Daily Housewives**
- **Age**: 25-55 years
- **Tech Level**: Basic smartphone users
- **Pain Point**: Daily "what to cook" decisions
- **Goal**: Quick, easy meal suggestions

### **Secondary: Busy Professionals**
- **Age**: 25-40 years
- **Tech Level**: Moderate to advanced
- **Pain Point**: No time to plan meals
- **Goal**: Efficient meal planning

---

## 📋 **Phase-by-Phase Development Plan**

### **Phase 1: Foundation & Core UX** 
**Goal: Basic meal suggestion based on time**

#### **Features:**
1. **Time-based Meal Detection**
   - Breakfast (6 AM - 11 AM)
   - Lunch (11 AM - 3 PM) 
   - Snacks (3 PM - 6 PM)
   - Dinner (6 PM - 10 PM)

2. **Simple Meal Suggestion Modal**
   - Bottom sheet/popup that appears based on time
   - Shows meal name with basic details
   - Accept/Reject options
   - "Surprise Me" button for random suggestions

3. **Basic User Registration**
   - Simple signup with name, email, password
   - Default cuisine preferences (all selected)

4. **Homepage**
   - Current meal suggestion display
   - Time-based context
   - Quick action buttons

#### **Deliverables:**
- Working MVP with time-based suggestions
- User registration flow
- Basic meal suggestion interface
- Simple homepage

---

### **Phase 2: Preferences & Personalization**
**Goal: User can customize their meal preferences**

#### **Features:**
1. **Cuisine Preferences Setup**
   - After registration, show cuisine selection
   - Default: All cuisines selected
   - Simple toggle interface

2. **Profile Page**
   - User details display
   - Editable cuisine preferences
   - Meal history summary

3. **Enhanced Suggestions**
   - Based on cuisine preferences
   - Better meal variety

#### **Deliverables:**
- Preferences management system
- Profile page with editing capabilities
- Enhanced suggestion algorithm

---

### **Phase 3: Smart Suggestions & History**
**Goal: Intelligent meal recommendations with history tracking**

#### **Features:**
1. **Enhanced Meal Suggestions**
   - Based on cuisine preferences
   - Avoid recently eaten meals
   - Seasonal considerations

2. **Weekly View**
   - Show what user ate each day
   - Organized by meal types
   - Visual meal calendar

3. **Meal History**
   - Track accepted/rejected meals
   - Learning from user preferences
   - Avoid repetition

#### **Deliverables:**
- Weekly meal view
- Meal history tracking
- Smart suggestion algorithm
- Visual meal calendar

---

### **Phase 4: Advanced Features**
**Goal: Enhanced user experience and smart features**

#### **Features:**
1. **Dietary Restrictions**
   - Vegetarian/Vegan options
   - Allergy considerations
   - Spice level preferences

2. **Meal Planning**
   - Plan ahead for the week
   - Shopping list generation
   - Recipe details

3. **Social Features**
   - Share meals with family
   - Family preferences
   - Collaborative meal planning

#### **Deliverables:**
- Advanced preference system
- Meal planning features
- Recipe management
- Family sharing capabilities

---

## 🎨 **UI/UX Design Principles**

### **Target User: Daily Housewives**
- **Simple & Intuitive**: One-tap actions
- **Time-Sensitive**: Context-aware suggestions
- **Visual**: Rich food imagery
- **Quick Decisions**: Accept/Reject in seconds
- **Mobile-First**: Optimized for phone use

### **Modern Theme Elements**
- **Color Palette**: 
  - Primary: Warm orange (#FF6B35)
  - Secondary: Deep green (#2E8B57)
  - Accent: Golden yellow (#FFD700)
  - Background: Soft cream (#FFF8DC)

- **Typography**: 
  - Headings: Inter, bold
  - Body: Inter, regular
  - Sizes: 16px base, responsive scaling

- **Icons**: Food and time-related icons
- **Animations**: Smooth, delightful interactions
- **Cards**: Modern card-based layout with shadows

### **Key UX Patterns**
- **Bottom Sheets**: For meal suggestions
- **Cards**: For meal display
- **Toggles**: For preferences
- **Swipe Actions**: Accept/reject meals
- **Pull to Refresh**: Get new suggestions

---

## 🏗️ **Technical Architecture**

### **Frontend (React + TypeScript)**
- **Framework**: React 18 with TypeScript
- **UI Library**: Chakra UI
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios

### **Backend (Node.js + Express)**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Joi

### **Database Schema**
```javascript
// User
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  preferences: ObjectId,
  createdAt: Date
}

// Preferences
{
  _id: ObjectId,
  user: ObjectId,
  cuisines: [String],
  dietaryRestrictions: [String],
  spiceLevel: String,
  createdAt: Date
}

// Meal
{
  _id: ObjectId,
  name: String,
  type: String, // breakfast, lunch, snack, dinner
  cuisine: String,
  imageUrl: String,
  ingredients: [String],
  instructions: String,
  prepTime: Number,
  createdAt: Date
}

// MealHistory
{
  _id: ObjectId,
  user: ObjectId,
  meal: ObjectId,
  date: Date,
  mealType: String,
  status: String, // accepted, rejected
  createdAt: Date
}
```

---

## 🚀 **Current Status**

### **What's Already Built:**
- ✅ Basic authentication system
- ✅ User registration and login
- ✅ Basic meal management
- ✅ Admin dashboard
- ✅ Preferences system (basic)

### **What Needs to be Refactored:**
- 🔄 Current app structure doesn't match the new vision
- 🔄 Need to implement time-based meal detection
- 🔄 Need to create the core meal suggestion flow
- 🔄 Need to redesign the homepage

---

## 📝 **Next Steps**

### **Immediate (Phase 1):**
1. **Create time-based meal detection utility**
2. **Build meal suggestion modal/bottom sheet**
3. **Redesign homepage for the new flow**
4. **Implement basic meal suggestion logic**
5. **Test the core user journey**

### **Success Metrics for Phase 1:**
- User can register and get immediate meal suggestions
- Time-based meal detection works correctly
- Meal suggestion interface is intuitive
- Basic accept/reject functionality works

---

## 🎯 **Success Criteria**

### **Phase 1 Success:**
- ✅ User lands on homepage and sees relevant meal suggestion
- ✅ Time-based meal detection works accurately
- ✅ Meal suggestion interface is user-friendly
- ✅ Basic user flow works end-to-end

### **Overall Success:**
- Users save time on meal decisions
- App becomes part of daily routine
- High user engagement and retention
- Positive user feedback from housewives

---

*This document will be updated as we progress through each phase.* 