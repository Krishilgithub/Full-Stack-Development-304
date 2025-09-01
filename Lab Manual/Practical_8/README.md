# 🏋️ Gym Rep Counter

A responsive web-based exercise repetition counter designed for gym users to track their workout reps easily on both mobile and desktop devices.

## Features

### Core Functionality

- **Instant Count Updates**: Click buttons to increase/decrease rep count with immediate visual feedback
- **Persistent Storage**: Counter state persists across page reloads using localStorage
- **Manual Reset Only**: Counter only resets when explicitly reset by the user
- **Exercise Tracking**: Add exercise names to organize your workout sessions

### Enhanced Features

- **Session Statistics**: Track session high and total completed sessions
- **Session History**: View recent workout sessions with exercise names, reps, and timestamps
- **Mobile Optimized**: Touch-friendly interface with swipe gestures and haptic feedback
- **Keyboard Shortcuts**: Use keyboard for quick navigation and control
- **Visual Feedback**: Smooth animations and pulse effects for better user experience
- **Toast Notifications**: Clear feedback messages for all actions

### Mobile Features

- **Responsive Design**: Optimized layout for mobile screens
- **Touch Gestures**: Swipe up/down on counter to increase/decrease
- **Haptic Feedback**: Vibration feedback on supported devices
- **Large Touch Targets**: Easy-to-tap buttons designed for fingers

## Usage

### Basic Operations

1. **Increase Count**: Click the "+" button or use keyboard shortcuts (↑, +, =, Space)
2. **Decrease Count**: Click the "−" button or use keyboard shortcuts (↓, -, \_)
3. **Reset Counter**: Click "Reset" button or use Ctrl+R
4. **Save Session**: Click "Save Session" button or use Ctrl+S

### Exercise Tracking

1. Enter exercise name in the input field at the top
2. Perform your reps using increase/decrease buttons
3. Save the session to add it to your history
4. View your session statistics and history below

### Keyboard Shortcuts

- `↑` / `+` / `=` / `Space`: Increase count
- `↓` / `-` / `_`: Decrease count
- `Ctrl + R`: Reset counter
- `Ctrl + S`: Save session

### Mobile Gestures

- **Swipe up** on counter: Increase count
- **Swipe down** on counter: Decrease count

## Technical Features

### Data Persistence

- All data is stored in browser's localStorage
- Automatic save every 10 seconds
- Save on page unload/visibility change
- Welcome back message when returning after extended absence

### Responsive Design

- Mobile-first approach
- Breakpoint at 480px for mobile optimization
- Touch-friendly button sizes
- Optimized typography and spacing

### Accessibility

- ARIA labels for screen readers
- Focus management for keyboard navigation
- High contrast colors
- Clear visual hierarchy

### Browser Compatibility

- Modern browsers with localStorage support
- Touch events for mobile devices
- Vibration API for haptic feedback (where supported)
- Service Worker ready for PWA implementation

## File Structure

```
Practical_8/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Installation

1. Clone or download the project files
2. Open `index.html` in a web browser
3. Start tracking your workout reps!

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- Progressive Web App (PWA) capabilities
- Export/import workout data
- Workout templates and programs
- Social sharing features
- Cloud synchronization
- Workout analytics and charts

## Hidden Features

- **Data Export**: Double-click on the title to export your workout data as JSON
- **Debug Access**: Counter instance available as `window.gymCounter` in console

## License

This project is open source and available under the MIT License.
