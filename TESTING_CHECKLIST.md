# Share Buttons Testing Checklist

## Pre-Testing Setup

- [x] Development server running on http://localhost:3001
- [x] All files compiled without errors
- [x] Plugin configuration loaded successfully

## Basic Functionality Tests

### Visual Verification
- [ ] Navigate to http://localhost:3001/blog/welcome
- [ ] Scroll to bottom of the post
- [ ] Verify share buttons are visible
- [ ] Verify buttons have proper spacing and alignment
- [ ] Check dark mode compatibility (toggle theme)

### Button Functionality
- [ ] **Twitter Button**: Click and verify it opens Twitter with pre-filled text
- [ ] **LinkedIn Button**: Click and verify it opens LinkedIn share dialog
- [ ] **Reddit Button**: Click and verify it opens Reddit submit page
- [ ] **Copy Button**: Click and verify:
  - Icon changes to checkmark
  - "Copied!" message appears
  - URL is actually copied (paste to verify)
  - Message disappears after 2 seconds
- [ ] **Native Share Button** (mobile only):
  - Open in mobile device or use browser dev tools
  - Verify button appears on mobile
  - Verify button is hidden on desktop

## Configuration Tests

### Test 1: Disable Plugin
1. [ ] Edit `config/plugins.yaml`
2. [ ] Set `enabled: false`
3. [ ] Refresh the blog post
4. [ ] Verify share buttons do NOT appear
5. [ ] Set `enabled: true` again

### Test 2: Preview Only Mode
1. [ ] Edit `config/plugins.yaml`
2. [ ] Set `previewOnly: true`
3. [ ] Refresh the blog post
4. [ ] Verify share buttons do NOT appear (in production)
5. [ ] Set `previewOnly: false` again

### Test 3: Individual Button Control
1. [ ] Edit `config/plugins.yaml`
2. [ ] Set `twitter: false`
3. [ ] Refresh and verify Twitter button is hidden
4. [ ] Set `linkedin: false`
5. [ ] Refresh and verify LinkedIn button is hidden
6. [ ] Set all buttons back to `true`

### Test 4: Show Labels
1. [ ] Edit `config/plugins.yaml`
2. [ ] Set `showLabels: true`
3. [ ] Refresh and verify "Share:" label appears
4. [ ] Set `showLabels: false` again

## Responsive Design Tests

### Desktop View
- [ ] Buttons are properly sized (8x8 with proper icons)
- [ ] Hover effects work (background changes)
- [ ] Native share button is hidden
- [ ] All buttons are in a single row

### Mobile View (use browser dev tools)
1. [ ] Open Chrome DevTools (F12)
2. [ ] Toggle device toolbar (Ctrl+Shift+M)
3. [ ] Select iPhone 12 or similar
4. [ ] Verify:
   - [ ] Buttons are properly sized for touch
   - [ ] Native share button is visible
   - [ ] Layout is responsive
   - [ ] No horizontal scrolling

### Tablet View
- [ ] Test on iPad or similar
- [ ] Verify buttons work correctly
- [ ] Check layout adapts properly

## Accessibility Tests

### Keyboard Navigation
1. [ ] Tab through the page
2. [ ] Verify focus moves to share buttons
3. [ ] Verify focus outline is visible
4. [ ] Press Enter on each button
5. [ ] Verify buttons activate correctly

### Screen Reader (Optional)
- [ ] Use screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify each button is announced correctly
- [ ] Verify button purpose is clear

### ARIA Labels
- [ ] Inspect elements in DevTools
- [ ] Verify `aria-label` attributes are present
- [ ] Verify labels are descriptive

## Error Handling Tests

### Clipboard Permission Denied
1. [ ] Block clipboard access in browser settings
2. [ ] Click copy button
3. [ ] Verify it fails gracefully (no crash)
4. [ ] Check console for error message

### Native Share Not Available
1. [ ] Test on desktop browser
2. [ ] Verify native share button is hidden
3. [ ] No console errors

## Cross-Browser Tests

### Chrome/Edge
- [ ] All buttons work
- [ ] Copy functionality works
- [ ] Styling is correct

### Firefox
- [ ] All buttons work
- [ ] Copy functionality works
- [ ] Styling is correct

### Safari (if available)
- [ ] All buttons work
- [ ] Copy functionality works
- [ ] Styling is correct

## Performance Tests

### Page Load
- [ ] Check Network tab in DevTools
- [ ] Verify no external requests for share buttons
- [ ] Verify bundle size is reasonable

### Interaction Performance
- [ ] Click buttons multiple times rapidly
- [ ] Verify no lag or freezing
- [ ] Check console for errors

## Integration Tests

### With Other Plugins
- [ ] Verify TOC still works
- [ ] Verify reading time badge works
- [ ] Verify post navigation works
- [ ] No layout conflicts

### Multiple Posts
- [ ] Test on different blog posts
- [ ] Verify URLs are correct for each post
- [ ] Verify titles are correct for each post

## Edge Cases

### Long Titles
- [ ] Create/test post with very long title
- [ ] Verify share URLs encode properly
- [ ] No layout breaking

### Special Characters
- [ ] Test post with special characters in title
- [ ] Verify encoding works correctly
- [ ] Test sharing works

### No JavaScript
- [ ] Disable JavaScript in browser
- [ ] Verify graceful degradation
- [ ] No broken layout

## Final Verification

- [ ] No console errors
- [ ] No console warnings
- [ ] All buttons functional
- [ ] Configuration works as expected
- [ ] Documentation is accurate
- [ ] Ready for PR submission

## Screenshots Needed for PR

Take screenshots of:
1. [ ] Share buttons on desktop (light mode)
2. [ ] Share buttons on desktop (dark mode)
3. [ ] Share buttons on mobile
4. [ ] Copy button with "Copied!" feedback
5. [ ] Configuration file example
6. [ ] Share dialog on Twitter/LinkedIn/Reddit

## Notes

- Test URL: http://localhost:3001/blog/welcome
- Config file: `config/plugins.yaml`
- Component: `plugins/share/components/ShareButtons.tsx`

## Issues Found

Document any issues here:

1. 
2. 
3. 

## Sign-off

- [ ] All tests passed
- [ ] No critical issues found
- [ ] Ready for commit and PR
- [ ] Screenshots taken
- [ ] Documentation reviewed

---

**Tester**: _______________
**Date**: _______________
**Browser**: _______________
**OS**: _______________
