# Database Dashboard

A comprehensive database management interface for the Annapurna meal planning application that allows you to view and edit all database information directly.

## Features

### 📊 Statistics Overview
- View total number of users, meals, and recipe preferences
- Real-time statistics displayed in colorful cards

### 👥 User Management
- View all registered users
- Edit user information (name, email)
- Delete users (with cascade deletion of associated meals and preferences)
- See creation and update timestamps

### 🍽️ Meal Management
- View all meals in the database
- Edit meal details including:
  - Name and type (breakfast, lunch, dinner, snack)
  - Nutritional information (calories, protein, carbs, fat)
  - Ingredients list
  - Cooking instructions
- Delete meals
- See associated user information

### ⚙️ Recipe Preferences Management
- View all user recipe preferences
- Edit preference settings including:
  - Dietary restrictions
  - Preferred cuisines
  - Spice level preferences
  - Cooking time ranges
  - Meal type preferences
  - Seasonal preferences
- Delete preferences
- See associated user information

## Access

1. **Login** to your account
2. Click on the **Account** menu in the top navigation
3. Select **Database Dashboard**
4. Or navigate directly to `/admin/database`

## Usage

### Viewing Data
- Use the tabs to switch between Users, Meals, and Recipe Preferences
- All data is displayed in organized tables with clear formatting
- Badges are used to highlight different types of information

### Editing Data
1. Click the **Edit** button (pencil icon) next to any item
2. A modal will open with editable fields
3. Make your changes
4. Click **Save** to update the database
5. Click **Cancel** to discard changes

### Deleting Data
1. Click the **Delete** button (trash icon) next to any item
2. Confirm the deletion in the popup dialog
3. The item will be permanently removed from the database

## API Endpoints

The dashboard uses the following backend API endpoints:

- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/meals` - Get all meals
- `PUT /api/admin/meals/:id` - Update meal
- `DELETE /api/admin/meals/:id` - Delete meal
- `GET /api/admin/preferences` - Get all preferences
- `PUT /api/admin/preferences/:id` - Update preference
- `DELETE /api/admin/preferences/:id` - Delete preference
- `GET /api/admin/stats` - Get database statistics

## Security

- The dashboard is protected by authentication
- Only logged-in users can access the database dashboard
- All operations are logged and validated on the backend

## Technical Details

- **Frontend**: React with TypeScript and Chakra UI
- **Backend**: Node.js with Express and MongoDB
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication

## Error Handling

- Network errors are displayed as toast notifications
- Validation errors are shown inline in the edit forms
- Confirmation dialogs prevent accidental deletions
- Loading states provide user feedback during operations

## Mobile Responsive

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

The interface automatically adapts to different screen sizes with:
- Responsive tables with horizontal scrolling
- Collapsible navigation
- Touch-friendly buttons and controls 